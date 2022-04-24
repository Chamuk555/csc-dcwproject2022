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

let cats = [
  {
    id: 1,
    name: "เปอร์เซีย",
    description:
      "เป็นสายพันธุ์แมวต่างชาติที่นิยมเลี้ยงในไทยสมัยแรก ๆ เป็นต้นกำเนิดของแมวสายพันธุ์อื่น ๆ อย่างเอ็กโซติกชอร์ตแฮร์ และหิมาลายัน ลักษณะโดดเด่นคือดวงตากลมโต หน้าแบน แก้มใหญ่และขนฟูฟ่อง จัดเป็นแมวขนาดกลาง แต่ดูตัวใหญ่เพราะมีขนฟูใหญ่ ตัวผู้จะมีขนาดใหญ่กว่าตัวเมีย เป็นสายพันธุ์แมวที่มีสีให้เลือกเยอะมาก",
    character:
      "นิสัยหลัก ๆ คือเป็นแมวที่เงียบขรึม สุภาพและอ่อนโยน เข้ากับทุกคนได้ง่าย",
    treatment: "จะต้องดูแลเรื่องขนเป็นพิเศษ แปรงขน เช็ดหน้าและคราบน้ำตาทุกวัน",
    image: "/assets/cats/persian.png",
    type: "inter",
  },
  {
    id: 2,
    name: "สฟริงซ์",
    description:
      "สำหรับแมวสฟิงซ์เป็นที่รู้จักกันดีในฐานะแมวที่ไม่มีขน ทำให้มีลักษณะที่โดดเด่นไม่เหมือนสายพันธุ์อื่น แต่จริง ๆ แล้วแมวสฟิงซ์มีขนบาง ๆ บริเวณจมูกและหลังใบหู ใครเลี้ยงแมวพันธุ์นี้ก็หมดปัญหาเรื่องขนติดเสื้อไปได้เลย จัดเป็นแมวขนาดกลาง มีสีและลายบนผิวหนังได้หลายแบบ อายุยืนได้ถึง 15 ปี เลยทีเดียว สามารถเข้ากับสัตว์อื่น เด็ก ๆ ได้ง่าย ชอบนอนบนเตียงเดียวกับเจ้าของ",
    character:
      "เป็นแมวที่กระตือรือร้น อยากรู้อยากเห็น ชอบเข้าสังคม และเจอเพื่อนใหม่",
    treatment:
      "ถึงแม้จะไม่มีขนแต่ก็ยังต้องดูแลอาบน้ำทำความสะอาดแต่ไม่ควรบ่อยเกินไป ประมาณ 2-3 เดือนครั้ง สิ่งสำคัญคือต้องดูแลผิวหนังไม่ให้ไหม้แดด หรือโดนอากาศหนาวจัด",
    image:
      "https://images.pexels.com/photos/4587970/pexels-photo-4587970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    type: "special",
  },
  {
    id: 3,
    name: "วิเชียรมาศ",
    description:
      "แมวไทยหรือวิเชียรมาศ เป็นสายพันธุ์แมวไทยมงคลที่ยังหลงเหลืออยู่ในปัจจุบัน ลักษณะเด่นของแมวไทยหรือแมววิเชียรมาศคือ มีดวงตาสีฟ้า สีขนบริเวณลำตัวเป็นสีสว่าง แต่มีสีน้ำตาลเข้นตรงใบหู หน้า หาง และขาทั้ง 4 ข้าง เป็นแมวที่ติดเจ้าของและเป็นเพื่อนที่ดีให้เราได้ ชอบอยู่กับคนในครอบครัว",
    character:
      "เป็นแมวที่ค่อนข้างฉลาด เป็นมิตร และติดคน สนใจสิ่งแวดล้อมรอบตัว แถมยังจัดเป็นแมวช่างพูดอีกด้วย",
    treatment:
      "วิเชียรมาศจัดเป็นแมวขนสั้น และสามารถเลียขนดูแลทำความสะอาดตัวเองได้ อาบน้ำเดือนละครั้ง นอกนั้นก็ทำความสะอาดใบหู ตัดเล็บ และดูแลฟัน",
    image: "https://www.proplan.co.th/sites/default/files/body-image_6.jpg",
    type: "thai",
  },
];

