import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://gurleenkaurkhurpa19:gurleenkaur@cluster0.dvmtmlj.mongodb.net/";
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Medkit database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};
export default connectToDB;
