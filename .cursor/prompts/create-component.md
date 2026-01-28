# Create React Native Component

Create a new React Native component following project conventions and best practices.

## Requirements

1. **Component Purpose**
    - Keep components focused on a single responsibility
    - Reuse existing primitives in `src/components` before creating new ones
    - Components should be reusable across different screens

2. **File and Directory Structure**
    - Create files under `src/components/`
    - Use PascalCase for the component and file name (e.g., `TaskCard.tsx`, `SnoozeModal.tsx`)
    - Add a matching test file (e.g., `TaskCard.test.tsx`) next to the component
    - Add optional style helpers in the same folder when needed

3. **Component Structure**
    - Use PascalCase for the component function name
    - Use TypeScript for all components
    - Define TypeScript interface for props
    - Destructure props in the function signature
    - Export the component as the default export
    - Move all hooks to the top of the component before any conditional returns

4. **React Native Component Patterns**
    - Use React Native components (View, Text, TouchableOpacity, etc.) instead of HTML elements
    - No server/client component directives (not applicable to React Native)
    - Use appropriate React Native components for the use case:
      - `View` for containers
      - `Text` for text content
      - `TouchableOpacity` or `Pressable` for buttons
      - `ScrollView` or `FlatList` for lists
      - `TextInput` for input fields

5. **Exports and Imports**
    - Export default from the component file
    - Import components using relative paths or configured path aliases
    - Avoid deep relative imports across directories
    - Import React Native components from `react-native`

6. **Styling**
    - Use React Native StyleSheet API for styling
    - Define styles using `StyleSheet.create()` at the bottom of the component
    - Keep styling close to the component; avoid introducing new styling systems
    - Use consistent spacing, colors, and typography from the design system

7. **Data and Props**
    - Define TypeScript interfaces for all props
    - Use optional props with default values when appropriate
    - Handle prop validation through TypeScript types
    - Pass data through props, not through global state when possible

8. **Testing** (see `@.cursor/rules/unit-tests.mdc`)
    - Create `ComponentName.test.tsx` next to the component file
    - Use React Native Testing Library (`render`, `screen`)
    - Use `getByTestId()` for element selection when needed
    - Test component rendering with different props and interactions
    - Mock React Native components and Expo modules as needed

9. **Import Organization** (see `@.cursor/rules/common-rules.mdc`)
    - Import React and React Native first
    - Import third-party libraries
    - Import internal modules (components, services, utils)
    - Use relative imports for files in the same directory

10. **Accessibility**
    - Add `accessibilityLabel` props for screen readers
    - Use semantic components when possible
    - Ensure touch targets are at least 44x44 points
    - Test with accessibility features enabled

## Checklist

- [ ] Component directory and file created under `src/components/`
- [ ] File name uses PascalCase (e.g., `TaskCard.tsx`)
- [ ] Matching test file created (e.g., `TaskCard.test.tsx`)
- [ ] TypeScript interface defined for props
- [ ] Hooks placed at the top before any conditional returns
- [ ] Component exported as default
- [ ] Uses React Native components (View, Text, etc.)
- [ ] Styling uses StyleSheet API
- [ ] Tests cover rendering, props, and interactions
- [ ] Accessibility props added where appropriate
- [ ] Linting passes with no errors
