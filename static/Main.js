(function() {
  $().ready(function() {
    var dataSource, searchAC, searchInput;
    searchAC = function(q) {
      return '/api/search_ac?q=' + q;
    };
    searchInput = $('#searchInput');
    dataSource = function(q, cb) {
      $.get(searchAC(q)).done(function(data) {
        return cb(_.map(data, function(i) {
          return {
            value: i._term
          };
        }));
      });
    };
    return searchInput.typeahead({
      minLength: 3,
      highlight: true
    }, {
      source: dataSource,
      name: "park-kw"
    });
  });

}).call(this);
