const mongoose = require("mongoose");
const dotenv = require('dotenv').config();


const app = require("./app")

// database connection

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s8hzlwh.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url).then(() => {
    console.log("Database connection is successful");
})



//server
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Running Node Server ')
})
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});



