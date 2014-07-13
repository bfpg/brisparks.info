<!-- Data populated by Heist Template. -->
<parkResults>
  <div class="park-results" style="display:none;">
    <park/>
  </div>
  
</parkResults>
<!-- End -->

<div class="container">
  <div class="row">
    <div class="col-md-5 column">
        <div id="park-detail-display"></div>
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

      if (searchResults.length !== 0) {
        $('#park-detail-display').html(brissyParks.printPark(searchResults[0]));
        brissyParks.displayPark(map, searchResults[0].number);
      }
      else {
        brissyParks.displayPark(map, 17);
      }
    });
  </script>
</div>
