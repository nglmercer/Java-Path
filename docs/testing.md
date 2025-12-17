# Testing

This project uses [Bun's built-in test runner](https://bun.sh/docs/cli/test). Tests are located in the `tests/` directory and mirror the source structure.

## Test Structure

- **`tests/platforms/`**: Tests for `env.ts` and `java.ts`.
- **`tests/services/`**: Tests for `installations.ts` and other services.
- **`tests/utils/`**: Tests for file, folder, and command utilities.

## Running Tests

Run all tests:

```bash
bun test
```

Run tests in **watch mode** (re-runs on file change):

```bash
bun test --watch
```

Run tests with **coverage report**:

```bash
bun test --coverage
```

Run a **specific test file**:

```bash
bun test tests/utils/file.test.ts
```
