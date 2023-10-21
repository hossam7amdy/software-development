import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createReadStream } from "fs";

import { getS3Config } from "../utils/env";

class S3 {
  private cloudfrontDomain = "https://d86meznxb3qd3.cloudfront.net";

  constructor(private s3Client: S3Client, private bucket: string) {}

  uploadFile(foldername: string, file: Express.Multer.File) {
    const uploadParams = {
      Bucket: this.bucket,
      Key: "webapp/" + foldername + file.filename,
      Body: createReadStream(file.path),
    };

    const command = new PutObjectCommand(uploadParams);
    return this.s3Client.send(command);
  }

  downloadFile(key: string) {
    const params = {
      Bucket: this.bucket,
      Key: key,
    };

    const command = new GetObjectCommand(params);
    return this.s3Client.send(command);
  }

  deleteFile(key: string) {
    const params = {
      Bucket: this.bucket,
      Key: key,
    };

    return this.s3Client.send(new DeleteObjectCommand(params));
  }
}

const s3Instance = new S3Client(getS3Config());
export const s3 = new S3(s3Instance, getS3Config().bucket);
