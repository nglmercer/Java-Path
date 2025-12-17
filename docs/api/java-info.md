# Java Information & Management

Utilities for retrieving information about Java versions and finding installed JDKs on the local system.

## `getJavaInfo(version)`

Retrieves metadata for a specific Java version (e.g., download URLs, expected paths).

```typescript
import { getJavaInfo } from "java-path";

const info = await getJavaInfo(17);
console.log(info.downloadUrl);
```

**Returns**: `Promise<JavaInfoStandard | JavaInfoTermux>`

---

## `scanJavaInstallations(directory)`

Scans a given directory for JDK installations.

```typescript
import { scanJavaInstallations } from "java-path";

const installs = await scanJavaInstallations("C:\\Program Files\\Java");
```

**Parameters**:

- `directory`: The path to scan.

**Returns**: `Promise<InstalledJavaVersion[]>`

---

## `findJavaVersion(directory, version, options)`

Finds a specific Java version within a directory.

```typescript
import { findJavaVersion } from "java-path";

const jdk17 = await findJavaVersion("/usr/lib/jvm", 17, {
  requireValid: true,
  requireSameArch: true,
});
```

**Options**:

- `requireSameArch` (boolean): Enforce architecture match.
- `requireSameOS` (boolean): Enforce OS match.
- `requireValid` (boolean): Check if the java binary is executable.

**Returns**: `Promise<InstalledJavaVersion | null>`
