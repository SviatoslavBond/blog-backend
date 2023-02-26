import { body } from "express-validator";

export const registerValidator = [
	body('email', 'its not email adress').isEmail(),
	body('password', 'passsword too short and easy ').isLength({ min: 5 }),
	body('fullname').isLength({ min: 3 }),
	body('avatarURL').optional()
]
export const loginValidator = [
	body('email', 'its not email adress').isEmail(),
	body('password', 'passsword too short and easy ').isLength({ min: 5 }),
]

export const comentValidator = [
	body('text', 'Enter text of coment').isLength({ min: 3 }).isString()
]

export const postCreateValidation = [
	body('title', 'Enter title of article').isLength({ min: 3 }).isString(),
	body('text', 'Enter text of article').isLength({ min: 3 }).isString(),
	body('tags', 'INCORECT FORMAT OF TAGS (define as array) ').optional().isArray(),
	body('imgUrl', ' Url is invalid').optional().isString()
]