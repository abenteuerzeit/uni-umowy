const _singles = ["", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"];
const _teens = ["", "jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewietnaście"];
const _tens = ["", "dziesięć", "dwadzieścia", "trzydzieści", "czterdzieści", "pięćdziesiąt", "sześćdziesiąt", "siedemdziesiąt", "osiemdziesiąt", "dziewięćdziesiąt"];
const _hundreds = ["", "sto", "dwieście", "trzysta", "czterysta", "pięćset", "sześćset", "siedemset", "osiemset", "dziewięćset"];
const _groupArrays = [ ["","",""], ["tysiąc","tysiące","tysięcy"], ["milion","miliony","milionów"], ["miliard","miliardy","miliardów"], ["bilion","biliony","bilionów"], ["biliard","biliardy","biliardów"],["trylion","tryliony","trylionów"]];      
const _zlotys = ["złoty","złote","złotych"];


class Rachunek {
    constructor(payout) {
        if (payout < 0) throw new Error('Negative numbers are not allowed');
        this.payout = payout;
    }
    getAmount() {
        return this.payout;
    }
    getWords() {
        return this._toWords();
    }
    _toWords() {        
        let num = this.payout;
        if (num === 0) {
            return `zero ${_zlotys[2]}`
        }
        if(num === 1) {
            return `jeden ${_zlotys[0]}`
        }

        let words = [];
        let group = 0;
        while (num !== 0) {
            let h = Math.floor(num % 1000 / 100); // hundreds
            let t = Math.floor(num % 100 / 10); // tens
            let s = num % 10; // single digits
            num = Math.floor(num / 1000);
            
            if (h === t && t === s && s === 0) {
                group += 1;
                continue;
            }
            
            let n = 0;
            if (t === 1 && s > 0) {
                n = s;
                t = s = 0;
            }
            
            let formIndex;
            if (s === 1 && h + t + n === 0) {
                formIndex = 0;
            } else if (s >= 2 && s <= 4) {
                formIndex = 1;
            } else {
                formIndex = 2;
            }    
            words = [_hundreds[h], _tens[t], _teens[n], _singles[s] || group === 0 ? _singles[s] : '', _groupArrays[group][formIndex]].concat(words);
            group += 1;
        }
        let toWords = words.filter(s => s).join(' ');
        return `${toWords} ${this.conjugateZłotys()}`;
    }
    conjugateZłotys = () => {
        let lastDigit = this.payout % 10;
        let lastTwoDigits = this.payout % 100;
        if (lastTwoDigits >= 12 && lastTwoDigits <= 14) {
            return _zlotys[2];
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return _zlotys[1];
        }
        return _zlotys[2];
    };
}

        



module.exports = {
    Rachunek: Rachunek,
    jednostki: {
        _jednosci: _singles,
        _nascie: _teens,
        _dziesiatki: _tens,
        _setki: _hundreds,
        _grupy: _groupArrays,
        _zl: _zlotys
    }
}

