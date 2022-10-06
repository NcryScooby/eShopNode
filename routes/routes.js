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
