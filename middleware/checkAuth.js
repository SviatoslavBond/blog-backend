import jwt from 'jsonwebtoken';


const checkAuth = (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

	if (token) {
		try {
			const decoded = jwt.verify(token, 'secret key');
			req.userId = decoded._id;
			next();
		} catch (error) {
			return res.status(403).json({
				error,
				message: 'Invalid Token'
			})
		}
	} else {
		return res.status(403).json({
			message: 'Pass token please'
		})
	}
}
export default checkAuth;