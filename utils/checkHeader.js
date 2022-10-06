// Função para verificar se API KEY vem pelo header authorization da requisição
const checkHeader = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === process.env.API_KEY) {
    next();
  } else {
    res.json({ error: "Unauthorized" });
  }
};

module.exports = checkHeader;
