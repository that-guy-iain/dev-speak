# Dev-Speak Project Guidelines

This document provides essential information for developers working on the Dev-Speak project, a Nuxt 4 application.

## Build/Configuration Instructions

### Environment Setup

1. This project uses Yarn as the package manager:
   ```bash
   yarn install
   ```

2. Nuxt 4 Configuration:
   - The project uses Nuxt 4 with the following modules:
     - `@nuxt/content`: For content management
     - `@nuxt/fonts`: For font management
     - `@nuxt/image`: For image optimization
     - `@nuxt/eslint`: For linting

3. Key configuration files:
   - `nuxt.config.ts`: Main Nuxt configuration
   - `eslint.config.mjs`: ESLint configuration
   - `tsconfig.json`: TypeScript configuration

### Development Workflow

1. Start the development server:
   ```bash
   yarn dev
   ```

2. Build for production:
   ```bash
   yarn build
   ```

3. Preview production build:
   ```bash
   yarn preview
   ```

4. Start production server:
   ```bash
   yarn start
   ```

## Testing Information

### Testing Setup

The project uses Vitest for unit testing Vue components with the following configuration:

- **Test Framework**: Vitest
- **Component Testing Library**: Vue Test Utils
- **Test Environment**: JSDOM (for browser API simulation)

Key testing files:
- `vitest.config.js`: Vitest configuration
- `test/`: Directory containing test files

### Running Tests

Run all tests once:
```bash
yarn test
```

Run tests in watch mode during development:
```bash
yarn test:watch
```

### Writing Tests

1. **Test File Structure**:
   - Place test files in the `test/` directory
   - Name test files with `.test.js` suffix
   - Import components using relative paths

2. **Component Test Example**:

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import YourComponent from '../components/YourComponent.vue'

describe('YourComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(YourComponent)
    // Add assertions here
    expect(wrapper.exists()).toBe(true)
  })
  
  // Test props
  it('handles props correctly', () => {
    const wrapper = mount(YourComponent, {
      props: {
        propName: 'value'
      }
    })
    // Add assertions here
  })
  
  // Test events
  it('emits events correctly', async () => {
    const wrapper = mount(YourComponent)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('eventName')
  })
  
  // Test slots
  it('renders slot content', () => {
    const wrapper = mount(YourComponent, {
      slots: {
        default: 'Slot Content'
      }
    })
    expect(wrapper.text()).toContain('Slot Content')
  })
})
```

3. **Best Practices**:
   - Test one behavior per test case
   - Use descriptive test names
   - Mock external dependencies
   - Test edge cases and error conditions

## Code Style and Development Guidelines

### Vue Component Structure

1. **Component Naming**:
   - Use multi-word names for components (ESLint rule: `vue/multi-word-component-names`)
   - Use PascalCase for component names (e.g., `AppButton.vue`)

2. **Component Organization**:
   - Place components in the `components/` directory
   - Use the Composition API with `<script setup>` for component logic
   - Define props and emits at the top of the script section

3. **Props and Events**:
   - Define prop types and default values
   - Use prop validators when appropriate
   - Define emits using `defineEmits()`

### TypeScript Usage

The project uses TypeScript for type safety. Key guidelines:

1. Define proper types for component props
2. Use TypeScript interfaces for complex data structures
3. Follow the type definitions in the Nuxt modules

### Content Management

The project uses `@nuxt/content` for content management:

1. Place content files in the `content/` directory
2. Use Markdown for content with front matter for metadata
3. Access content using the `useAsyncData` and `queryContent` composables

### Performance Considerations

1. Use the `@nuxt/image` module for optimized images
2. Implement lazy loading for components when appropriate
3. Use server components for content that doesn't need client interactivity

### Git

1. All changes must be staged and commited with a descriptive commit message and then pushed to origin's main branch
2. All changes must be pushed to the remote repository called origin and pushed to the branch main
3. All git commands should use the ssh command that uses the ed2551 key if it exists. If it doesn't exist just use the standard ssh command.