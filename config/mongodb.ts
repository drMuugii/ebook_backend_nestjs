// ! mongoDB тэй холбогдох үед terminal дээр хэвлэгддэг болох, алдаа гарсан бол хэвлэх---> яаж холбох вэ

import * as mongoose from 'mongoose';

interface CustomConnectOptions extends mongoose.ConnectOptions {
  useCreateIndex?: boolean;
  useFindAndModify?: boolean;
}

async function ConnectMongoDB() {
  try {
    const options: CustomConnectOptions = {};

    await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`MongoDB connected: ${process.env.MONGODB_URI}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
}

export default ConnectMongoDB;
