const express = require('express');
const bodyParser = require('body-parser');
const fetchData = require('./dataFetcher'); // Import data fetching logic

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// API endpoint to get average of specific number type
app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;
  try {
    const data = await fetchData(type);
    const numbers = data.numbers; // Extract numbers from response
    const avg = calculateNumbersAverage(numbers);
    res.json({ average: avg });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to calculate and return the average (implementation details)
function calculateNumbersAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
