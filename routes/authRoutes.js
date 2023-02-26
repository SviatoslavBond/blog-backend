
import authController from '../controllers/authController.js';
import checkAuth from '../middleware/checkAuth.js';
import express from 'express';
import { upload } from '../middleware/multer.js';
import { registerValidator, loginValidator, handleValidationErrors } from '../middleware/validators/index.js';
const authRouter = express.Router();

authRouter.post('/register', registerValidator, handleValidationErrors, authController.registration);
authRouter.post('/login', loginValidator, handleValidationErrors, authController.login);
authRouter.get('/me', checkAuth, authController.getUser);
authRouter.get('/users', authController.getUsers);
authRouter.post('/upload/user-avatar', upload.single('userImg'), authController.uploadUserAvatar)

export default authRouter;
