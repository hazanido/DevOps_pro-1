const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const uri =
  "mongodb+srv://hazanido:ido100200310@cluster0.qdogqdd.mongodb.net/?retryWrites=true&w=majority";

// Creating a link to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Model for a student
const Student = mongoose.model('Student', {
  name: String,
  grade1: Number,
  grade2: Number,
  grade3: Number
});

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

          .students-container {
            width: 500px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            padding: 8px;
            text-align: center;
            border-bottom: 1px solid #ddd;
          }

          .home-button {
            display: block;
            width: 93%;
            padding: 10px;
            background-color: #4287f5;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
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
          <br>
          <a href="/students" class="home-button">הצג סטודנטים</a>
        </div>
      </body>
    </html>
  `);
});

app.post('/register', (req, res) => {
  const { name, grade1, grade2, grade3 } = req.body;

// Create a student object from the information sent from the form
  const student = new Student({
    name: name,
    grade1: grade1,
    grade2: grade2,
    grade3: grade3
  });

// Saving the student in the database
  student.save()
    .then(() => {
      res.send(`<h2 style="text-align: center;">הרשמת הסטודנט ${name} התבצעה בהצלחה!</h2><br><a href="/" class="home-button">הוסף סטודנט נוסף</a>`);
    })
    .catch((error) => {
      res.send(`<h2 style="text-align: center;">אירעה שגיאה בעת הרשמת הסטודנט ${name}.</h2><br><a href="/" class="home-button">הוסף סטודנט נוסף</a>`);
      console.error('Error saving student:', error);
    });
});

app.get('/students', (req, res) => {
// Querying the database to get all students
  Student.find()
    .then((students) => {
        // Create a table with the results
      const tableRows = students.map((student) => {
        return `
          <tr>
            <td>${student.name}</td>
            <td>${student.grade1}</td>
            <td>${student.grade2}</td>
            <td>${student.grade3}</td>
          </tr>
        `;
      }).join('');

// Displaying the table on a new page
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

              .students-container {
                width: 500px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              }

              table {
                width: 100%;
                border-collapse: collapse;
              }

              th, td {
                padding: 8px;
                text-align: center;
                border-bottom: 1px solid #ddd;
              }
              
              .home-button {
                display: block;
                width: 150px;
                padding: 10px;
                margin: 0 auto;
                text-align: center;
                background-color: #4caf50;
                color: #fff;
                border: none;
                border-radius: 5px;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="students-container">
              <h1>רשימת הסטודנטים</h1>
              <table>
                <tr>
                  <th>שם הסטודנט</th>
                  <th>ציון 1</th>
                  <th>ציון 2</th>
                  <th>ציון 3</th>
                </tr>
                ${tableRows}
              </table>
              <br>
              <a href="/" class="home-button">הוסף סטודנט נוסף</a>
            </div>
          </body>
        </html>
      `);
    })
    .catch((error) => {
      console.error('Error retrieving students:', error);
      res.send(`<h2 style="text-align: center;">אירעה שגיאה בעת קבלת רשימת הסטודנטים.</h2><br><a href="/" class="home-button">הוסף סטודנט נוסף</a>`);
    });
});

app.listen(port, () => {
  console.log(`The server is running ${port}`);
});


