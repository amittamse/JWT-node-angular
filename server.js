var express = require('express');
var faker = require('faker');
var cors = require('cors');

var app = express();
app.use(cors());

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

app.get('/random-company', function(req, resp) {
  var company = function() {
    return {
      "name" : faker.company.companyName(),
      "motto": faker.company.catchPhrase(),
      "long-name": faker.company.bs()
    }
  }

  var co = company()
  co.years_established = Math.floor((Math.random() * 100) + 1)
  resp.json(co);
})

app.listen(app.get('port'), function() {
  console.log('Your app is now running at localhost' + app.get('port') +' HELLO!')
})
