import { Schema, model, Document } from "mongoose";

export interface ILocation extends Document {
  name: string;
  state: string;
  legend: string;
  address?: string;
}

const locationSchema = new Schema<ILocation>({
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
    required: true,
  },
  address: {
    type: String,
  },
});

const Location = model<ILocation>("Location", locationSchema);
export default Location;
