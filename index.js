const express = require('express');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv:ShaikAdil:hello2021@gym-fit-website.aykez.mongodb.net/gym-fit-data?retryWrites=true&w=majority');

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const con = 'Best content so far';
    const params = {'title': 'PUG', 'content': con};
    res.status(200).render('index.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        res.render('index.pug');
    }).catch(()=> {
        res.status(400).send("Items not saved in the database");
    });
});

let port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Successfully started at port ${port}`);
})




