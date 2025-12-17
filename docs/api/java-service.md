# Java Service (`JavaInfoService`)

A higher-level service for interacting with remote Java repositories (Adoptium) to list versions and download releases.

```typescript
import { JavaInfoService } from "java-path";
```

## `getInstallableVersions()`

Fetches the list of available Java versions from the API.

```typescript
const info = await JavaInfoService.getInstallableVersions();
console.log(info.available); // e.g., [8, 11, 17, 21]
console.log(info.releases); // Array of specific release objects
```

## `filter(releases, version)`

Helps find a specific release object from the list returned by `getInstallableVersions`.

```typescript
const release = await JavaInfoService.filter(info.releases, 17);
```

## `downloadJavaRelease(release, filename, onComplete)`

Downloads the specified release to the default download path.

```typescript
const downloadTask = await JavaInfoService.downloadJavaRelease(
  release,
  "jdk-17.zip"
);

// Wait for the TaskOperation promise
await downloadTask.data.promise;
```

## `decompressJavaRelease(filePath, destination)`

Decompresses a downloaded archive.

```typescript
await JavaInfoService.decompressJavaRelease(
  "/downloads/jdk-17.zip",
  "/unpacked/jdk-17"
);
```
