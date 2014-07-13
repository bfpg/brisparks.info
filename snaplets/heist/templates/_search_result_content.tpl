<div class="container">
  <div class="row clearfix">
    <div class="col-md-5 column">
      <div class="row clearfix">        
      </div>
      <div class="row clearfix">
      </div>
      Search Results go here.
    </div>
    <div class="col-md-7 col-md-offset-1 column">
      <div id="map-canvas" style="width:500px; height:400px;"></div>
    </div>
  </div>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsgIi_D0W0TdPplCMUaV4CfMarIJWbCBM"></script>
  <script type="text/javascript">
    google.maps.event.addDomListener(window, 'load', function(){
      var map = brissyParks.initMap();
      brissyParks.displayPark(map, 100);
    });
  </script>
</div>
