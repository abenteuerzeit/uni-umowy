# AkadUmowka

This is an app I am writing to automatically generate documents such as invoices and statements for my job to reduce the time I spend preparing documents to get paid.
I am going to slowly expand it with new features. I am starting with the basic.

## Installation

1. Clone the repo
2. Install dependencies with `npm install`
3. Run the app with `npm start`
4. Go to `localhost:3000` in your browser

## Testing

1. Run the tests with `npm test`

The tests are written with Mocha and Chai.
They are not extensive, but they are there.
They check for grammatical correctness of the generated strings and for the correct response codes.

## Technologies

- Node.js
- Express
- Handlebars
- Bootstrap
- Mocha
- Chai
- Visual Studio Code

## What I have done so far

1. Basic home page route with express
2. View templating with handlebars and extremely basic bootstrap css
3. I wrote some tests for the routes and for generating the currency amount in words
4. I implemented a Rachunek class which can generate a string with the value in words and proper grammar, ex.: 12 is dwanaście złotych, and 2 i dwa złote, and 1 is jeden złoty, and so on., it follows the rules of Polish grammar

## TODO

- refactoring
- add groszy values or `00/100` formatted numbers for floats
- add db context
- user authentication and autorization
- a control panel
- history
- generate a downloadable pdf

## Contributing

If you have any ideas, please feel free to create a new issue or get in touch with me. 
