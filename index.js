const express = require('express');
const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
          }

          h1 {
            text-align: center;
            margin-bottom: 20px;
          }

          .form-container {
            width: 300px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }

          label {
            display: block;
            margin-bottom: 10px;
          }

          input[type='text'],
          input[type='number'] {
            width: 100%;
            padding: 5px;
            border-radius: 3px;
            border: 1px solid #ccc;
          }

          input[type='submit'] {
            width: 100%;
            padding: 10px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="form-container">
          <h1>הרשמה לקורס</h1>
          <form action="/register" method="POST">
            <label for="name">שם סטודנט:</label>
            <input type="text" id="name" name="name" required><br><br>
            <label for="grade1">ציון 1:</label>
            <input type="number" id="grade1" name="grade1" required><br><br>
            <label for="grade2">ציון 2:</label>
            <input type="number" id="grade2" name="grade2" required><br><br>
            <label for="grade3">ציון 3:</label>
            <input type="number" id="grade3" name="grade3" required><br><br>
            <input type="submit" value="שלח">
          </form>
        </div>
      </body>
    </html>
  `);
});

app.post('/register', (req, res) => {
  const { name, grade1, grade2, grade3 } = req.body;
  // כאן תוכל לעשות עם המידע מהטופס מה שאתה רוצה (לדוגמה, לשמור במסד נתונים)

  res.send(`<h2 style="text-align: center;">הרשמת הסטודנט ${name} התבצעה בהצלחה!</h2>`);
});

app.listen(port, () => {
  console.log(`השרת פועל על פורט ${port}`);
});
