import { findJavaVersion } from "../src/services/installations";
import { defaultPaths } from "../src/config";
import { JavaInfoService } from "../src/services/java.service";
import type { JavaRelease } from "../src/services/java.service";
import { taskManager } from "../src/services/taskInstance";
import path from "path";

const ARCHFILE_NAME = (release: JavaRelease): string => {
  const { featureVersion, arch, os } = release;
  return `${featureVersion}_${arch}_${os}.zip`;
};
async function getorinstallJava(version = 23) {
  const findResult = await findJavaVersion(defaultPaths.unpackPath, version);
  if (!findResult) {
    const alljavaVersions = await JavaInfoService.getInstallableVersions();
    const FindVersion = await JavaInfoService.filter(
      alljavaVersions.data.releases,
      Number(version),
    );
    if (!FindVersion.data) {
      console.warn("No Java version found");
      return { alljavaVersions, version };
    }
    const getFilename = ARCHFILE_NAME(FindVersion.data);
    const downloadJava = await JavaInfoService.downloadJavaRelease(
      FindVersion.data,
      getFilename,
    );
    if (!downloadJava || !downloadJava.data) {
      console.error("Failed to download Java");
      return { alljavaVersions, version };
    }
    await downloadJava.data.promise;
    const { promise, taskId } = await taskManager.unpack(
      path.join(defaultPaths.downloadPath, getFilename),
    );
    await promise;
    const newResult = await findJavaVersion(defaultPaths.unpackPath, version);
    return { findResult: newResult, downloadJava, alljavaVersions };
  }
  return { findResult };
}
getorinstallJava()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
