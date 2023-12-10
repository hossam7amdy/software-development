import { unlink } from 'fs/promises';

const removeLocalFiles = async (files: Express.Multer.File[]) => {
  try {
    await Promise.allSettled(files.map(file => unlink(file.path)));
  } catch (err) {
    console.log('failed to remove local files', err);
  }
};

export { removeLocalFiles };
