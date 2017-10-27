$(document).ready(function() {

  var tweetLink = "https://twitter.com/intent/tweet?text=";
  var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
  var prefix = "https://cors-anywhere.herokuapp.com/";

  function getQuote() {
    $.getJSON(prefix + quoteUrl, createTweet);
  }

  $.ajaxSetup({
    cache: false
  });

  function createTweet(input) {
    var data = input[0];
    var quoteAuthor = data.title;
    var quoteText = $(data.content).text().trim();

    if (!quoteAuthor.length) quoteAuthor = "Unknown author";

    var tweetText = 'Quote of the day: ' + quoteText + ' Author: +' + quoteAuthor;

    if (quoteText.length > 140) {
      getQuote();
    } else {
      var tweet = tweetLink + encodeURIComponent(tweetText);
      $('.quote').text(quoteText);
      $('.author').text('Author: ' + quoteAuthor);
      $('.tweet').attr('href', tweet);
    }
  }

  $('.trigger').click(function() {
    getQuote()
  });

  getQuote();

})