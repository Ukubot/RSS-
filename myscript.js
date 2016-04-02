YUI().use('yql', function(Y){
    var query = 'select * from rss where url = "https://www.readability.com/rseero/latest/feed"'
    var q = Y.YQL(query, function(r){
        console.log(r);
        var items = [];
        $.each( r, function( key, val ) {
          items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "body" );
});
    })
