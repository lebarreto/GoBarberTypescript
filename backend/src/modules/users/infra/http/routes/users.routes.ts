import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

usersRouter.post('/', usersController.create);

// update avatar
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('file'),
  usersAvatarController.update,
);

export default usersRouter;
