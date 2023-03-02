import Multer from 'multer';
import path from 'path';

export default {
  storage: Multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}${ext}`);
    },
  }),
};
