const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());





























app.get('/', (req, res) => {
    res.send('Soul GoodMan is running')
})


app.listen(port, () => {
    console.log(`Soul GoodMan ${port}`);
})