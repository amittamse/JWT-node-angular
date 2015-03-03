var express = require('express');
var faker = require('faker');

var app = express();

app.get('/random-user', function(req, res) {
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user)
})

app.listen(3100, function() {
  console.log('server-status')
})