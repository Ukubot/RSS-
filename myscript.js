        YUI().use('yql', function(Y){
            var query = 'select * from rss where url = "https://www.readability.com/rseero/latest/feed"'
            var q = Y.YQL(query, function(r){
                console.log(r);
                var results = r.query.results.item;
                for (var i = 0; i < results.length; i++) {
                  var feedItem = results[i];
                  $( ".RSS-Feed").append('<div class="col-md-4">'+
                '<div class="RSS-Element">'+ '<h1>' + feedItem.title + '</h1>' + feedItem.description + '</div>'+
                "</div>");
                }
        });
            })



            // $( "<div/>", {
            //   "class": "col-md-4 RSS-Element",
            //   html: feedItem.title +
            //   feedItem.description
            // }).appendTo( ".RSS-Feed" );
