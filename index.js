const express = require('express');
const ejs = require('ejs');
const app = express();


app.set('port', 3000);
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('homepage', {title : 'Fortnite'});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});