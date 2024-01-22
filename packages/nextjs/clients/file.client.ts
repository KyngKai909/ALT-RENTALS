import useHttpClient, { HttpClient } from "./base.client";
import { DeedInfoModel } from "~~/models/deed-info.model";
import { FileModel } from "~~/models/file.model";
import logger from "~~/services/logger.service";
import { notification } from "~~/utils/scaffold-eth";

// LINK ../pages/api/files.api.ts

export class FileClient extends HttpClient {
  public async downloadFile(fileId: string, name: string) {
    const fileInfo = await this.getFileInfo(fileId);
    if (!fileInfo) {
      notification.error("Error downloading file " + name);
      return;
    }
    const url = `/api/files?download=true&fileId=${fileId}&chainId=${this.chainId}`;
    const toastId = notification.loading("Downloading file ...");
    const response = await fetch(url, {
      headers: [["authorization", this.authorizationToken ?? ""]],
    });
    notification.remove(toastId);
    if (response.status !== 200) {
      notification.error("Error downloading file " + name);
      logger.error({ message: "Error downloading file", details: await response.text() });
      return;
    }
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileInfo.fileName;
    link.click();
    URL.revokeObjectURL(blobUrl);
  }

  public async uploadFile(file: FileModel, fieldLabel: string) {
    try {
      const formData = new FormData();
      // @ts-ignore
      formData.append("file", file.metadata, file.fileName);
      formData.append("payload", JSON.stringify(file));

      const res = await this.post(`/api/files`, formData);
      if (!res.ok) throw new Error(res.error);
      return res.value;
    } catch (error) {
      const message = `Error uploading file ${file.fileName} for field ${fieldLabel}`;
      logger.error({ message, error });
      throw error;
    }
  }

  public async uploadJson(payload: DeedInfoModel): Promise<string> {
    try {
      const res = await this.post(`/api/files?isJson=true`, JSON.stringify(payload), [
        ["Content-Type", "application/json"],
      ]);
      if (!res.ok) throw new Error(res.error);
      return res.value;
    } catch (error) {
      const message = `Error uploading json with payload ${payload}`;
      logger.error({ message, error });
      throw error;
    }
  }

  public async publish(file: FileModel, fieldLabel: string) {
    try {
      const res = await this.post(`/api/files?publish=true`, JSON.stringify(file), [
        ["Content-Type", "application/json"],
      ]);
      if (!res.ok) throw new Error(res.error);
      return res.value;
    } catch (error) {
      const message = `Error publishing file ${file.fileName} for field ${fieldLabel}`;
      logger.error({ message, error });
      throw error;
    }
  }

  public async getFileInfo(fileId: string) {
    const result = await this.get(`/api/files?fileId=${fileId}`);
    if (!result.ok || result.value === undefined) {
      logger.error({ message: "Error getting file info with id " + fileId, status: result.status });
      return undefined;
    }
    return JSON.parse(result.value);
  }
}

const useFileClient = () => useHttpClient(new FileClient());
export default useFileClient;