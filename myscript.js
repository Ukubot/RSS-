
YUI().use('yql', function(Y){

  var url1 = "https://www.readability.com/api/content/v1/parser?url=";
  var testurl = "https://www.readability.com/rseero/latest/feed";
  var urltoken = "&FUTOKEN";
  var finalurl = url1 + testurl + urltoken;
  // console.debug(finalurl);

  var query = 'select * from rss where url = "' + testurl + '"';
  var q = Y.YQL(query, function(r){
    console.log(r);
    var results = r.query.results.item;
    for (var i = 0; i < results.length; i++) {
      var feedItem = results[i];

      // var detailUrl = url1 + feedItem.link + "/" + urltoken + "&callback=?";
      // console.log("detailurl1111="+detailUrl);
      // $.getJSON(detailUrl, function(response) {
      //   console.log(response);
      // });

      $( ".RSS-Feed").append('<div class="col-md-4">'+
      '<div class="RSS-Element">'+
      '<div class="RSS-Text">'+
      '<img src="' + feedItem.link + '"/>' +
      '<h2>'+'<a id="' + feedItem.link + '" class="popup" href="' + '#' +'">' + feedItem.title +'</a>' + '</h2>'+
      '<p>' + feedItem.description +'</p>' +
      '</div>'+
      '<div class="RSS-Element-Footer">'+
      '<p class="text-muted">'+string+"\n"+time+ '</p>'+
      '</div>'+
      '</div>'+
      "</div>");

      var pubDate = feedItem.pubDate;
      var date = new Date(pubDate);
      var days = Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
      var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
      var string = days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
      var time = date.getHours()+":"+date.getMinutes();
      // alert(string+"\n"+time);
      // console.log("\n+"+string+"\n"+time);
    }
  });


  var query = 'select * from rss where url = "' + testurl + '"';
  var q = Y.YQL(query, function(r){
    console.log("feed loaded again");

      $('a.popup').click(function(event) {
        var feedID = event.target.id;
        console.log("feedID"+feedID);
        var IDKey = url1 + feedID + "/" + urltoken;
        console.log("ID key=" + IDKey);

        var results = r.query.results.item;
        console.log("Results=" + results);
        for (var i = 0; i < results.length; i++)
          var feedItem = results;

          var detailUrl = url1 +feedID + "/" + urltoken + "&callback=?";
          console.log("detailed url=" + detailUrl);
          $.getJSON(detailUrl, function(response) {
            console.log("response from get json=" + response);
            console.log(response.title);
            return(response);
          });

        var myWindow = window.open("", "MsgWindow", "width=800,height=800");
        myWindow.document.write("<p>This is feed for article: " + response.title + "</p>");
        // var newwindow = window.open($(this).prop('popup.html'), '', 'height=800,width=800');
        if (window.focus) {
          myWindow.focus();
        }
        return false;
      });
  });
});
