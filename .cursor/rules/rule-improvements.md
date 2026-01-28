# Rule Improvement Proposals

This file tracks challenges encountered during task execution and proposed improvements to project rules. Each entry represents a learning opportunity to improve the AI agent's understanding and prevent future issues.

## Format

Each entry should follow this structure:

```markdown
## [YYYY-MM-DD] - Brief Challenge Description

**Timestamp**: YYYY-MM-DD HH:MM:SS
**Status**: pending | applied | rejected
**Task Context**: Brief description of what task was being performed
**Challenge**: Detailed description of the issue encountered
**Error Messages**: Any relevant error messages or logs
**Root Cause**: Analysis of why the challenge occurred

- Missing rule?
- Unclear rule?
- Conflicting rules?
- Incomplete rule?
  **Proposed Solution**:
- File: `.cursor/rules/[filename].mdc`
- Section: [Section name]
- Proposed text: [Exact rule text to add/modify]
  **Rationale**: Why this rule would prevent the issue
  **Applied Date**: [If applied, when it was added to rules]
  **Rejection Reason**: [If rejected, why it wasn't implemented]
```

## Entries

<!-- New entries should be added at the top, most recent first -->

---

## Example Entry Template

**Timestamp**: 2024-01-15 14:30:00
**Status**: pending
**Task Context**: Creating a new React component with useEffect hook
**Challenge**: Used async function directly in useEffect without proper dependency handling, causing lint errors and potential bugs
**Error Messages**:

```
React Hook useEffect has a missing dependency: 'fetchData'. Either include it or remove the dependency array.
```

**Root Cause**: Missing rule about proper async function handling in useEffect hooks. The existing rules mention useEffect but don't cover async patterns specifically.
**Proposed Solution**:

- File: `.cursor/rules/common-rules.mdc`
- Section: "Performance Best Practices" → Add subsection "React Hooks - Async Patterns"
- Proposed text:

    ````markdown ### Async Functions in useEffect
          When using async functions in useEffect:
          - Wrap async logic in an immediately invoked function expression (IIFE)
          - Include all dependencies in the dependency array
          - Handle cleanup for ongoing async operations

          ```javascript
          // Good - Proper async handling in useEffect
          useEffect(() => {
              let cancelled = false;

              async function fetchData() {
                  const data = await api.getData();
                  if (!cancelled) {
                      setData(data);
                  }
              }

              fetchData();

              return () => {
                  cancelled = true;
              };
          }, [dependency1, dependency2]);

          // Bad - Missing dependencies or no cleanup
          useEffect(() => {
              async function fetchData() {
                  const data = await api.getData();
                  setData(data);
              }
              fetchData();
          }, []); // Missing dependencies
          ```
          ```

    **Rationale**: This rule would prevent common React hooks violations and ensure proper async handling patterns, reducing lint errors and potential race conditions.
    **Applied Date**: [Not yet applied]
    **Rejection Reason**: [N/A]
    ````

---

## Notes

- Entries are listed in reverse chronological order (newest first)
- Status should be updated when proposals are reviewed
- When a rule is applied, update the status and add the applied date
- When a rule is rejected, update the status and provide a clear rejection reason
- Keep entries concise but complete enough to understand the context
