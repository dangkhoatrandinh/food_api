const express = require('express');
const app = express();
const mongoose = require('mongoose');

// DB Config
const db = require('./db/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


//CORS Service
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); //For Angular.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route Handler
app.use('/vendor', require('./routes/vendor'));
app.use('/category', require('./routes/category'));
app.use('/food',require('./routes/food'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));