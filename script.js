
var url1 = "https://www.readability.com/api/content/v1/parser?url=";
var testurl = "https://www.readability.com/rseero/latest/feed/";
var urltoken = "&token=7410ba217e8687de6de7d441f6336a54a95c0589";
var finalurl = url1 + testurl + urltoken;
console.debug(finalurl);

$.ajax({
  url      : url1 +  '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(finalurl),
  dataType : 'json',
  success  : function (data) {
    if (data.responseData.feed && data.responseData.feed.entries) {
      $.each(data.responseData.feed.entries, function (i, e) {
        console.log("------------------------");
        console.log("title      : " + e.title);
        console.log("author     : " + e.author);
        console.log("description: " + e.description);
      });
    }
  }
});
