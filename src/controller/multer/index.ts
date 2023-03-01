import Multer from 'multer';
import path from 'path';

export default {
  storage: Multer.diskStorage({
    destination: path.resolve(__dirname, 'uploads'),
    filename: (req, file, cb) => {
      console.log('file', file);
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
};
