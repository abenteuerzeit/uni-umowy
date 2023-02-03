const { assert, expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const { Rachunek } = require("../models/rachunek");

describe("Home page", () => {
  it("should return 200", (done) => {
    request(app)
      .get("/")
      .set("Content-Type", "text/html")
      .expect("Content-Type", /html/)
      .expect(200, done);
  });
  describe("passing query to slownie returns ok", () => {
    it("should return 200", (done) => {
      request(app)
        .get("/slownie?payout=1234")
        .set("Content-Type", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});

describe("Rachunek page", () => {
  it("should return 200", (done) => {
    request(app)
      .get("/rachunek")
      .set("Content-Type", "text/html")
      .expect("Content-Type", /html/)
      .expect(200, done);
  });
  describe("renders name when passed json", () => {
    it("should display Adrian Mroz", (done) => {
      request(app)
        .get("/rachunek")
        .set("Content-Type", "application/json")
        .expect("Content-Type", /html/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.contain("Adrian Mroz");
          done();
        });
    });
  });
});

describe("Currency", async () => {
  it("throws error for negative values", () => {
    assert.throws(() => new Rachunek(-1), Error);
  });
  describe("uses correct grammar", async () => {
    it("has złotych for the number 0", async () => {
      const r0 = new Rachunek(0);
      const words = await r0.getWords();
      expect(words).to.include("złotych");
    });
    it("has złoty for the number 1: ", async () => {
      const r1 = new Rachunek(1);
      const words = await r1.getWords();
      expect(words).to.equal("jeden złoty");
    });
    it("has złote for 2, 3 or 4", async () => {
      const nums = [2, 3, 4];
      nums.forEach(async (n) => {
        const words = await new Rachunek(n).getWords();
        expect(words).to.include("złote");
      });
    });
    it("has złote for the penultimate digit that is different from 1", async () => {
      const nums = [4, 52, 163, 8874];
      nums.forEach(async (n) => {
        const words = await new Rachunek(n).getWords();
        expect(words).to.include("złote");
      });
    });
    it("has złotych for other numbers (ending with the digits: 0, 1, 5-9 or 12, 13, 14)", async () => {
      const endings = ["0", "1", "5", "6", "7", "8", "9"];
      const numbers = [12, 13, 14];
      const size = 100;

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < endings.length; j++) {
          const n = `${i}${endings[j]}`;
          if (!numbers.includes(n)) {
            const int = parseInt(n);
            if (int === 1) continue;
            numbers.push(int);
          }
        }
      }
      numbers.sort((a, b) => a - b);
      numbers.forEach(async (n) => {
        const r = new Rachunek(n);
        const words = await r.getWords();
        try {
          expect(words).to.include("złotych");
          expect(words).to.not.include("złote");
        } catch (e) {
          console.log(`Error for number ${n}: ${r}`);
          throw e;
        }
      });
    });
  });
});

// x0, x1, x5, x6, x7, x8, x9
// Correct ending only for the number 1 is złoty
// Correct ending only for  2, 3 or 4, and the penultimate digit is different from 1 (e.g. 4, 52, 163, 8874) is złote
// for other numbers (ending with the digits: 0, 1, 5-9 or 12, 13, 14) is złotych
// 2 - 4 zlote
// 5 - 21 zlotych
// 22 - 24 zlote
// 25 - 31 zlotych
// 32 - 34 zlote
// x2 - x4 zlote
// x5 - x1 zlotych
// 102 - 104 zlote // check last two digits for any number larger than 100
