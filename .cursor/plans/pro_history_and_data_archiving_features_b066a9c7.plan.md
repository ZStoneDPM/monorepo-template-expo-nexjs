---
name: Pro History and Data Archiving Features
overview: "Add two separate features: (1) Pro user clickable date history in statistics heatmap to view detailed task completions for any date, and (2) Data archiving system to export and purge old completion data. Also add storage estimation display in Settings Data Management section."
todos: []
isProject: false
---

# Pro History and Data Archiving Features

## Feature 1: Pro User Clickable Date History

### Overview

Enable Pro users to click on dates in the Statistics screen heatmap to view detailed task completion history for that specific date, showing task names and their statuses (completed/skipped/snoozed).

### Implementation

#### 1. Update CalendarHeatmap Component

**File**: `src/components/CalendarHeatmap.tsx`

- Add `onDayPress?: (date: string) => void` prop
- Add `onDayPress` handler to Calendar component
- **Only enable onDayPress for dates that have completions** (dates in completionCounts Map)
- Implementation: Check if dateKey exists in completionCounts before calling onDayPress
- Dates without completions should not trigger onDayPress (no click handler or disabled state)
- Pass selected date in YYYY-MM-DD format to parent only if date has completions
- **Note**: react-native-calendars allows disabling specific dates by setting `disabled: true` in markedDates, or by conditionally calling onDayPress only when date has data

#### 2. Create Date History Modal Component

**New File**: `src/components/DateHistoryModal.tsx`

- Modal component that displays task completions for a selected date
- Shows:
  - Date header (formatted: "January 28, 2026")
  - List of tasks with their status (completed/skipped/snoozed)
  - Task name, status badge, completion time (if available)
- **No empty state needed** - modal only opens for dates with completions
- Uses Pro entitlement check (gated feature)
- Styled to match app theme

#### 3. Add Service Function for Date Completions

**File**: `src/services/completions.ts`

- Add `getCompletionsByDate(date: Date): Promise<TaskCompletion[]>` function
- Filters completions for a specific date (start of day to end of day)
- Returns completions sorted by completion time

#### 4. Add Service Function to Get Tasks with Completions

**New File**: `src/services/dateHistory.ts` (or add to existing service)

- Function: `getDateHistory(date: Date): Promise<Array<{ task: Task; completion: TaskCompletion | null }>>`
- Gets all active tasks and matches them with completions for that date
- Returns array of task-completion pairs for display

#### 5. Update StatisticsScreen

**File**: `src/screens/StatisticsScreen.tsx`

