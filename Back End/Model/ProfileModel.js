import mongoose from 'mongoose';

const ProfileSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  businessName: String,
  contactAddress: String,
  paymentDetails: String,
  logo: String,
  website: String,
  userId: [String],
});

const ProfileModel = mongoose.model('Profile', ProfileSchema);

export default ProfileModel;
