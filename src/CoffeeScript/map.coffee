window.brissyParks ?= {}

facility_icons_map =
  'PICNIC NODE': 'picnic'

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
  parkId = 64
  $.ajax({
    url: "/api/park/#{parkId}"
  })
  .done((data, textStatus, jqXHR) ->
    # add kml to map
    kmlHref = 'https://frase.id.au/64.kml'
    kmlLayer = new google.maps.KmlLayer({ url: kmlHref, map: map })

    # add markers to map
    console.dir facility_icons_map
    console.dir facility_icons
    for facility in data.facilities
      #console.log "checking: #{facility._nodeUse}"
      icon_ref = facility_icons_map[facility._nodeUse]
      if icon = facility_icons[icon_ref]
        new google.maps.Marker({
          map: map,
          #icon: "<the icon url>",
          position: new google.maps.LatLng(-facility._coords[1], facility._coords[0]),
          title: "something"
        })
  )

$().ready ->
  #google.maps.event.addDomListener(window, 'load', initialize)