let hospital = [
  {
    id: 1,
    name: "โรงพยาบาลสัตว์ฮักมี",
    description:
      "โรงพยาบาลสัตว์ฮักมีถือว่าเป็นตัวเลือกที่น่าสนใจสำหรับชาวภูเก็ต เพราะมีโปรแกรมสำหรับการตรวจสุขภาพสัตว์เลี้ยงให้เลือกมากมาย ไม่ว่าจะเป็นสำหรับสุนัขหรือแมวก็ตาม บุคลากรในโรงพยาบาลล้วนให้การบริการแบบเป็นกันเอง",
    location:
      "100/16 Moo7 Srisunthon Sub-District,Thalang Phuket 83110 Thailand",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipObryADwHghkRb6tk_CwtH2sg_sXU6VS4Zbeim4=w750-h606-p-k-no",
    phone: "076 510 656",
    slug: "https://hug-me-pet-hospital.business.site/",
  },
  {
    id: 2,
    name: "โรงพยาบาลสัตว์กะทู้",
    description:
      "โรงพยาบาลสัตว์แห่งนี้มีบริการเสริมที่น่าสนใจอย่างบริการโรงแรมสัตว์เลี้ยง ซึ่งบริการนี้จะช่วยให้คุณสามารถนำสัตว์เลี้ยงมาฝากเลี้ยงได้ โดยสัตว์เลี้ยงของคุณจะได้พักผ่อนไปกับสิ่งอำนวยความสะดวกต่าง ๆ มากมายที่จัดสรรไว้ให้ ในส่วนของการรักษาก็สามารถรักษาอาการโรคทั่วไป ผ่าตัด รวมถึงรักษาอาการเฉพาะทางได้หลายกรณี",
    location: "15/28 ถ.วิชิตสงคราม Kathu District, Phuket 83120",
    image:
      "https://img.my-best.in.th/press_component/item_part_images/9eddbcb74baf7acfa5688baa8c0e76a8.jpg?ixlib=rails-4.2.0&q=70&lossless=0&w=640&h=640&fit=clip",
    phone: "076 319 526",
    slug: "https://www.facebook.com/Kathuanimalhospital/",
  },
];

let gallery = [
  {
    id: 1,
    src: "https://news.cgtn.com/news/77416a4e3145544d326b544d354d444d3355444f31457a6333566d54/img/37d598e5a04344da81c76621ba273915/37d598e5a04344da81c76621ba273915.jpg",
  },
  {
    id: 2,
    src: "https://static.independent.co.uk/2021/06/16/08/newFile-4.jpg?quality=75&width=982&height=726&auto=webp",
  },
  {
    id: 3,
    src: "/assets/gallery/gallery2.png",
  },
  {
    id: 3,
    src: "/assets/gallery/gallery3.png",
  },
  {
    id: 3,
    src: "/assets/gallery/gallery4.png",
  },
  {
    id: 3,
    src: "/assets/gallery/gallery5.png",
  },
  {
    id: 3,
    src: "/assets/gallery/gallery6.png",
  },
  {
    id: 3,
    src: "/assets/gallery/gallery7.png",
  },
  {
    id: 3,
    src: "/assets/gallery/gallery8.png",
  },
  {
    id: 3,
    src: "/assets/gallery/gallery9.png",
  },
];

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
// router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
//------------------------------------ API Cats ------------------------------------------------------------------------
router
  .route("/cats")
  .get((req, res) => res.json(cats))
  .post((req, res) => {
    try {
      let newCat = {};
      newCat.id = cats.length ? cats[cats.length - 1].id + 1 : 1;
      newCat.name = req.body.name;
      newCat.description = req.body.description;
      newCat.character = req.body.character;
      newCat.image = req.body.image;
      newCat.treatment = req.body.treatment;
      newCat.type = req.body.type;

      cats = [...cats, newCat];
      res.json(cats);
    } catch {
      res.json({ status: "Fail! T_T" });
    }
  });

