# GitHub Secrets Configuration

This document explains how to set up the required GitHub secrets for the Dev-Speak project's CI/CD workflow.

## Required Secrets

### SSH_PRIVATE_KEY

This secret is required for the GitHub Actions workflow to push changes to the main branch after tests pass.

#### How to set up:

1. Generate an SSH key pair (if you don't already have one):
   ```bash
   ssh-keygen -t ed25519 -C "github-actions@github.com" -f github-actions-key
   ```

2. Add the public key as a deploy key in your GitHub repository:
   - Go to your repository on GitHub
   - Navigate to Settings > Deploy keys
   - Click "Add deploy key"
   - Give it a title like "GitHub Actions Deploy Key"
   - Paste the content of `github-actions-key.pub`
   - Check "Allow write access"
   - Click "Add key"

3. Add the private key as a repository secret:
   - Go to your repository on GitHub
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `SSH_PRIVATE_KEY`
   - Value: Paste the entire content of the `github-actions-key` file (the private key)
   - Click "Add secret"

## Workflow Usage

The GitHub Actions workflow in `.github/workflows/test-and-merge.yml` uses this secret to:

1. Set up SSH authentication in the GitHub Actions runner
2. Push changes to the main branch after tests pass

If you encounter any issues with the workflow, ensure that:
- The SSH key has been correctly added as a deploy key with write access
- The private key has been correctly added as a repository secret
- The repository name in the workflow file matches your actual repository name