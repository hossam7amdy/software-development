import dotenv from "dotenv";

dotenv.config();

type Access = {
  port: number;
  host: string;
  user: string;
  password: string;
  database: string;
};

export function getDbConfig(): Access {
  const config: Access = {
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  };

  if (!config.host || !config.user || !config.password || !config.port) {
    console.error("Missing DB config");
    process.exit(1);
  }

  return config;
}

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("Missing JWT secret");
    process.exit(1);
  }
  return secret!;
}

export function getSalt(): string {
  const salt = process.env.SALT_KEY;
  if (!salt) {
    console.error("Missing Password salt");
    process.exit(1);
  }
  return salt!;
}

export function getS3Config() {
  const config = {
    bucket: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
  };

  if (!config.bucket || !config.region) {
    throw new Error("Missing S3 config");
  }

  return config;
}

export function getLoggerPath() {
  const path = process.env.LOG_FILE_PATH;
  if (!path) {
    throw new Error("Missing path variable");
  }

  return path;
}
