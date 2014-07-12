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
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
  </script>
</div>
