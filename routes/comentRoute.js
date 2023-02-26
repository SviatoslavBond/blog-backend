import ComentController from "../controllers/comentController.js";
import checkAuth from '../middleware/checkAuth.js';
import express from 'express';
import { handleValidationErrors, comentValidator } from '../middleware/validators/index.js';
const comentRouter = express.Router();

comentRouter.post('/coment', checkAuth, comentValidator, handleValidationErrors, ComentController.createComent);
comentRouter.get('/coment', ComentController.getAll);
comentRouter.get('/coment/:id', ComentController.getComentsByPostId);
comentRouter.get('/coment/like/:id', checkAuth, ComentController.increaselike);



export default comentRouter;