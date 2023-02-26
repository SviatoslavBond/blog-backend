import mongoose from 'mongoose';

const urlMongo = 'mongodb+srv://admin:flatout881799@mern-blog.6htjoca.mongodb.net/blog?retryWrites=true&w=majority'

const connectToDB = () => {
	mongoose.set('strictQuery', true);
	mongoose.connect(process.env.MONGO_URL || urlMongo)
		.then(() => { console.log('Db ok') })
		.catch((e) => { console.log(`DB error ${e}`) })
}
export default connectToDB;

