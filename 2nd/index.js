const express = require("express");
const axios = require("axios");
const app = express();

const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT = 500;
let window = [];

const URLS = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibo",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/random",
};

const fetchingFromAPI = async (n) => {
  try {
    const response = await axios.get(URLS[n], {
      timeout: TIMEOUT,
      headers: {
        Authorization: "Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDc4MzQxLCJpYXQiOjE3MTcwNzgwNDEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImVlM2Y5MTRkLTJlMDQtNDU0NC1iNzNiLTQyNWU3NzAwNjliZSIsInN1YiI6InRhZGluYWRhZGl2c0BnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJLZXNoYXYgTWVtb3JpYWwgSW5zdGl0dXRlIG9mIHRlY2hub2xvZ3kiLCJjbGllbnRJRCI6ImVlM2Y5MTRkLTJlMDQtNDU0NC1iNzNiLTQyNWU3NzAwNjliZSIsImNsaWVudFNlY3JldCI6InN5UmVHRnhjUWt6akNCdWsiLCJvd25lck5hbWUiOiJQaGFuaSBEaXZ5YSBTdGVlIiwib3duZXJFbWFpbCI6InRhZGluYWRhZGl2c0BnbWFpbC5jb20iLCJyb2xsTm8iOiIyMWJkMWEwNTdxIn0.NxAxl5PdjmQDaDIAE5LF-AMoHcUbfnCd-vJhw4xTKco",
    
    },
    });
    return response.data.numbers || [];
  } catch (error) {
    console.error("Error fetching numbers:", error.message);
    return [];
  }
};

app.get("/numbers/:id", async (req, res) => {
  const { id } = req.params;

  if (!URLS[id]) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  const nums = await fetchingFromAPI(id);
  console.log();
  let windowPrevState = [...window];


  nums.forEach((num) => {
    if (!window.includes(num)) {
      if (window.length >= WINDOW_SIZE) {
        window.shift();
      }
      window.push(num);
    }
  });

  let sum = 0;
for (let i = 0; i < window.length; i++) {
  sum += window[i];
}
const avg = window.length > 0 ? sum / window.length : 0;

  res.json({
    windowPrevState,
    windowCurrState: window,
    numbers: nums,
    avg: avg.toFixed(2),
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

  