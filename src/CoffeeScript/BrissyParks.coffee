$().ready ->

        # Creates the wrapper for the UL element for the feature list.
        listWrapper = (list, id) ->
                _.template(
                        "<ul class='list-group feature-list' id='<%= idval %>'>
                                <%= itemlist %>
                        </ul>",
                        { itemlist: list, idval : id })

        # Creates the collection of LI elements for the feature lists.
        listItems = (items) ->
                _.template(
                        "<% _.forEach(xs, function(x) { %>
                                <li class='list-group-item' value='<%- x %>'>
                                        <%- x %>
                                </li>
                        <% }); %>",
                        { xs: items })

        createItemList = (items, id) ->
                listWrapper listItems(items), id

        # Locate the search input field on the page.
        searchInput = -> $ '#searchInput'
        # Locate the search button on the page.
        sButton = -> $ '#searchButton'
        # Hide the button if it's there until the person has selected something.
        sButton().hide()

        # Create the URL for accessing a URL.
        searchAC = (q)-> "/api/search_ac?q=#{q}"
        # Features list
        featureUri = (q) -> "/api/features?q=#{q}"

        # Take a target id and a given list of elements and create a ul with that id
        # and populate it with lis from the list.
        insertItemList = (id, list, justInsert) ->
          if justInsert
          then $('#' + id).html list
          else $('#' + id).html createItemList(list, id)


        # This will set the first selector list of li to be a draggable list
        # that is connected to a sortable list.
        linkDraggable = (from, to) ->
                $(from).draggable({
                        revert: "invalid",
                        snap: to,
                        cursor: "crosshair", cursorAt: { top: -5, left: -5 },
                        connectToSortable: to })

        extendList = (evt, ui) ->
                item = $(ui.item).text().trim()
                cur = $('#feature-form-list').attr('value')
                $('#feature-form-list').attr('value', "#{cur},#{item}")

        # Connect our feature list with the selected feature list.
        connectFeatureLists = () ->
                all = '.feature-list li.list-group-item'
                sel = '#sortable-features'

                $(sel).sortable({ revert: true, receive: extendList, placeholder: "ui-state-highlight" }).disableSelection()
                linkDraggable all, sel, true

                $('ul, li').disableSelection()

        # Retrieve the feature list for a park
        featureList = (name) ->
                $.get(featureUri name).done (data) ->
                        xs = []
                        ys = []
                        _.map data, (v, i) ->
                                if i % 2 == 0 then xs.push v else ys.push v
                        # Add the features to the display.
                        insertItemList 'left-list-cont', xs
                        insertItemList 'right-list-cont', ys
                        connectFeatureLists()
                        # Add the handler to the features.
                        $('.feature-list li.list-group-item').on 'click', addFeature
                        return
                return

        # This is the data collector for the typeahead.js for the search box.
        dataSource = (q, cb) ->
                $.get(searchAC(q)).done (data) ->
                        cb( _.map data, (name) ->
                                # This smells and is horrible. :( Magic Beans.
                                { value: name[1] })
                return

        # Returns the selected feature list top element.
        selectedFeatures = () -> $('#sortable-features li.list-group-item')
        # Returns the array of currently selected feature values.
        selectedFeatureList = () ->
                _.map(selectedFeatures(), (i) -> i.getAttribute('value'))

        addFeature = (e) ->
                newItems = selectedFeatureList()
                newItems.push(e.currentTarget.getAttribute('value'))
                insertItemList 'sortable-features', listItems(newItems), true

                storedList = _.reduce(newItems, (acc, i) -> "#{i},#{acc}")
                $('#feature-form-list').attr('value', storedList)
                
                e.currentTarget.remove()
                e.preventDefault()

        # This event is trigged when an element from the typeahead is selected.
        $(document).on "typeahead:selected", (evt, sugg, dataSet) ->
                featureList sugg.value
                sButton().show()
                evt.preventDefault()

        renderSuggestion = (sugg) ->
                _.template(
                        "<p class='list-group-item'><%= sugg %></p>",
                { sugg: sugg.value })

        # This sets our search input field as a typeahead
        searchInput().typeahead {
                minLength: 3
                highlight: true },
                {
                source: dataSource
                name: "park-kw"
                templates: {
                        suggestion: renderSuggestion
                        }
                }

        # Add handle full form submission.
        sButton().on 'click', (e) ->
                txt = searchInput().val()
                accFn = (acc, f) -> "#{f},#{acc}"
                fs = _.reduce(selectedFeatureList(), accFn, "")
                $.post("/api/search\?q\=#{txt}\&f\=#{fs}")
