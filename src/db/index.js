import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/blog-application`
    );
    console.log(
      `\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.error("MONGODB connection Error : ", error);
    process.exit(1);
  }
};

export default connectDB;
