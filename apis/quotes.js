const request = require('request')

request('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(JSON.parse(body))
  }
})