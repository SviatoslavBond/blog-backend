import { validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(500).json({
			errors,
			msg: "Помилка валідації введених даних"
		})
	}
	next()
}
export default handleValidationErrors;