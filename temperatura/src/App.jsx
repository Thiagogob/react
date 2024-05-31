import React, { Component } from "react";
import "./App.css";

import FahrenheitCard from "./assets/FahrenheitCard";
import CelsiusCard from "./assets/CelsiusCard";

class App extends Component {
  state = {
    fahrenheit: 0,
    celsius: 0
  };

  

  getNewTempValue = (newCelsius, newFahrenheit) => {
    this.setState({
      fahrenheit: newFahrenheit,
      celsius: newCelsius
    });
  };



  render() {
    return (
      <div className="App">
        {/* <TEMP_FORM getValue={this.getValue} />
        <Convertion_CtoF temperature={this.state.temp} /> */}
        <CelsiusCard
          celsius={this.state.celsius}
          getNewTempValue={this.getNewTempValue}
        />
        <FahrenheitCard
          fahrenheit={this.state.fahrenheit}
          getNewTempValue={this.getNewTempValue}
        />
      </div>
    );
  }
}

export default App;