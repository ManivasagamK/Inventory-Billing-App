import mongoose from "mongoose";

const ClientSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  userId: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ClientModel = mongoose.model("ClientModel", ClientSchema);
export default ClientModel;
