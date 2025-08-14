import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

describe('Blog Content Collection', () => {
  it('can find the 2025-08-11-new-book.md file in the blog content directory', () => {
    const blogDir = join(process.cwd(), 'content', 'blog')
    const targetFile = '2025-08-11-new-book.md'
    const filePath = join(blogDir, targetFile)
    
    // Verify the file exists
    expect(existsSync(filePath)).toBe(true)
    
    // Read the file content
    const fileContent = readFileSync(filePath, 'utf-8')
    expect(fileContent).toBeDefined()
    expect(fileContent.length).toBeGreaterThan(0)
  })

  it('can parse the frontmatter of 2025-08-11-new-book.md and verify slug', () => {
    const blogDir = join(process.cwd(), 'content', 'blog')
    const targetFile = '2025-08-11-new-book.md'
    const filePath = join(blogDir, targetFile)
    
    // Read and parse the file content
    const fileContent = readFileSync(filePath, 'utf-8')
    
    // Extract frontmatter (content between --- markers)
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/)
    expect(frontmatterMatch).toBeTruthy()
    
    const frontmatter = frontmatterMatch[1]
    
    // Verify key frontmatter fields
    expect(frontmatter).toContain('slug: "2025-08-11-new-book"')
    expect(frontmatter).toContain('title: "New Book!"')
    expect(frontmatter).toContain('date: 2025-08-11T11:08:22+02:00')
    expect(frontmatter).toContain('draft: false')
    expect(frontmatter).toContain('display_name: Iain')
    expect(frontmatter).toContain('top: true')
    expect(frontmatter).toContain('collection: blog')
  })

  it('can find the blog post by matching slug in all blog files', () => {
    const blogDir = join(process.cwd(), 'content', 'blog')
    const targetSlug = '2025-08-11-new-book'
    
    // Get all markdown files in the blog directory
    const files = readdirSync(blogDir).filter(file => file.endsWith('.md'))
    expect(files.length).toBeGreaterThan(0)
    
    // Find the file with matching slug
    let foundPost = null
    
    for (const file of files) {
      const filePath = join(blogDir, file)
      const content = readFileSync(filePath, 'utf-8')
      
      // Check if this file has the target slug
      if (content.includes(`slug: "${targetSlug}"`)) {
        foundPost = {
          filename: file,
          content: content
        }
        break
      }
    }
    
    // Verify we found the post
    expect(foundPost).toBeTruthy()
    expect(foundPost.filename).toBe('2025-08-11-new-book.md')
    expect(foundPost.content).toContain('title: "New Book!"')
    expect(foundPost.content).toContain('display_name: Iain')
  })

  it('verifies the blog post content structure matches expected format', () => {
    const blogDir = join(process.cwd(), 'content', 'blog')
    const targetFile = '2025-08-11-new-book.md'
    const filePath = join(blogDir, targetFile)
    
    const fileContent = readFileSync(filePath, 'utf-8')
    
    // Verify file structure
    expect(fileContent.startsWith('---')).toBe(true)
    expect(fileContent.includes('---', 3)).toBe(true) // Second --- marker
    
    // Verify content after frontmatter
    const contentAfterFrontmatter = fileContent.split('---')[2]
    expect(contentAfterFrontmatter).toBeDefined()
    expect(contentAfterFrontmatter.trim().length).toBeGreaterThan(0)
    expect(contentAfterFrontmatter).toContain('Picture this: You\'re sitting in a meeting')
    expect(contentAfterFrontmatter).toContain('Dev-Speak: Turn Your Vision into Tech')
  })
})