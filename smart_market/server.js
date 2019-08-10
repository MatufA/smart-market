// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')

// Create Express app
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
 
 
// Routes will go here
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html');   
});

app.get('/graph', function(req, res){
  res.sendFile(__dirname + '/public/html/graphs.html');
})
app.use(express.static('public'))
app.listen(3000, () => console.log('Server started on port 3000'));
