# Junie MCP Connections

This directory contains Model Context Protocol (MCP) connection configurations and handlers for Junie.

## GitHub MCP Connection

The GitHub MCP connection allows Junie to interact with GitHub repositories using a Personal Access Token (PAT) for authentication.

### Files

- `mcp-connections.json` - Configuration file defining available MCP connections
- `github-mcp-handler.js` - JavaScript handler for GitHub API interactions
- `README.md` - This documentation file

### Configuration

The GitHub MCP connection is configured in `mcp-connections.json` with the following structure:

```json
{
  "connections": [
    {
      "name": "github",
      "type": "github",
      "description": "GitHub MCP connection for repository management and code operations",
      "config": {
        "baseUrl": "https://api.github.com",
        "authentication": {
          "type": "pat",
          "tokenField": "github_pat_token",
          "description": "GitHub Personal Access Token for API authentication"
        },
        "capabilities": [
          "repository.read",
          "repository.write",
          "issues.read",
          "issues.write",
          "pull_requests.read",
          "pull_requests.write",
          "contents.read",
          "contents.write"
        ]
      },
      "inputs": [
        {
          "name": "github_pat_token",
          "type": "password",
          "required": true,
          "description": "GitHub Personal Access Token",
          "validation": {
            "pattern": "^ghp_[a-zA-Z0-9]{36}$",
            "message": "Please enter a valid GitHub Personal Access Token (starts with 'ghp_')"
          }
        }
      ]
    }
  ]
}
```

### Usage

#### 1. Creating a GitHub Personal Access Token

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Click "Generate new token (classic)"
3. Select the following scopes based on your needs:
   - `repo` - Full control of private repositories
   - `public_repo` - Access to public repositories
   - `read:user` - Read access to profile info
   - `user:email` - Access to user email addresses
4. Copy the generated token (starts with `ghp_`)

#### 2. Initializing the Connection

```javascript
import GitHubMCPHandler from './.junie/github-mcp-handler.js'

// Load configuration
const config = {
  baseUrl: 'https://api.github.com',
  default_owner: 'your-username',
  default_repo: 'your-repo'
}

// Create handler instance
const github = new GitHubMCPHandler(config)

// Initialize with PAT token
try {
  const result = await github.initialize('ghp_your_token_here')
  console.log(result.message) // "GitHub MCP connection established successfully"
} catch (error) {
  console.error('Connection failed:', error.message)
}
```

#### 3. Available Methods

##### Repository Operations
```javascript
// Get user repositories
const repos = await github.getRepositories()

// Get specific repository info
const repo = await github.getRepository('owner', 'repo-name')

// Get repository contents
const contents = await github.getContents('path/to/file', 'owner', 'repo-name')

// Update file contents
await github.updateContents(
  'path/to/file.txt',
  'file content',
  'Commit message',
  { owner: 'owner', repo: 'repo-name' }
)
```

##### Issue Operations
```javascript
// Get repository issues
const issues = await github.getIssues({}, 'owner', 'repo-name')

// Create new issue
const newIssue = await github.createIssue(
  'Issue Title',
  'Issue description',
  { owner: 'owner', repo: 'repo-name' }
)
```

##### Pull Request Operations
```javascript
// Get pull requests
const prs = await github.getPullRequests({}, 'owner', 'repo-name')
```

##### Connection Management
```javascript
// Check connection status
const status = github.getStatus()
console.log(status.connected) // true/false

// Disconnect
const result = github.disconnect()
console.log(result.message) // "GitHub MCP connection disconnected"
```

### Error Handling

The handler includes comprehensive error handling:

- **Invalid PAT Token**: Validates token format before making API calls
- **API Errors**: Provides detailed error messages from GitHub API
- **Network Errors**: Handles connection issues gracefully
- **Missing Parameters**: Validates required parameters for operations

### Security Considerations

1. **Token Storage**: Never commit PAT tokens to version control
2. **Token Scope**: Use minimal required scopes for your use case
3. **Token Rotation**: Regularly rotate PAT tokens for security
4. **Environment Variables**: Store tokens in environment variables or secure configuration

### Testing

Run the test suite to verify the implementation:

```bash
yarn test github-mcp-connection
```

The tests cover:
- Configuration loading and validation
- PAT token format validation
- Connection initialization and error handling
- API method functionality
- Error scenarios and edge cases

### Capabilities

The GitHub MCP connection supports the following capabilities:

- **repository.read** - Read repository information and contents
- **repository.write** - Create and update repository contents
- **issues.read** - Read repository issues
- **issues.write** - Create and update issues
- **pull_requests.read** - Read pull requests
- **pull_requests.write** - Create and update pull requests
- **contents.read** - Read file contents
- **contents.write** - Create and update files

### Troubleshooting

#### Common Issues

1. **"Invalid GitHub Personal Access Token format"**
   - Ensure token starts with `ghp_` and is exactly 40 characters long
   - Generate a new token if the current one is invalid

2. **"GitHub API error: 401 - Bad credentials"**
   - Token may be expired or invalid
   - Check token permissions and scopes

3. **"Repository owner and name are required"**
   - Provide owner and repo parameters for repository operations
   - Set default values in configuration

4. **"Network error: Unable to connect to GitHub API"**
   - Check internet connection
   - Verify GitHub API is accessible

### Version History

- **v1.0.0** (2025-08-11) - Initial implementation with PAT authentication
  - Basic repository operations
  - Issue and pull request support
  - Comprehensive error handling
  - Full test coverage