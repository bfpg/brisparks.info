(function() {
  $().ready(function() {
    var addFeature, connectFeatureLists, createItemList, dataSource, featureList, featureUri, insertItemList, linkDraggable, listItems, listWrapper, renderSuggestion, sButton, searchAC, searchInput, selectedFeatureList, selectedFeatures;
    listWrapper = function(list, id) {
      return _.template("<ul class='list-group feature-list' id='<%= idval %>'> <%= itemlist %> </ul>", {
        itemlist: list,
        idval: id
      });
    };
    listItems = function(items) {
      return _.template("<% _.forEach(xs, function(x) { %> <li class='list-group-item' value='<%- x %>'> <%- x %> </li> <% }); %>", {
        xs: items
      });
    };
    createItemList = function(items, id) {
      return listWrapper(listItems(items), id);
    };
    searchInput = function() {
      return $('#searchInput');
    };
    sButton = function() {
      return $('#searchButton');
    };
    sButton().hide();
    searchAC = function(q) {
      return "/api/search_ac?q=" + q;
    };
    featureUri = function(q) {
      return "/api/features?q=" + q;
    };
    insertItemList = function(id, list) {
      return $(id).html(createItemList(list, id));
    };
    linkDraggable = function(from, to) {
      return $(from).draggable({
        revert: "invalid",
        snap: to,
        cursor: "crosshair",
        cursorAt: {
          top: -5,
          left: -5
        },
        connectToSortable: to
      });
    };
    connectFeatureLists = function() {
      var all, sel;
      all = '.feature-list li.list-group-item';
      sel = '#sortable-features';
      $(sel).sortable({
        revert: true
      });
      linkDraggable(all, sel, true);
      return $('ul, li').disableSelection();
    };
    featureList = function(name) {
      $.get(featureUri(name)).done(function(data) {
        var xs, ys;
        console.log(data);
        xs = [];
        ys = [];
        _.map(data, function(v, i) {
          if (i % 2 === 0) {
            return xs.push(v);
          } else {
            return ys.push(v);
          }
        });
        insertItemList('#left-list-cont', xs);
        insertItemList('#right-list-cont', ys);
        connectFeatureLists();
        $('.feature-list li.list-group-item').on('click', addFeature);
      });
    };
    dataSource = function(q, cb) {
      $.get(searchAC(q)).done(function(data) {
        return cb(_.map(data, function(name) {
          return {
            value: name[1]
          };
        }));
      });
    };
    selectedFeatures = function() {
      return $('#sortable-features li.list-group-item');
    };
    selectedFeatureList = function() {
      return _.map(selectedFeatures(), function(i) {
        return i.getAttribute('value');
      });
    };
    addFeature = function(e) {
      var newItems;
      newItems = selectedFeatureList();
      newItems.push(e.currentTarget.getAttribute('value'));
      insertItemList('#sortable-features', newItems);
      e.currentTarget.remove();
      return e.preventDefault();
    };
    $(document).on("typeahead:selected", function(evt, sugg, dataSet) {
      featureList(sugg.value);
      sButton().show();
      return evt.preventDefault();
    });
    renderSuggestion = function(sugg) {
      return _.template("<p><%= sugg %></p>", {
        sugg: sugg.value
      });
    };
    searchInput().typeahead({
      minLength: 3,
      highlight: true
    }, {
      source: dataSource,
      name: "park-kw",
      templates: {
        suggestion: renderSuggestion
      }
    });
    return sButton().on('click', function(e) {
      var accFn, fs, txt;
      txt = searchInput().val();
      accFn = function(acc, f) {
        return "" + f + "," + acc;
      };
      fs = _.reduce(selectedFeatureList(), accFn, "");
      return $.post("/api/search\?q\=" + txt + "\&f\=" + fs);
    });
  });

}).call(this);

(function() {
  var facility_icons, facility_icons_map;

  if (window.brissyParks == null) {
    window.brissyParks = {};
  }

  facility_icons_map = {
    'PICNIC BENCH/TABLE': 'picnic',
    'TOILET': 'toilet',
    'BUBBLER/DRINKING FOUNTAIN': 'water',
    'TAP COMBINATION': 'water',
    'BBQ': 'bbq',
    'BASKETBALL/NETBALL FACILITY': 'sport',
    'FITNESS EXERCISE EQUIPMENT': 'fitness',
    'PLAY IMPLEMENT': 'playground'
  };

  facility_icons = {
    picnic: {
      url: '/icons/tourist_picnic.n.16.png',
      title: 'Picnic area'
    },
    toilet: {
      url: '/icons/amenity_toilets.n.16.png',
      title: 'Toilet'
    },
    water: {
      url: '/icons/food_drinkingtap.n.16.png',
      title: 'Drinking water'
    },
    bbq: {
      url: '/icons/food_restaurant.n.16.png',
      title: 'Barbeque'
    },
    sport: {
      url: '/icons/sport_soccer.n.16.png',
      title: 'Sport facility'
    },
    fitness: {
      url: '/icons/sport_gymnasium.n.16.png',
      title: 'Fitness equipment'
    },
    playground: {
      url: '/icons/sport_playground.n.16.png',
      title: 'Playground'
    },
    dog: {
      url: '/icons/dog.png',
      title: 'Dog off-leash area'
    }
  };

  brissyParks.initMap = function() {
    var mapOptions;
    mapOptions = {
      center: new google.maps.LatLng(-27.497, 153.044),
      zoom: 7
    };
    return new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  };

  brissyParks.displayPark = function(map, parkId) {
    return $.ajax({
      url: "/api/park/" + parkId
    }).done(function(data, textStatus, jqXHR) {
      var facility, icon, icon_ref, kmlLayer, _i, _len, _ref, _results;
      kmlLayer = new google.maps.KmlLayer({
        url: data.kmlHref,
        map: map
      });
      _ref = data.facilities;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        facility = _ref[_i];
        icon_ref = facility_icons_map[facility._itemType];
        if (icon = facility_icons[icon_ref]) {
          _results.push(new google.maps.Marker({
            map: map,
            icon: icon.url,
            position: new google.maps.LatLng(-facility._coords[1], facility._coords[0]),
            title: icon.title
          }));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
  };

}).call(this);