router
  .route("/cats/:cat_id")
  .get((req, res) => {
    let ID = cats.findIndex((item) => item.id === +req.params.cat_id);
    if (ID >= 0) {
      res.json(cats[ID]);
    } else {
      res.json({ status: "Can't Find" });
    }
  })
  .put((req, res) => {
    let ID = cats.findIndex((item) => item.id === +req.params.cat_id);
    if (ID >= 0) {
      cats[ID].name = req.body.name;
      cats[ID].description = req.body.description;
      cats[ID].character = req.body.character;
      cats[ID].image = req.body.image;
      cats[ID].treatment = req.body.treatment;
      cats[ID].type = req.body.type;

      res.json(cats[ID]);
    } else {
      res.json({ status: "Can't Update" });
    }
  })
  .delete((req, res) => {
    let ID = cats.findIndex((item) => item.id === +req.params.cat_id);
    if (ID >= 0) {
      cats = cats.filter((item) => item.id !== +req.params.cat_id);
      res.json(cats);
    } else {
      res.json({ status: "Can't Delete" });
    }
  });

//------------------------------------ API Hospital ------------------------------------------------------------------------
router
  .route("/hospital")
  .get((req, res) => res.json(hospital))
  .post((req, res) => {
    try {
      let newHospital = {};
      newHospital.id = hospital.length
        ? hospital[hospital.length - 1].id + 1
        : 1;
      newHospital.name = req.body.name;
      newHospital.description = req.body.description;
      newHospital.location = req.body.location;
      newHospital.image = req.body.image;
      newHospital.phone = req.body.phone;
      newHospital.slug = req.body.slug;

      hospital = [...hospital, newHospital];
      res.json(hospital);
    } catch {
      res.json({ status: "Fail! T_T" });
    }
  });

router
  .route("/hospital/:hos_id")
  .get((req, res) => {
    let ID = hospital.findIndex((item) => item.id === +req.params.hos_id);
    if (ID >= 0) {
      res.json(hospital[ID]);
    } else {
      res.json({ status: "Can't Find" });
    }
  })
  .put((req, res) => {
    let ID = hospital.findIndex((item) => item.id === +req.params.hos_id);
    if (ID >= 0) {
      hospital[ID].name = req.body.name;
      hospital[ID].description = req.body.description;
      hospital[ID].location = req.body.location;
      hospital[ID].image = req.body.image;
      hospital[ID].phone = req.body.phone;
      hospital[ID].slug = req.body.slug;

      res.json(hospital[ID]);
    } else {
      res.json({ status: "Can't Update" });
    }
  })
  .delete((req, res) => {
    let ID = hospital.findIndex((item) => item.id === +req.params.hos_id);
    if (ID >= 0) {
      hospital = hospital.filter((item) => item.id !== +req.params.hos_id);
      res.json(hospital);
    } else {
      res.json({ status: "Can't Delete" });
    }
  });
//------------------------------------ API Gallery ------------------------------------------------------------------------
router
  .route("/gallery")
  .get((req, res) => res.json(gallery))
  .post((req, res) => {
    try {
      let newImage = {};
      newImage.id = gallery.length ? gallery[gallery.length - 1].id + 1 : 1;
      newImage.src = req.body.src;

      gallery = [...gallery, newImage];
      res.json(gallery);
    } catch {
      res.json({ status: "Fail! T_T" });
    }
  });

router
  .route("/gallery/:img_id")

  .delete((req, res) => {
    let ID = gallery.findIndex((item) => item.id === +req.params.img_id);
    if (ID >= 0) {
      gallery = gallery.filter((item) => item.id !== +req.params.img_id);
      res.json(gallery);
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
