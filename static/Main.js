(function() {
  $().ready(function() {
    var homeUri, searchButton, searchInput, searchValue, submitSearch;
    homeUri = 'https://0.0.0.0:8000';
    searchValue = function() {
      return $(searchInput).val();
    };
    submitSearch = function() {
      return $.get(homeUri);
    };
    searchButton = $('#searchButton');
    searchInput = $('#searchInput');
    return searchButton.on("click", function(e) {
      console.log;
      e.preventDefault();
    });
  });

}).call(this);
