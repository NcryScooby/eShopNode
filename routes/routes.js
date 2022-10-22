const router = require("express").Router();

const checkHeader = require("../utils/checkHeader");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// delete file from uploads folder
router.delete("/delete", checkHeader, (req, res) => {
  const { filename } = req.body;
  fs.unlink(__dirname, `./uploads/${filename}`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error deleting file" });
    } else {
      res.status(200).json({ message: "File deleted" });
    }
  });
});

const welcome = require("../controllers/welcome");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
  getImageId,
} = require("../controllers/product");

router.get("/", checkHeader, welcome);
router.post(
  "/createProduct",
  upload.single("image"),
  checkHeader,
  createProduct
);
router.get("/getProducts", checkHeader, getProducts);
router.get("/getProduct/:id", checkHeader, getProduct);
router.put("/updateProduct/:id", checkHeader, updateProduct);
router.delete("/deleteProduct/:id", checkHeader, deleteProduct);
router.get("/getProductByName/:name", checkHeader, getProductByName);
router.get("/getImageId/:id", getImageId);

module.exports = router;
