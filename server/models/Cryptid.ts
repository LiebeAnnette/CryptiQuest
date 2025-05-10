import { Schema, model } from "mongoose";

const cryptidSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Cryptid = model("Cryptid", cryptidSchema);
export default Cryptid;
