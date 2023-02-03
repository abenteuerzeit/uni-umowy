const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const { Rachunek } = require("./models/rachunek");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(morgan("dev"));
app.use(bodyParser.json());

const PORT = 3000 || process.env.PORT;

app.use('/', router);

router.get("/", (req, res, next) => {
  res.status(200).render("home");
});

router.get("/rachunek", async (req, res, next) => {
  const bill = new Rachunek(1234);
  const dummyViewData = {
    name: "Adrian Mroz",
    date: new Date().toISOString().split("T")[0],
    contractID: "DZ.1234.5678.90",
    amountInPLN: await bill.getAmount(),
    amountInWords: await bill.getWords(),
    bankAcctNr: `1234 5678 9012 3456 7890 1234`,
    cost: {
      acquisition: ".".repeat(16),
      tax: ".".repeat(16),
      acct: ".".repeat(16),
      quaestor: ".".repeat(16),
    },
    signatureField: ".".repeat(16),
  };
  res.status(200).render("rachunek", dummyViewData);
});

router.get("/slownie", async (req, res, next) => {
  console.log(`request query: ${req.query.payout}`);
  const asyncPayout = async (amount) => {
    const int = parseInt(amount);
    const bill = new Rachunek(int);
    const words = await bill.getWords();
    return words;
  };
  const payout = await asyncPayout(req.query.payout);
  console.log(payout);
  res.status(200).json({ payout });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;
