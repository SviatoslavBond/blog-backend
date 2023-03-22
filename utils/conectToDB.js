import mongoose from 'mongoose';

const connectToDB = () => {
	mongoose.set('strictQuery', true);
	mongoose.connect(process.env.MONGO_URL)
		.then(() => { console.log('Db ok') })
		.catch((e) => { console.log(`DB error ${e}`) })
}
export default connectToDB;

