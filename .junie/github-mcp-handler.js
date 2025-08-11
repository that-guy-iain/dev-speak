/**
 * GitHub MCP Connection Handler
 * Handles authentication and API interactions for GitHub MCP connection
 */

class GitHubMCPHandler {
  constructor(config) {
    this.config = config;
    this.token = null;
    this.baseUrl = config.baseUrl || 'https://api.github.com';
    this.defaultOwner = config.default_owner;
    this.defaultRepo = config.default_repo;
  }

  /**
   * Initialize connection with PAT token
   * @param {string} patToken - GitHub Personal Access Token
   */
  async initialize(patToken) {
    if (!patToken || !this.validatePATToken(patToken)) {
      throw new Error('Invalid GitHub Personal Access Token format');
    }
    
    this.token = patToken;
    
    // Test the connection
    try {
      await this.testConnection();
      return { success: true, message: 'GitHub MCP connection established successfully' };
    } catch (error) {
      throw new Error(`Failed to establish GitHub connection: ${error.message}`);
    }
  }

  /**
   * Validate PAT token format
   * @param {string} token - Token to validate
   * @returns {boolean}
   */
  validatePATToken(token) {
    const pattern = /^ghp_[a-zA-Z0-9]{36}$/;
    return pattern.test(token);
  }

  /**
   * Test the connection by making a simple API call
   */
  async testConnection() {
    const response = await this.makeRequest('/user');
    if (!response.login) {
      throw new Error('Invalid token or insufficient permissions');
    }
    return response;
  }

  /**
   * Make authenticated request to GitHub API
   * @param {string} endpoint - API endpoint
   * @param {object} options - Request options
   */
  async makeRequest(endpoint, options = {}) {
    if (!this.token) {
      throw new Error('GitHub MCP connection not initialized. Please provide PAT token.');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Junie-MCP-Client/1.0.0',
      ...options.headers
    };

    const requestOptions = {
      method: options.method || 'GET',
      headers,
      ...options
    };

    if (options.body) {
      requestOptions.body = JSON.stringify(options.body);
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`GitHub API error: ${response.status} - ${errorData.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to GitHub API');
      }
      throw error;
    }
  }

  /**
   * Get user repositories
   * @param {object} params - Query parameters
   */
  async getRepositories(params = {}) {
    const queryParams = new URLSearchParams({
      sort: 'updated',
      per_page: 30,
      ...params
    });
    
    return await this.makeRequest(`/user/repos?${queryParams}`);
  }

  /**
   * Get repository information
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   */
  async getRepository(owner = this.defaultOwner, repo = this.defaultRepo) {
    if (!owner || !repo) {
      throw new Error('Repository owner and name are required');
    }
    
    return await this.makeRequest(`/repos/${owner}/${repo}`);
  }

  /**
   * Get repository contents
   * @param {string} path - File/directory path
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   */
  async getContents(path = '', owner = this.defaultOwner, repo = this.defaultRepo) {
    if (!owner || !repo) {
      throw new Error('Repository owner and name are required');
    }
    
    return await this.makeRequest(`/repos/${owner}/${repo}/contents/${path}`);
  }

  /**
   * Create or update file contents
   * @param {string} path - File path
   * @param {string} content - File content (base64 encoded)
   * @param {string} message - Commit message
   * @param {object} options - Additional options
   */
  async updateContents(path, content, message, options = {}) {
    const { owner = this.defaultOwner, repo = this.defaultRepo, sha, branch = 'main' } = options;
    
    if (!owner || !repo) {
      throw new Error('Repository owner and name are required');
    }

    const body = {
      message,
      content: Buffer.from(content).toString('base64'),
      branch,
      ...options
    };

    if (sha) {
      body.sha = sha;
    }

    return await this.makeRequest(`/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      body
    });
  }

  /**
   * Get repository issues
   * @param {object} params - Query parameters
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   */
  async getIssues(params = {}, owner = this.defaultOwner, repo = this.defaultRepo) {
    if (!owner || !repo) {
      throw new Error('Repository owner and name are required');
    }

    const queryParams = new URLSearchParams({
      state: 'open',
      sort: 'updated',
      per_page: 30,
      ...params
    });
    
    return await this.makeRequest(`/repos/${owner}/${repo}/issues?${queryParams}`);
  }

  /**
   * Create a new issue
   * @param {string} title - Issue title
   * @param {string} body - Issue body
   * @param {object} options - Additional options
   */
  async createIssue(title, body, options = {}) {
    const { owner = this.defaultOwner, repo = this.defaultRepo } = options;
    
    if (!owner || !repo) {
      throw new Error('Repository owner and name are required');
    }

    return await this.makeRequest(`/repos/${owner}/${repo}/issues`, {
      method: 'POST',
      body: {
        title,
        body,
        ...options
      }
    });
  }

  /**
   * Get pull requests
   * @param {object} params - Query parameters
   * @param {string} owner - Repository owner
   * @param {string} repo - Repository name
   */
  async getPullRequests(params = {}, owner = this.defaultOwner, repo = this.defaultRepo) {
    if (!owner || !repo) {
      throw new Error('Repository owner and name are required');
    }

    const queryParams = new URLSearchParams({
      state: 'open',
      sort: 'updated',
      per_page: 30,
      ...params
    });
    
    return await this.makeRequest(`/repos/${owner}/${repo}/pulls?${queryParams}`);
  }

  /**
   * Get connection status
   */
  getStatus() {
    return {
      connected: !!this.token,
      baseUrl: this.baseUrl,
      defaultOwner: this.defaultOwner,
      defaultRepo: this.defaultRepo,
      capabilities: this.config.capabilities || []
    };
  }

  /**
   * Disconnect and clear token
   */
  disconnect() {
    this.token = null;
    return { success: true, message: 'GitHub MCP connection disconnected' };
  }
}

export default GitHubMCPHandler;