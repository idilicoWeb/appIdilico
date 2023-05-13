import mongoose from 'mongoose';

console.log(process.env.M)
const connectMongo = async () => mongoose.connect(process.env.DATABASE_URL);

export default connectMongo;