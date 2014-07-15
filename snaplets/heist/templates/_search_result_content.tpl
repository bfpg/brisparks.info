<div class="container">
  <div class="row">
    <div class="col-md-5 column">
        <div id="park-detail-display"></div>

        <h3>Search Results</h3>
        <parkResults>
          <div class="list-group park-results-list">
            <div class="list-group-item park-item"
              data-number="${parkNumber}"
              data-lat="${parkLat}"
              data-long="${parkLong}">

              <h4 class="list-group-item-heading"><parkName/></h4>

              <p class="list-group-item-text">Located on <parkStreet/>, in <parkSuburb/> For those of you so inclined, here are the latitude and longtitude values: Lat <parkLat/>, Long <parkLong/>.
              </p>
            </div>
          </div>
          </parkResults>
    </div>
    <div class="col-md-7 col-md-offset-5 column">
      <div id="map-canvas" style="width:500px; height:400px;"></div>
    </div>
  </div>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVcD_mOe8aIMJ3x-RnfwGQwHsqZQXCNP8"></script>
  <script type="text/javascript">
    google.maps.event.addDomListener(window, 'load', function(){
      var map = brissyParks.initMap();
      var searchResults = brissyParks.readResults();

      if (searchResults.length > 0) {
        brissyParks.displayPark(map, searchResults[0]);
      }
      else {
        brissyParks.displayPark(map, 17);
      }
    });
  </script>
</div>
