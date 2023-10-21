import dotenv from 'dotenv';

dotenv.config();

// Throws on bad tokens
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('Missing JWT secret');
    process.exit(1);
  }
  return secret!;
}

function getSalt(): string {
  const salt = process.env.SALT_KEY;
  if (!salt) {
    console.error('Missing Password salt');
    process.exit(1);
  }
  return salt!;
}

type Access = {
  port: number;
  host: string;
  user: string;
  password: string;
};

function getDbConfig(): Access {
  const config: Access = {
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  };

  if (!config.host || !config.user || !config.password || !config.port) {
    console.error('Missing DB config');
    process.exit(1);
  }

  return config;
}

function getS3Config() {
  const config = {
    bucket: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };

  if (!config.bucket || !config.region || !config.accessKeyId || !config.secretAccessKey) {
    throw new Error('Missing S3 config');
  }

  return config;
}

function getGlobalSchema(): string {
  const globalDB = process.env.GLOBAL_DB_NAME;
  if (!globalDB) {
    console.error('Missing global DB');
    process.exit(1);
  }
  return globalDB;
}

function getAgoraAppID(): string {
  const appID = process.env.AGORA_APP_ID;
  if (!appID) {
    throw new Error('Missing Agora App ID');
  }
  return appID;
}

function getAgoraAppCertificate(): string {
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  if (!appCertificate) {
    throw new Error('Missing Agora App Certificate');
  }
  return appCertificate;
}

export {
  getJwtSecret,
  getSalt,
  getDbConfig,
  getS3Config,
  getGlobalSchema,
  getAgoraAppID,
  getAgoraAppCertificate,
};
