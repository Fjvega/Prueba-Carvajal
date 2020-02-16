import React, { Component } from "react";
import '../CSS/layout.css'
import Navbar from "../Components/navbar";

class InitialScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

   
  }



  handleChange(event) {
    
    let nam = event.target.name;
    let val = event.target.value;


    this.setState({[nam]: val});
    console.log(this.state)
  }



  render() {
      return(
          <div className="app_container">
              <Navbar></Navbar>
              <div className="view_container">
                  <div className="list_container">

                  </div>
                  <div className="option_container">
                      
                  </div>
              </div>
          </div>
    )
  }
}

export default InitialScreen;