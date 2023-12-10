import { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// multer configuration
const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "assets", "uploads"),
  filename: function (_req, file, cb) {
    const uniqueSuffix = uuidv4();
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

// multer filter
const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter,
});

const uploadSingle = (fieldName: string): RequestHandler => {
  return upload.single(fieldName);
};

const uploadMultiple = (fieldName: string): RequestHandler => {
  return upload.array(fieldName, 10);
};

export { uploadSingle, uploadMultiple };
