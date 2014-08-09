window.brissyParks ?= {}

facility_icons_map =
  'PICNIC BENCH/TABLE': 'picnic'
  'TOILET': 'toilet'
  'BUBBLER/DRINKING FOUNTAIN': 'water'
  'TAP COMBINATION': 'water'
  'BBQ': 'bbq'
  'BASKETBALL/NETBALL FACILITY': 'sport'
  'FITNESS EXERCISE EQUIPMENT': 'fitness'
  'PLAY IMPLEMENT': 'playground'

facility_icons =
  picnic: { url: '/icons/tourist_picnic.n.16.png', title: 'Picnic area' }
  toilet: { url: '/icons/amenity_toilets.n.16.png', title: 'Toilet' }
  water: { url: '/icons/food_drinkingtap.n.16.png', title: 'Drinking water' }
  bbq: { url: '/icons/food_restaurant.n.16.png', title: 'Barbeque' }
  sport: { url: '/icons/sport_soccer.n.16.png', title: 'Sport facility' }
  fitness: { url: '/icons/sport_gymnasium.n.16.png', title: 'Fitness equipment' }
  playground: { url: '/icons/sport_playground.n.16.png', title: 'Playground' }
  dog_off_leash_area: { url: '/icons/shopping_pet2.n.16.png', title: 'Dog off-leash area' }

brissyParks.readParkInfo = (p) ->
  number: $(p).data('number')
  lat: $(p).data('lat')
  long: $(p).data('long')

brissyParks.readResults = ->
  _.map($('.park-results-list .park-item'), brissyParks.readParkInfo)
  
  # (park)->
  #   {
  #     number: $(park).data('number'),
  #     lat: $(park).data('lat'),
  #     long: $(park).data('long')
  #   })

brissyParks.initMap = ->
  mapOptions = {
    center: new google.maps.LatLng(-27.497, 153.044),
    zoom: 7
  }
  new google.maps.Map(
    document.getElementById("map-canvas"),
    mapOptions
  )

brissyParks.displayPark = (map, parkObj) ->
  map.setCenter(new google.maps.LatLng(parkObj.lat, parkObj.long));
  map.setZoom(18);
  $.ajax({
    url: "/api/park/#{parkObj.number}"
  })
  .done((data, textStatus, jqXHR) ->
    # add kml to map
    kmlLayer = new google.maps.KmlLayer({ url: data.kmlHref, map: map })

    # add markers to map
    for facility in data.facilities
      icon_ref = facility_icons_map[facility._itemType]
      if icon = facility_icons[icon_ref]
        new google.maps.Marker
          map: map
          icon: icon.url
          position: new google.maps.LatLng(-facility._coords[1], facility._coords[0])
          title: icon.title
    for feature in data.features
      if icon = facility_icons[feature._featureId]
        new google.maps.Marker
          map: map
          icon: icon.url
          position: new google.maps.LatLng(
            -feature._featureCoords[1], feature._featureCoords[0])
          title: icon.title
  )


# Init the click handler for displaying different maps
$('.park-item').on('click', (e) ->
  brissyParks.displayPark(
    brissyParks.initMap(),
    brissyParks.readParkInfo(e.currentTarget))
)