- Add state for selected date and modal visibility
- Pass `onDayPress` handler to CalendarHeatmap
- Handle date selection and show DateHistoryModal
- **Before opening modal**: Verify date has completions (check completionCounts Map)
- **If date has no completions**: Do nothing (handler won't be called, but add safety check)
- Check Pro entitlement before showing modal (show paywall if not Pro)

#### 6. Update Entitlement Gating

**File**: `src/utils/entitlementGating.ts`

- Add `dateHistory: 'PRO'` to FEATURE_TIERS mapping

### User Flow

1. User navigates to Statistics screen
2. User taps on a date in the heatmap calendar
3. **If date has completions:**

- If Pro: Modal opens showing task completions for that date
- If Free: Paywall modal appears

1. **If date has no completions:** Nothing happens (date is not clickable)

---

## Feature 2: Data Archiving System

### Overview

Allow users to export old completion data to a readable text file and purge it from the database to manage long-term storage. This is a data management feature available to all users.

### Implementation

#### 1. Add Archive Service Functions

**File**: `src/services/backup.ts` (or new `src/services/archive.ts`)

- `exportArchiveText(cutoffDate: Date): Promise<string>` - Export completions older than cutoffDate to readable text format
  - Format: Date header, then list of tasks with status and completion time
  - Example format:

    ```
    Archive: Completions before January 1, 2025
    Exported on: January 28, 2026

    === January 15, 2024 ===
    - Morning Meditation [Completed] at 7:30 AM
    - Daily Reading [Skipped]
    - Exercise [Completed] at 6:00 PM

    === January 16, 2024 ===
    ...
    ```

- `deleteCompletionsBefore(cutoffDate: Date): Promise<number>` - Delete completions older than cutoffDate from Realm
  - Returns count of deleted completions
  - Uses Realm write transaction
  - Logs deletion for user confirmation

#### 2. Add Archive UI in Settings

**File**: `src/screens/SettingsScreen.tsx`

- Add new section in Data Management: "Archive Old Data"
- Add date picker or input for archive cutoff date (e.g., "Archive data older than 1 year")
- Add "Export Archive" button - exports old data to text file and shares it
- Add "Archive & Purge" button - exports AND deletes old data (with confirmation)
- Show confirmation dialogs with:
  - Number of completions that will be archived
  - Warning that purge cannot be undone
  - Option to export first before purging

#### 3. Add Helper Function to Count Old Completions

**File**: `src/services/completions.ts`

- Add `getCompletionCountBefore(cutoffDate: Date): Promise<number>` - Count completions older than cutoffDate
- Used to show user how many records will be affected

#### 4. Update Backup Service (if needed)

**File**: `src/services/backup.ts`

- Ensure export functions handle large datasets efficiently
- Add progress indication for large exports

### User Flow

1. User navigates to Settings → Data Management
2. User sees "Archive Old Data" section
3. User selects cutoff date (e.g., "1 year ago")
4. System shows count: "X completions will be archived"
5. User can:

- Export only (creates text file, shares it)
- Export & Purge (exports, then deletes from database with confirmation)

---

## Feature 3: Storage Estimation Display

### Overview

Display estimated storage usage in the Data Management section of Settings to help users understand their data footprint.

### Implementation

#### 1. Add Storage Calculation Service

**New File**: `src/services/storage.ts`

- `calculateStorageEstimate(): Promise<{ tasks: number; completions: number; total: number; formatted: string }>`
- Estimates storage based on:
  - Tasks: ~300 bytes average (title ~50, description ~100, other fields ~150)
  - Completions: ~150 bytes average (taskId, date, status, timestamps, optional timer fields)
  - Settings: ~50 bytes
- Returns sizes in bytes and formatted string (KB, MB, etc.)
- Formula:
  - Task size = 300 bytes × task count
  - Completion size = 150 bytes × completion count
  - Total = tasks + completions + settings (50 bytes)

#### 2. Add Storage Display to Settings

**File**: `src/screens/SettingsScreen.tsx`

- Add state for storage estimate
- Load storage estimate on screen focus
- Display in Data Management section:
  - "Storage Usage" info item
  - Shows formatted size (e.g., "2.5 MB" or "150 KB")
  - Breakdown: "X tasks, Y completions"
  - Update when data changes (after archive, clear, etc.)

#### 3. Format Helper Function

**File**: `src/services/storage.ts`

- `formatStorageSize(bytes: number): string` - Format bytes to human-readable (KB, MB, GB)
- Handles ranges: <1 KB, 1-1024 KB, 1-1024 MB, etc.

### Display Format

```
Storage Usage
2.5 MB (150 tasks, 5,000 completions)
```

---

## Technical Details

### Data Structures

**Date History Response:**

```typescript
interface DateHistoryItem {
  task: Task;
  completion: TaskCompletion | null;
  status: "completed" | "skipped" | "snoozed" | "none";
}
```

**Storage Estimate:**

```typescript
interface StorageEstimate {
  tasks: number; // bytes
  completions: number; // bytes
  total: number; // bytes
  formatted: string; // "2.5 MB"
  taskCount: number;
  completionCount: number;
}
```

### Files to Create

- `src/components/DateHistoryModal.tsx` - Modal for date history
- `src/services/dateHistory.ts` - Service for date history data
- `src/services/storage.ts` - Storage calculation service
- `src/services/archive.ts` - Archive functions (or add to backup.ts)

### Files to Modify

- `src/components/CalendarHeatmap.tsx` - Add onDayPress handler
- `src/screens/StatisticsScreen.tsx` - Add date selection and modal
- `src/screens/SettingsScreen.tsx` - Add archive UI and storage display
- `src/services/completions.ts` - Add date-specific and count functions
- `src/services/backup.ts` - Add archive export functions (or create archive.ts)
- `src/utils/entitlementGating.ts` - Add dateHistory feature gate

### Testing Considerations

- Test date history modal with dates that have completions (today, past dates with data)
- **Test that dates without completions are not clickable** (no modal, no action)
- Test archive export with large datasets (1000+ completions)
- Test archive purge with confirmation flow
- Test storage calculation accuracy
- Test Pro entitlement gating for date history
- Test archive functions available to all users (not gated)

### Notes

- Date history is a Pro feature (adds value to premium tier)
- Archiving is available to all users (data management utility)
- Storage estimation helps users understand when archiving might be beneficial
- Archive text format should be human-readable for long-term storage
- Consider adding "Preview" before archive to show sample of what will be exported
