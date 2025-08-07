# Dev-Speak - Nuxt 4 Application

A modern web application built with Nuxt 4, designed to provide developers with a platform for technical content and resources. Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Project Overview

Dev-Speak is built with the following technologies and features:

- **Nuxt 4**: Modern Vue.js framework with server-side rendering capabilities
- **TypeScript**: For type safety and improved developer experience
- **Nuxt Modules**:
  - `@nuxt/content`: Content management system for Markdown files
  - `@nuxt/fonts`: Font management and optimization
  - `@nuxt/image`: Image optimization and responsive images
  - `@nuxt/eslint`: Code linting and formatting

## Project Structure

- `components/`: Vue components (use PascalCase naming, e.g., `AppButton.vue`)
- `content/`: Markdown content files with front matter metadata
- `pages/`: Application routes and page components
- `public/`: Static assets served at the root path
- `test/`: Test files (use `.test.js` suffix)
- Configuration files:
  - `nuxt.config.ts`: Main Nuxt configuration
  - `eslint.config.mjs`: ESLint configuration
  - `tsconfig.json`: TypeScript configuration
  - `vitest.config.js`: Vitest test configuration

## Setup

Make sure to install dependencies using Yarn:

```bash
yarn install
```

## Development Workflow

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

### Testing

Run all tests once:

```bash
yarn test
```

Run tests in watch mode during development:

```bash
yarn test:watch
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Start the production server:

```bash
yarn start
```

## Deployment

- **Production URL**: [dev-speak.com](https://dev-speak.com)
- **Hosting**: DigitalOcean App Platform
- **CI/CD**: Automatic deployment from the main branch
  - Any changes pushed to the main branch will automatically be deployed to production

## Development Guidelines

### Content Management

- Place content files in the `content/` directory
- Use Markdown for content with front matter for metadata
- Access content using the `useAsyncData` and `queryContent` composables

### Component Development

- Use the Composition API with `<script setup>` for component logic
- Define props and emits at the top of the script section
- Follow TypeScript guidelines for type safety

### Performance Best Practices

- Use the `@nuxt/image` module for optimized images
- Implement lazy loading for components when appropriate
- Use server components for content that doesn't need client interactivity

For more detailed information, refer to the project guidelines document.
