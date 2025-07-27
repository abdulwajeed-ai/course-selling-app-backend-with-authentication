const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((error) => {
    console.log("❌ failed to connect Database", error);
  });

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
const AdminSchema = mongoose.Schema({
  username: String,
  password: String,
});

const CourseSchema = mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

// models for databases
const User = mongoose.model("User", UserSchema);
const Admin = mongoose.model("Admin", AdminSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  User,
  Admin,
  Course,
};
