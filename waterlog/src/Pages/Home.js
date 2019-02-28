import React, { Component } from "react";
import Wastage from "./../Components/Wastage";
import MapComponent from "./../Components/Map";
import TankLevels from "./../Components/TankLevels";

class HomeComponent extends Component {
  render() {
    return (
      <div>
        <p className="home-text">Alerts Map</p>
        <MapComponent />
        <Wastage />
        <TankLevels />
      </div>
    );
  }
}
export default HomeComponent;
