import { describe, it, expect, beforeEach, vi } from 'vitest'
import fs from 'fs'
import path from 'path'
import GitHubMCPHandler from '../.junie/github-mcp-handler.js'

// Mock fetch for testing
global.fetch = vi.fn()

describe('GitHub MCP Connection', () => {
  let mcpConfig
  let handler

  beforeEach(() => {
    // Load MCP configuration
    const configPath = path.join(process.cwd(), '.junie', 'mcp-connections.json')
    const configData = fs.readFileSync(configPath, 'utf8')
    mcpConfig = JSON.parse(configData)
    
    // Get GitHub connection config
    const githubConfig = mcpConfig.connections.find(conn => conn.name === 'github')
    handler = new GitHubMCPHandler(githubConfig.config)
    
    // Reset fetch mock
    vi.clearAllMocks()
  })

  describe('Configuration', () => {
    it('should load GitHub MCP configuration correctly', () => {
      expect(mcpConfig).toBeDefined()
      expect(mcpConfig.connections).toHaveLength(1)
      
      const githubConnection = mcpConfig.connections[0]
      expect(githubConnection.name).toBe('github')
      expect(githubConnection.type).toBe('github')
      expect(githubConnection.config.authentication.type).toBe('pat')
    })

    it('should have required input fields defined', () => {
      const githubConnection = mcpConfig.connections[0]
      const inputs = githubConnection.inputs
      
      expect(inputs).toHaveLength(3)
      
      const patTokenInput = inputs.find(input => input.name === 'github_pat_token')
      expect(patTokenInput).toBeDefined()
      expect(patTokenInput.type).toBe('password')
      expect(patTokenInput.required).toBe(true)
      expect(patTokenInput.validation.pattern).toBe('^ghp_[a-zA-Z0-9]{36}$')
    })

    it('should have proper capabilities defined', () => {
      const githubConnection = mcpConfig.connections[0]
      const capabilities = githubConnection.config.capabilities
      
      expect(capabilities).toContain('repository.read')
      expect(capabilities).toContain('repository.write')
      expect(capabilities).toContain('issues.read')
      expect(capabilities).toContain('issues.write')
      expect(capabilities).toContain('pull_requests.read')
      expect(capabilities).toContain('pull_requests.write')
      expect(capabilities).toContain('contents.read')
      expect(capabilities).toContain('contents.write')
    })
  })

  describe('GitHub MCP Handler', () => {
    it('should initialize with correct configuration', () => {
      expect(handler.baseUrl).toBe('https://api.github.com')
      expect(handler.token).toBeNull()
    })

    it('should validate PAT token format correctly', () => {
      // Valid token format
      expect(handler.validatePATToken('ghp_1234567890123456789012345678901234567890')).toBe(false) // too long
      expect(handler.validatePATToken('ghp_123456789012345678901234567890123456')).toBe(true) // correct length
      expect(handler.validatePATToken('ghp_12345678901234567890123456789012345')).toBe(false) // too short
      
      // Invalid token formats
      expect(handler.validatePATToken('invalid_token')).toBe(false)
      expect(handler.validatePATToken('gho_123456789012345678901234567890123456')).toBe(false)
      expect(handler.validatePATToken('')).toBe(false)
      expect(handler.validatePATToken(null)).toBe(false)
    })

    it('should throw error for invalid PAT token during initialization', async () => {
      await expect(handler.initialize('invalid_token')).rejects.toThrow('Invalid GitHub Personal Access Token format')
      await expect(handler.initialize('')).rejects.toThrow('Invalid GitHub Personal Access Token format')
      await expect(handler.initialize(null)).rejects.toThrow('Invalid GitHub Personal Access Token format')
    })

    it('should handle connection initialization with valid token', async () => {
      const validToken = 'ghp_123456789012345678901234567890123456'
      
      // Mock successful API response
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'testuser', id: 12345 })
      })

      const result = await handler.initialize(validToken)
      
      expect(result.success).toBe(true)
      expect(result.message).toBe('GitHub MCP connection established successfully')
      expect(handler.token).toBe(validToken)
      
      // Verify API call was made
      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/user',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': `Bearer ${validToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Junie-MCP-Client/1.0.0'
          })
        })
      )
    })

    it('should handle API errors during connection test', async () => {
      const validToken = 'ghp_123456789012345678901234567890123456'
      
      // Mock API error response
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        json: async () => ({ message: 'Bad credentials' })
      })

      await expect(handler.initialize(validToken)).rejects.toThrow('Failed to establish GitHub connection: GitHub API error: 401 - Bad credentials')
    })

    it('should return correct connection status', () => {
      const status = handler.getStatus()
      
      expect(status.connected).toBe(false)
      expect(status.baseUrl).toBe('https://api.github.com')
      expect(status.capabilities).toContain('repository.read')
    })

    it('should disconnect properly', () => {
      handler.token = 'some_token'
      const result = handler.disconnect()
      
      expect(result.success).toBe(true)
      expect(result.message).toBe('GitHub MCP connection disconnected')
      expect(handler.token).toBeNull()
    })

    it('should throw error when making requests without initialization', async () => {
      await expect(handler.getRepositories()).rejects.toThrow('GitHub MCP connection not initialized. Please provide PAT token.')
    })
  })

  describe('API Methods', () => {
    beforeEach(async () => {
      const validToken = 'ghp_123456789012345678901234567890123456'
      
      // Mock successful initialization
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'testuser', id: 12345 })
      })
      
      await handler.initialize(validToken)
      vi.clearAllMocks()
    })

    it('should get repositories with correct API call', async () => {
      const mockRepos = [{ name: 'repo1', full_name: 'user/repo1' }]
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos
      })

      const result = await handler.getRepositories()
      
      expect(result).toEqual(mockRepos)
      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/user/repos?sort=updated&per_page=30',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': expect.stringContaining('Bearer ghp_')
          })
        })
      )
    })

    it('should get repository information', async () => {
      const mockRepo = { name: 'test-repo', full_name: 'user/test-repo' }
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepo
      })

      const result = await handler.getRepository('user', 'test-repo')
      
      expect(result).toEqual(mockRepo)
      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/user/test-repo',
        expect.objectContaining({ method: 'GET' })
      )
    })

    it('should require owner and repo for repository operations', async () => {
      await expect(handler.getRepository()).rejects.toThrow('Repository owner and name are required')
      await expect(handler.getContents('', null, null)).rejects.toThrow('Repository owner and name are required')
      await expect(handler.getIssues({}, '', '')).rejects.toThrow('Repository owner and name are required')
    })
  })
})