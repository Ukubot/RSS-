YUI().use('yql', function(Y){

  var details = {};
  var url1 = "https://www.readability.com/api/content/v1/parser?url=";
  var testurl = "https://www.readability.com/rseero/latest/feed";
  var urltoken = "&token=hiddenkey";
  var finalurl = url1 + testurl + urltoken;

  var query = 'select * from rss where url = "' + testurl + '"';
  var q = Y.YQL(query, function(r){
    var results = r.query.results.item;

    var days = Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var previews = results.forEach(function(feedItem, idx) {
      var pubDate = feedItem.pubDate;
      var date = new Date(pubDate);
      var string = days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
      var time = date.getHours()+":"+date.getMinutes();

      var contentPreview = document.createElement("div");
      contentPreview.className = "col-md-4";
      contentPreview.innerHTML = '<div class="RSS-Element">'+
      '<div class="RSS-Text">'+
      '<img id="feeditem-img-' + idx + '"/>' +
      '<h2>'+'<a id="' + feedItem.link + '" class="popup" href="' + '#' +'">' + feedItem.title +'</a>' + '</h2>'+
      '<p class="description">' + feedItem.description +'</p>' +
      '</div>'+
      '<div class="RSS-Element-Footer">'+
      '<p class="text-muted">'+string+"\n"+time+ '</p>'+
      '</div>'+
      '</div>'+
      "</div>";

      $(contentPreview).click(function() {
        var item = feedItem;
        var itemDetail = details[item.guid];
        if (itemDetail) {
          var myWindow = window.open("", "Popup article", "width=800,height=800,scrollbars=1");
          myWindow.document.write("<h1>"+feedItem.title+"</h1>" + "<p>" + string +"</p>" + "</br>" + "<p>" + itemDetail.content + "</p>");
        }
        else {
          console.log("Item not yet loaded. What do?");
        }
      });

      $(".RSS-Feed").append(contentPreview);
    });

    results.forEach(function(feedItem, idx) {
      var detailUrl = url1 + feedItem.link + "/" + urltoken + "&callback=?";
      $.getJSON(detailUrl, function(detail) {
        var imageId = "feeditem-img-" + idx;
        leadimage = detail.lead_image_url;
        if( detail.lead_image_url === null){
          leadimage = 'https://d370mdr42phnax.cloudfront.net/avatar/StaffPicks-08a7b3.png';
        }
        $("#" + imageId).attr("src", leadimage);
        details[feedItem.guid] = detail;
      });
    });
  });
});
