# Create React Native Screen

Create a new React Native screen component following project conventions and best practices.

## Requirements

1. **Follow React Native Screen conventions**

   - File must be named with PascalCase (e.g., `HomeScreen.tsx`, `CreateTaskScreen.tsx`)
   - Place in the `src/screens/` directory
   - Export default function component with descriptive name ending in "Screen"

2. **Component Structure**

   - Use descriptive function name ending with "Screen" (e.g., `HomeScreen`, `CreateTaskScreen`)
   - Destructure navigation props from React Navigation when used
   - Move all hooks to the top of the component before any conditional returns
   - Use TypeScript for all screen components

3. **React Native Component Patterns**

   - Use React Native components (View, Text, ScrollView, etc.) instead of HTML elements
   - Use TouchableOpacity, Pressable, or Button for interactive elements
   - No server/client component directives (not applicable to React Native)

4. **Data Fetching**

   - Fetch data using Realm Database queries or async functions
   - Handle errors with try/catch blocks and user-friendly error messages
   - Use loading states while fetching data
   - Consider using React hooks (useState, useEffect) for data management

5. **Loading States**

   - Show loading indicators (ActivityIndicator) while data is being fetched
   - Keep loading indicators consistent with existing UI patterns
   - Handle empty states gracefully

6. **Styling**

   - Use React Native StyleSheet API for styling
   - Define styles using `StyleSheet.create()` at the bottom of the component
   - Keep styling consistent with the app's design system
   - Use consistent spacing, colors, and typography

7. **Testing** (see `@.cursor/rules/unit-tests.mdc`)

   - Create `ScreenName.test.tsx` next to the screen file
   - Mock child components to isolate screen logic
   - Test that the screen renders expected components and handles empty/error states
   - Use React Native Testing Library for testing

8. **Import Organization** (see `@.cursor/rules/common-rules.mdc`)

   - Import React and React Native components first
   - Import third-party libraries (React Navigation, Expo, etc.)
   - Import internal modules (components, services, utils)
   - Use relative imports for files in the same directory

9. **Navigation Integration**

   - Use React Navigation hooks (`useNavigation`, `useRoute`) when needed
   - Handle navigation params properly with TypeScript types
   - Follow React Navigation patterns for screen options

10. **Creating New Components** (if needed)
    - If the screen requires a new component, create it first using `@.cursor/prompts/create-component.md`
    - Keep components focused and reusable
    - Import components from `@/components` or relative paths

## Checklist

- [ ] File named with PascalCase ending in "Screen.tsx" in `src/screens/`
- [ ] Component name ends with "Screen"
- [ ] Hooks placed at the top before any conditional returns
- [ ] Uses React Native components (View, Text, etc.)
- [ ] Styling uses StyleSheet API
- [ ] Data fetching with error handling (if applicable)
- [ ] Test file `ScreenName.test.tsx` created
- [ ] Navigation properly integrated (if applicable)
- [ ] TypeScript types defined for props and navigation
- [ ] Linting passes with no errors
