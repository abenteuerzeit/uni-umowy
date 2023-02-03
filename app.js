const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const { Rachunek } = require("./models/rachunek");

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(morgan("dev"));

const PORT = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).render("home");
});

app.get("/rachunek", (req, res) => {
  const bill = new Rachunek(1234);
  const dummyViewData = {
    name: "Adrian Mroz",
    date: new Date().toISOString().split("T")[0],
    contractID: "DZ.1234.5678.90",
    amountInPLN: bill.getAmount(),
    amountInWords: bill.getWords(),
    bankAcctNr: `1234 5678 9012 3456 7890 1234`,
    cost: {
      acquisition: ".".repeat(16),
      tax: ".".repeat(16),
      acct: ".".repeat(16),
      quaestor: ".".repeat(16),
    },
    signatureField: ".".repeat(16)
  };
  res.status(200).render("rachunek", dummyViewData);
});

app.get("/slownie", (req, res) => {
  const object = new Rachunek(Math.floor(Math.random() * 100));
  res.status(200).json(object);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;
