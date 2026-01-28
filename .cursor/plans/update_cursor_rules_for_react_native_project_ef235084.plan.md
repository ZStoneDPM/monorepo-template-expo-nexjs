---
name: Update Cursor Rules for React Native Project
overview: Update all .cursor prompts, commands, and rules files to match the One Percent Better React Native Expo TypeScript project instead of the Next.js JavaScript Firebase project they were copied from.
todos:
  - id: update-create-page-prompt
    content: "Update .cursor/prompts/create-page.md: Change from Next.js pages to React Native screens, update to TypeScript, remove server/client directives, update file structure and testing references"
    status: completed
  - id: update-create-component-prompt
    content: "Update .cursor/prompts/create-component.md: Change to React Native component patterns, TypeScript, remove server/client directives, replace Tailwind with StyleSheet"
    status: completed
  - id: update-common-rules
    content: "Update .cursor/rules/common-rules.mdc: Replace Next.js/Firebase/JavaScript stack with React Native/Expo/Realm/TypeScript stack, remove server component sections, update project structure and file naming"
    status: completed
  - id: update-typescript-rules
    content: "Update .cursor/rules/typescript.mdc: Make TypeScript primary language, add React Native and Realm TypeScript patterns"
    status: completed
  - id: update-unit-tests-rules
    content: "Update .cursor/rules/unit-tests.mdc: Change from React Testing Library (web) to React Native Testing Library, update examples and patterns"
    status: completed
  - id: create-realm-rules
    content: "Create .cursor/rules/realm-rules.mdc: Add Realm Database patterns, schema definitions, CRUD operations, and testing patterns"
    status: completed
  - id: create-react-native-rules
    content: "Create .cursor/rules/react-native-rules.mdc: Add React Native and Expo-specific patterns, navigation, notifications, styling, and performance"
    status: completed
  - id: delete-server-components
    content: "Delete .cursor/rules/server-components.mdc: Not applicable to React Native"
    status: completed
  - id: handle-firebase-rules
    content: Delete .cursor/rules/firebase-rules.mdc or mark as not applicable (project uses Realm, not Firebase)
    status: completed
  - id: review-commands
    content: "Review and update .cursor/commands/*.md files: Verify file paths and remove any Next.js-specific references"
    status: completed
  - id: review-agent-voice
    content: "Review .cursor/rules/agent-voice.mdc: Update any project-specific examples for mobile app context"
    status: completed
  - id: review-self-correction
    content: "Review .cursor/rules/self-correction.mdc: Update any framework-specific examples"
    status: completed
---

# Update Cursor Rules for React Native Project

## Overview

The `.cursor` directory contains prompts, commands, and rules copied from a Next.js web application (Notice Ninja) that need to be updated for this React Native Expo mobile application (One Percent Better). The project uses TypeScript, Realm Database, Expo Notifications, and React Navigation instead of JavaScript, Firebase, and Next.js App Router.

## Files to Update

### Prompts (2 files)

#### 1. `.cursor/prompts/create-page.md`

**Current state**: References Next.js App Router pages (`page.js`, `src/app/`, server/client components)

**Updates needed**:

- Change from Next.js pages to React Native screens
- Update file structure: `src/screens/` instead of `src/app/`
- Remove server/client component directives (not applicable to React Native)
- Update to TypeScript (`.tsx` instead of `.js`)
- Reference React Navigation instead of Next.js routing
- Remove Tailwind CSS references (use React Native StyleSheet or styled components)
- Update testing references for React Native testing

#### 2. `.cursor/prompts/create-component.md`

**Current state**: References Next.js patterns, server/client components, Tailwind CSS

**Updates needed**:

- Update to React Native component patterns
- Change file structure: `src/components/` (keep same)
- Update to TypeScript (`.tsx` instead of `.js`)
- Remove server/client component directives
- Replace Tailwind CSS with React Native StyleSheet or StyleSheet API
- Update testing for React Native components
- Reference React Native component patterns (View, Text, TouchableOpacity, etc.)

### Commands (4 files)

#### 3. `.cursor/commands/write_docs.md`

**Current state**: Generic, should work but may reference Next.js patterns

**Updates needed**:

- Review for any Next.js-specific references
- Update file structure references if needed
- Keep generic documentation guidance

#### 4. `.cursor/commands/plan_feature.md`

**Current state**: Generic, references `docs/features/` directory

**Updates needed**:

- Verify file paths match project structure
- Update any framework-specific references if present
- Keep generic planning structure

#### 5. `.cursor/commands/create_breif.md`

**Current state**: Generic, references `docs/PRODUCT_BRIEF.md`

**Updates needed**:

- Verify file paths
- Keep generic structure

#### 6. `.cursor/commands/code_review.md`

**Current state**: Generic, references `docs/features/_REVIEW.md`

**Updates needed**:

- Verify file paths
- Update any framework-specific review criteria if needed
- Keep generic review structure

### Rules (7 files)

#### 7. `.cursor/rules/common-rules.mdc`

**Current state**: Heavily Next.js/JavaScript/Firebase focused

