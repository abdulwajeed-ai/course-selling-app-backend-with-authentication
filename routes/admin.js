const { Router } = require("express");
const router = Router();
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db/db");
const { Course } = require("../db/db");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  await Admin.create({
    username,
    password,
  });
  res.json({ message: "Admin Created Successfully" });
});
router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, imageLink, price } = req.body;
  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  res.json({ message: "Course created successfully", courseId: newCourse._id });
  console.log(newCourse);
});
router.get("/courses", adminMiddleware, (req, res) => {
  Course.find().then((response) => {
    res.json({ Courses: response });
  });
});

module.exports = router;
