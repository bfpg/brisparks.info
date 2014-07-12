(function() {
  $().ready(function() {
    var createItemList, dataSource, featureUri, listItems, listWrapper, sButton, searchAC, searchInput;
    listWrapper = _.template("<ul class='list-group'> <%= itemlist %> </ul>");
    listItems = _.template("<% _.forEach(xs, function(x) { %> <li class='list-group-item'> <%- x %> </li> <% }); %>");
    createItemList = function(items) {
      return listWrapper.compile({
        itemlist: listItems.compile({
          xs: items
        })
      });
    };
    searchInput = $('#searchInput');
    sButton = $('#searchButton');
    sButton.hide();
    searchAC = function(q) {
      return '/api/search_ac?q=' + q;
    };
    featureUri = function(q) {
      return '/api/features?q=' + q;
    };
    dataSource = function(q, cb) {
      $.get(searchAC(q)).done(function(data) {
        return cb(_.map(data, function(i) {
          return {
            value: i._term
          };
        }));
      });
    };
    $(document).on("typeahead:selected", function(evt, sugg, dataSet) {
      sButton.show();
      return evt.preventDefault();
    });
    return searchInput.typeahead({
      minLength: 3,
      highlight: true
    }, {
      source: dataSource,
      name: "park-kw"
    });
  });

}).call(this);