**Major updates needed**:

- **Project Overview**: Change from Next.js to React Native Expo
- **Tech Stack**:
- Remove: Next.js, Firebase, Tailwind CSS, Stripe
- Add: React Native, Expo, Realm Database, Expo Notifications, React Navigation, TypeScript
- **Remove entire "Server Component Patterns" section** (not applicable)
- **Remove "Client/Server Code Separation" section** (not applicable to React Native)
- **Project Structure**: Update to React Native structure:
- `src/screens/` - Screen components
- `src/components/` - Reusable components
- `src/navigation/` - Navigation setup
- `src/services/` - Services (notifications, Realm, etc.)
- `src/models/` - Realm schemas
- `src/utils/` - Utility functions
- **File Naming**: Update to TypeScript (`.ts`, `.tsx`)
- **Styling**: Replace Tailwind with React Native StyleSheet
- **Testing**: Update for React Native testing (Jest + React Native Testing Library)
- **Import Organization**: Update for React Native patterns (no `@/` alias unless configured)
- **Dependencies**: Update to React Native/Expo dependencies

#### 8. `.cursor/rules/typescript.mdc`

**Current state**: May be optional/guidelines for a JavaScript project

**Updates needed**:

- Make TypeScript the primary language (not optional)
- Update examples to show TypeScript patterns
- Add React Native TypeScript patterns
- Add Realm TypeScript schema patterns
- Add React Navigation TypeScript types

#### 9. `.cursor/rules/firebase-rules.mdc`

**Current state**: Firebase-specific rules

**Options**:

- **Option A**: Delete the file (not used in this project)
- **Option B**: Keep but mark as not applicable and create `realm-rules.mdc` instead

**Recommendation**: Delete and create `realm-rules.mdc` with Realm-specific patterns

#### 10. `.cursor/rules/server-components.mdc`

**Current state**: Next.js server component patterns

**Action**: **Delete this file** - not applicable to React Native

#### 11. `.cursor/rules/unit-tests.mdc`

**Current state**: Jest + React Testing Library (web)

**Updates needed**:

- Update for React Native Testing Library
- Update component examples (View, Text instead of div, span)
- Update test utilities for React Native
- Add Realm testing patterns
- Update mocking patterns for Expo modules
- Update file extensions (`.test.tsx` instead of `.test.jsx`)

#### 12. `.cursor/rules/agent-voice.mdc`

**Current state**: Generic, framework-agnostic

**Updates needed**:

- Review for any project-specific references
- Keep generic value assessment framework
- May need minor updates for mobile app context

#### 13. `.cursor/rules/self-correction.mdc`

**Current state**: Generic, framework-agnostic

**Updates needed**:

- Review for any project-specific references
- Keep generic self-correction patterns
- Update examples if they reference Next.js/Firebase

## New Files to Create

### 14. `.cursor/rules/realm-rules.mdc` (NEW)

**Purpose**: Realm Database patterns and best practices

**Content should include**:

- Realm schema definition patterns
- TypeScript interfaces for Realm models
- CRUD operation patterns
- Query patterns
- Migration patterns
- Performance best practices
- Testing Realm operations

### 15. `.cursor/rules/react-native-rules.mdc` (NEW)

**Purpose**: React Native and Expo-specific patterns

**Content should include**:

- React Native component patterns
- Expo module usage
- Navigation patterns (React Navigation)
- Notification patterns (Expo Notifications)
- Styling patterns (StyleSheet API)
- Platform-specific code (iOS/Android)
- Performance optimization for mobile
- Testing React Native components

## Implementation Order

1. **Update prompts** (create-page.md, create-component.md) - These are most frequently used
2. **Update common-rules.mdc** - Core project rules
3. **Update typescript.mdc** - Make TypeScript primary
4. **Update unit-tests.mdc** - Testing patterns
5. **Create new rules** (realm-rules.mdc, react-native-rules.mdc)
6. **Delete/update irrelevant rules** (server-components.mdc, firebase-rules.mdc)
7. **Review and update commands** - Minor updates if needed
8. **Review agent-voice and self-correction** - Minor updates if needed

## Key Changes Summary

| Aspect         | Old (Next.js)      | New (React Native)        |
| -------------- | ------------------ | ------------------------- |
| Framework      | Next.js App Router | React Native + Expo       |
| Language       | JavaScript         | TypeScript                |
| Database       | Firebase Firestore | Realm Database            |
| Styling        | Tailwind CSS       | StyleSheet API            |
| Navigation     | Next.js routing    | React Navigation          |
| Testing        | Jest + RTL (web)   | Jest + RNTL (mobile)      |
| File Structure | `src/app/` pages   | `src/screens/` screens    |
| Components     | Server/Client      | Standard React components |
| Notifications  | N/A                | Expo Notifications        |

## Notes

- Keep generic patterns that apply to both (error handling, code organization, etc.)
- Update all examples to use TypeScript
- Remove all Next.js/Firebase-specific patterns
- Add React Native/Expo/Realm-specific patterns
- Ensure file paths match the PRD structure
- Update all code examples to match the new stack
