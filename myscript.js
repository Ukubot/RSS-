
        YUI().use('yql', function(Y){

          var url1 = "https://www.readability.com/api/content/v1/parser?url=";
          var testurl = "https://www.readability.com/rseero/latest/feed";
          var urltoken = "&token=NOPE";
          var finalurl = url1 + testurl + urltoken;
          console.debug(finalurl);

            var query = 'select * from rss where url = "https://www.readability.com/rseero/latest/feed"';
            var q = Y.YQL(query, function(r){
                console.log(r);
                var results = r.query.results.item;
                for (var i = 0; i < results.length; i++) {
                  var feedItem = results[i];
                  $( ".RSS-Feed").append('<div class="col-md-4">'+
                '<div class="RSS-Element">'+ '<img src="' + feedItem.link + '"/>' +
                 '<h2>'+'<a class="popup" href="' + feedItem.link +'">' + feedItem.title + '</a>' + '</h2>'+
                  '<p>' + feedItem.description +'</p>' +
                  '<p class="text-muted">' + feedItem.pubDate + '</p>'+
                   '</div>'+
                "</div>");
                var pubDate = feedItem.pubDate;
                var date = new Date(pubDate);
                var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
                var string = date. getDay() + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
                var day = Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
                var time = date.getHours()+":"+date.getMinutes();
                // alert(string+"\n"+time);
                console.log(day+"\n+"+string+"\n"+time);
                }
        });
            })

            $(document).ready(function() {
              console.log("popupredi");
                $('a.popup').click(function() {
                    var newwindow = window.open($(this).prop('href'), '', 'height=800,width=800');
                    if (window.focus) {
                        newwindow.focus();
                    }
                    return false;
                });
              });
