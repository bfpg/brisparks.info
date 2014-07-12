$().ready ->

        homeUri = 'https://0.0.0.0:8000'
        
        searchValue = () ->
                $(searchInput).val()
        
        submitSearch = () ->
                $.get homeUri
                
        searchButton = $ '#searchButton'
        searchInput = $ '#searchInput'

        searchButton.on "click", (e) ->
                console.log 
                e.preventDefault()
                return

