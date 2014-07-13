<div class="container">
  <div class="row">
    <div class="col-md-12 column">
      <h1 class="text-center">Fun Finder</h1>
    </div>
  </div>
  
  <div class="col-md-4 column">
    <div class="container">
      <div class="row">
        <div class="col-md-4 column">
          <h2>Park Features</h2>
          Click or drag these features to the search area.
          <div class="container">
            <div class="row">
              <div class="col-md-4 column">
                <div id="left-list-cont"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 column">
    <div class="container">
      <div class="row">
        <div class="col-md-4 column">
          <h2>Where ?</h2>

           <!-- Basic Text Area Search Form -->
          <form method="get" action="/search" class="form-vertical">
            <div class="form-group">
	      <input name="searchtext" type="text" class="form-control input-lg" id="searchInput">
            </div>
            <div class="form-group">
	      <button class="btn-default btn-lg" type="submit" id="searchButton" value="search">
                Let's Find Some Fun!
              </button>
            </div>
            
            <input id="feature-form-list" name="features" value="" style="display:none;">

            <div class="container">
              <div class="row">
                <div class="col-md-4 column">
                  <div class="selected-fields">

                    <ul class="list-group" id="sortable-features" name="features">
                    </ul>

                  </div>
                </div>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-md-4 column">
    <div class="container">
      <div class="row">
        <div class="col-md-4 column">
          <h2>Other Things</h2>
          When do you want to visit the park?
          <div class="container">
            <div class="row">
              <div class="col-md-4 column">
                <div id="right-list-cont"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
