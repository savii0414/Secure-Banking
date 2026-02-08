import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    await connect(process.env.CONNECTION_STRING);
  } catch (error) {
    console.log(`Database connection Failed ${error}`);
    process.exit(1);
  }
};

export default dbConnect;
