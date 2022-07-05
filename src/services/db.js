import mongoose from "mongoose";
// import Config from "../config";

export const connectDb = () => {
  return mongoose.connect('mongodb+srv://emamoll:plm_37616367@cluster0.pzs84.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
};
