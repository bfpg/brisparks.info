<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h1 class="text-center">Brisbane Park Finder</h1>
    </div>
  </div>

  <div class="col-md-4">
    <h2>Park Features</h2>
    Click or drag the features that appear here to the search area.
    <div id="left-list-cont"></div>

  </div>

  <div class="col-md-4">
    <div class="text-center">
      <h2>Search !</h2>
      <p class="lead">Start by typing a suburb.</p>
      <br>
      <p>Select from the list of features that are returned to narrow your search.</p>

    </div>
    <!-- Basic Text Area Search Form -->
    <form class="form-inline" method="get" action="/search" role="form">

      <div class="form-group">
        <input name="searchtext" type="text" class="form-control input-lg" id="searchInput">
      </div>

      <div class="form-group">
        <button class="btn btn-default btn-lg" type="submit" id="searchButton" value="search">Find My Park</button>
      </div>

      <input id="feature-form-list" name="features" value="" style="display:none;">

      <div class="selected-fields well">
        <ul class="list-group" id="sortable-features" name="features"> </ul>
      </div>
    </form>
  </div>

  <div class="col-md-4">
    <h2>Park Features</h2>
    Click or drag the features that appear here to the search area.
    <div id="right-list-cont"></div>
  </div>
</div>
