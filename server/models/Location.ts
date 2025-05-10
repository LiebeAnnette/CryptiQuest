import { Schema, model } from "mongoose";

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  legend: {
    type: String,
  },
  address: {
    type: String,
  },
});

const Location = model("Location", locationSchema);
export default Location;
