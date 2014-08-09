<div class="container">

  <div class="row">
    <div class="col-md-6">
      <h2>Search Results</h2>
    </div>
    <div class="col-md-6">
      <div class="pull-right">
        <h4><a class="new-search" href="/">New Search?</a></h4>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-5">
      <div id="park-detail-display"></div>

      <parkResults>
      <div class="list-group park-results-list">
        <div class="list-group-item park-item"
          data-number="${parkNumber}"
          data-lat="${parkLat}"
          data-long="${parkLong}">

          <h4 class="list-group-item-heading"><strong><parkName/></strong></h4>
          <p class="list-group-item-text">Located on <parkStreet/>, in <parkSuburb/>.
          </p>
        </div>
      </div>
      </parkResults>
    </div>
    <div class="col-md-7">
      <div id="map-canvas" style="width:500px; height:400px;"></div>
    </div>
  </div>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVcD_mOe8aIMJ3x-RnfwGQwHsqZQXCNP8"></script>
  <script type="text/javascript">
    <!-- TODO: we will also want click handler for showing different parks -->
google.maps.event.addDomListener(window, 'load', function(){
  var map = brissyParks.initMap();
    var searchResults = brissyParks.readResults();

    if (searchResults.length > 0) {
      brissyParks.displayPark(map, searchResults[0]);
    }
});
</script>
</div>
