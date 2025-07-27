const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db/db");

const userMiddleware = require("../middleware/user");
const { default: mongoose, trusted } = require("mongoose");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  User.create({
    username,
    password,
  });
  res.json({ message: "user created successfully (singup done)" });
});
router.get("/courses", (req, res) => {
  Course.find().then((response) => {
    res.json({ Courses: response });
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;

  try {
    await User.updateOne(
      { username },
      {
        $push: {
          purchasedCourses: new mongoose.Types.ObjectId(courseId),
        },
      }
    );
  } catch (e) {
    console.log(e);
  }

  res.json({
    message: "Purchase Complete",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });
   const courses = await Course.find({
    _id: {
      "$in": user.purchasedCourses,
    },
  });
  res.json({
    courses,
  });
});

module.exports = router;
