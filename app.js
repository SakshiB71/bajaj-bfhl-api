const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    operation_code: 1,
    message: "API is running successfully"
  });
});

// POST endpoint at /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input. 'data' must be an array."
      });
    }
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    const alphaChars = [];

    data.forEach(item => {
      const str = String(item);
      if (!isNaN(str) && str.trim() !== '') {
        const num = Number(str);
        sum += num;
        
        if (num % 2 === 0) {
          evenNumbers.push(str);
        } else {
          oddNumbers.push(str);
        }
      } 
      else if (/^[a-zA-Z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
        for (let char of str) {
          alphaChars.push(char);
        }
      } 
      else {
        specialCharacters.push(str);
      }
    });
    const full_name = "sakshi_boora"; 
    const dob = "30112003"; 
    const email = "sssm60111@gmail.com"; 
    const roll_number = "22BIT0515"; 

    let concatString = '';
    for (let i = alphaChars.length - 1; i >= 0; i--) {
      const char = alphaChars[i];
      if ((alphaChars.length - 1 - i) % 2 === 0) {
        concatString += char.toUpperCase();
      } else {
        concatString += char.toLowerCase();
      }
    }
    const response = {
      is_success: true,
      user_id: `${full_name}_${dob}`,
      email: email,
      roll_number: roll_number,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

app.listen(port, () => {
  console.log(`Bajaj BFHL API running on port ${port}`);
});