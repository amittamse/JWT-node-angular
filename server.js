var express = require('express');
var faker = require('faker');

var app = express();

app.set('port', (process.env.PORT || 5100));
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello From all of us at Empire Carpet.')
})

app.get('/random-user', function(req, res) {
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user)
})

app.listen(app.get('port'), function() {
  console.log('Your app is now running at localhost' + app.get('port') +' HELLO!')
})
