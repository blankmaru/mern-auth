const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config/keys');

app.use(express.json());
app.use(cors());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('DB connected'))
.catch(err => console.error(err));

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
};

const port = process.env.PORT || 5000;

app.listen(port);