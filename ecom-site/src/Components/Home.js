import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="container">
      <div class="row">
        <div class="col-md-4">
          <div class="well">
            1
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6">
              <div class="well">2</div>
            </div>
            <div class="col-md-6">
              <div class="well">3</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="well">4</div>
            </div>
            <div class="col-md-6">
              <div class="well">5</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="well">6</div>
        </div>
        <div class="col-md-4">
          <div class="well">7</div>
        </div>
        <div class="col-md-4">
          <div class="well">8</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
