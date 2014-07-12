$().ready ->

        searchAC = (q)->
                '/api/search_ac?q=' + q

        searchInput = $ '#searchInput'

        dataSource = (q, cb) ->
                $.get(searchAC(q)).done (data) ->
                        cb( _.map data, (i) ->
                                { value: i._term }
                        )
                return

        searchInput.typeahead {
                minLength: 3
                highlight: true
                },
                {
                source: dataSource
                name: "park-kw",
                }
