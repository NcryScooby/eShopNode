// importa o model Product
const Product = require("../models/Product");

// importa o path
const path = require("path");

// importa o fs para deletar a imagem do servidor
const fs = require("fs");

// Cria um novo produto
const createProduct = (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file.filename;

  const product = new Product({
    name,
    price,
    description,
    image,
  });

  // verifica se o produto já existe
  Product.findOne({ name: name })
    .then((productExists) => {
      if (productExists) {
        res.json({ error: "Product already exists" });
      } else {
        // salva o produto no banco de dados
        product
          .save()
          .then((product) => {
            res.json(product);
          })
          .catch((err) => {
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

// Retorna todos os produtos
const getProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.json(err);
    });
};

// Retorna um produto específico por id/param
const getProduct = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.json(err);
    });
};

// Atualiza um produto específico por id/param
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  // verifica se o produto existe
  Product.findById(id)
    .then((productExists) => {
      if (productExists) {
        // atualiza o produto no banco de dados
        Product.findByIdAndUpdate(
          id,
          { name, price, description },
          { new: true }
        )
          .then((product) => {
            res.json(product);
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ error: "Product not found" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

// Deleta um produto específico por id/param
const deleteProduct = (req, res) => {
  const { id } = req.params;

  // verifica se o produto existe
  Product.findById(id)
    .then((productExists) => {
      if (productExists) {
        // deleta a imagem vinculada ao produto da pasta uploads do servidor
        fs.unlink(`./uploads/${productExists.image}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            // deleta o produto
            Product.findByIdAndDelete(id)
              .then(() => {
                res.json({
                  success: "Product deleted successfully",
                });
              })
              .catch((err) => {
                res.json(err);
              });
          }
        });
      } else {
        // retorna erro caso o produto não exista
        res.json({ error: "Product not found" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

// Retorna um produto específico por nome/param
const getProductByName = (req, res) => {
  const { name } = req.params;
  Product.find({ name: name })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.json(err);
    });
};

// Retorna o nome da imagem de um produto específico por id/param
const getImageId = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      res.sendFile(path.join(__dirname, `../uploads/${product.image}`));
    })
    .catch((err) => {
      res.json(err);
    });
};

// Exporta as funções
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
  getImageId,
};
