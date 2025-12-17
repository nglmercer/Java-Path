# Validation Utilities

Standardized response types for consistent API handling.

```typescript
import {
  createSuccessResponse,
  createErrorResponse,
  isSuccess,
} from "java-path";
```

## `ServiceResponse<T>`

A discriminated union type:

```typescript
type ServiceResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; data: T };
```

## Helpers

- **`createSuccessResponse(data)`**: Returns a success object.
- **`createErrorResponse(msg, data?)`**: Returns an error object.
- **`isSuccess(response)`**: Type guard to check if a response is successful.

```typescript
const result = await someService();
if (isSuccess(result)) {
  console.log(result.data); // Type safe access to data
} else {
  console.error(result.error);
}
```
