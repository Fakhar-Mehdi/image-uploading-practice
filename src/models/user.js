const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
    required: true,
  },
  dp: {
    type: String,
    unique: true,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

export default User;
