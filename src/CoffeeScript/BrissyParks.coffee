$().ready ->

        # Creates the wrapper for the UL element for the feature list.
        listWrapper = _.template(
                "<ul class='list-group'>
                        <%= itemlist %>
                </ul>")

        # Creates the collection of LI elements for the feature lists.
        listItems = _.template(
                "<% _.forEach(xs, function(x) { %>
                        <li class='list-group-item'>
                                <%- x %>
                        </li>
                <% }); %>")

        createItemList = (items) ->
                listWrapper.compile {
                        itemlist : listItems.compile {
                                xs: items
                                }
                        }

        # Locate the search input field on the page.
        searchInput = $ '#searchInput'
        # Locate the search button on the page.
        sButton = $ '#searchButton'
        
        # Hide the button if it's there until the person has selected something.
        sButton.hide()

        # Create the URL for accessing the URL.
        searchAC = (q)->
                '/api/search_ac?q=' + q

        featureUri = (q) ->
                '/api/features?q=' + q

        # Retrieve the feature list for a park
        # featureList = (name) ->
        #         $.get(featureUri name).done (data) ->
                        

        # This is the data collector for the typeahead.js for the search box.
        dataSource = (q, cb) ->
                $.get(searchAC(q)).done (data) ->
                        cb( _.map data, (i) ->
                                { value: i._term }
                        )
                return

        # This event is trigged when an element from the typeahead is selected.
        $(document).on "typeahead:selected", (evt, sugg, dataSet) ->
                sButton.show()
                evt.preventDefault()

        # This sets our search input field as a typeahead
        searchInput.typeahead {
                minLength: 3
                highlight: true },
                {
                source: dataSource
                name: "park-kw" }
