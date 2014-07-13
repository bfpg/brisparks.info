window.brissyParks ?= {}

facility_icons = {
  dog: { icon: '/icons/dog.png', title: 'Dog off-leash area' },
  picnic: { icon: '/icons/table.png', title: 'Picnic area' },
  playground: {},
  sport: {},
  toilet: {},
  bbq: {},
}

brissyParks.initMap = ->
  mapOptions = {
    center: new google.maps.LatLng(-27.497, 153.044),
    zoom: 7
  }
  new google.maps.Map(
    document.getElementById("map-canvas"),
    mapOptions
  )

brissyParks.displayPark = (map, parkId) ->
  $.ajax({
    #url: "/api/park/#{parkId}"
    url: "/"
  })
  .done((data, textStatus, jqXHR) ->
    # add kml to map
    kmlHref = 'https://frase.id.au/badpark2.kml'
    kmlLayer = new google.maps.KmlLayer({ url: kmlHref, map: map })

    # add markers to map
    for facility in [] #facilities
      new google.map.Marker({
        map: map,
        icon: "<the icon url>",
        position: google.maps.LatLng(facility.latlng), # todo fixup
        title: "something"
      })
  )

$().ready ->
  #google.maps.event.addDomListener(window, 'load', initialize)
