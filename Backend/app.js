const express = require("express");
const app = express();
const PORT = 80;
const cors = require("cors");
const passport = require("passport");
const cookie = require("cookie");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const router = require("express").Router();

const db = require("./database.js");
let users = db.users;
require("./passport.js");

let health = {
  disease: [
    {
      id: 1,
      name: "โรคหวัดแมว",
      symptom1: "อาการเซื่องซึม",
      symptom2: "หายใจลำบาก ",
      symptom3: "มีไข้ ไอ จาม มีน้ำมูก",
      symptom4: "เบื่ออาหาร",
    },
    {
      id: 2,
      name: "โรคเยื่อบุในช่องท้องอักเสบ",
      symptom1: "อาการเซื่องซึม",
      symptom2: "สูญเสียการควบคุมการขับถ่าย",
      symptom3: "ผอมลงแต่ทรวงอกกับช่องท้องใหญ่ขึ้น",
      symptom4: "เบื่ออาหาร",
    },
  ],
};

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
// router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//------------------------------------ API disease ------------------------------------------------------------------------
router
  .route("/disease")
  .get((req, res) => res.json(health))
  .post((req, res) => {
    try {
      let newHealth = {};
      newHealth.id = health.disease.length
        ? health.disease[health.disease.length - 1].id + 1
        : 1;
      newHealth.name = req.body.name;
      newHealth.symptom1 = req.body.symptom1;
      newHealth.symptom2 = req.body.symptom2;
      newHealth.symptom3 = req.body.symptom3;
      newHealth.symptom4 = req.body.symptom4;

      health = { disease: [...health.disease, newHealth] };
      res.json(health);
    } catch {
      res.json({ status: "Fail! T_T" });
    }
  });

router
  .route("/disease/:dis_id")
  .get((req, res) => {
    let ID = health.disease.findIndex((item) => item.id === +req.params.dis_id);
    if (ID >= 0) {
      res.json(health.disease[ID]);
    } else {
      res.json({ status: "Can't Find" });
    }
  })
  .put((req, res) => {
    let ID = health.disease.findIndex((item) => item.id === +req.params.dis_id);
    if (ID >= 0) {
      health.disease[ID].name = req.body.name;
      health.disease[ID].symptom1 = req.body.symptom1;
      health.disease[ID].symptom2 = req.body.symptom2;
      health.disease[ID].symptom3 = req.body.symptom3;
      health.disease[ID].symptom4 = req.body.symptom4;
      res.json(health.disease[ID]);
    } else {
      res.json({ status: "Can't Update" });
    }
  })
  .delete((req, res) => {
    let ID = health.disease.findIndex((item) => item.id === +req.params.dis_id);
    if (ID >= 0) {
      health.disease = health.disease.filter(
        (item) => item.id !== +req.params.dis_id
      );
      res.json(health);
    } else {
      res.json({ status: "Can't Delete" });
    }
  });

//---------------------------------- API Login & Logout & Profile & Register ------------------------------------------------

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
      const token = jwt.sign(user, db.SECRET, {
        expiresIn: req.body.ischeck === "on" ? "7d" : "1d",
      });
      // req.cookie.token = token
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length
      ? users.users[users.users.length - 1].id + 1
      : 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

// Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: {
      status: statusCode,
      message: err.message,
    },
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
