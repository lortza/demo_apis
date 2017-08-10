// require the request library
const request = require('request')

// set up the base URI for the api (if there is one)
const baseUri = "http://api.nytimes.com/svc/mostpopular/v2"

// pull in your API key
var {TIMES_API_KEY} = require('../secrets');

// Set up a class for this API Info
class TheTimes {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  // set up generic request generator
  _sendRequest(type, callback) {
    // set up url endpoint generator
    const url = `${baseUri}/${type}/all-sections/7?api-key=${this.apiKey}`

    // just like in the simple example above, use the request library to pass the url
    // and return return a specific response
    request(url, function(error, response, body) {
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).results)
      }
    })
  }

  mostEmailed(callback) {
    this._sendRequest("mostemailed", callback)
  }

  // set up a custom method for this specific "most viewed" feed
  mostViewed(callback) {
    this._sendRequest("mostviewed", callback)
  }

  // set up a custom method for this specific "most shared" feed
  mostShared(callback) {
    this._sendRequest("mostshared", callback)
  }
}


// Usage

// set up a new instance of the API class
const times = new TheTimes(TIMES_API_KEY)

// look at the data for the first article in the "mostemailed" category
times.mostEmailed(function(data) {
  console.log(data[0])
})

// print out the titles for each article in the console
times.mostEmailed(function(articles) {
  console.log("Most Emailed")
  console.log("=============")
  articles.forEach(article => { console.log(article.title) })
})

// print out the titles for each article in the console
times.mostViewed(function(articles) {
  console.log(" ")
  console.log("Most Viewed")
  console.log("=============")
  articles.forEach(article => { console.log(article.title) })
})

times.mostShared(function(articles) {
  console.log(" ")
  console.log("Most Shared")
  console.log("=============")
  articles.forEach(article => { console.log(article.title) })
})