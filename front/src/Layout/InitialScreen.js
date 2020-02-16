import React, { Component } from "react";
import '../CSS/layout.css'
import Navbar from "../Components/navbar";
import TabManager from "../Components/tabManager";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

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
                      <TabManager></TabManager>
                  </div>
              </div>
              <NotificationContainer/>
          </div>
    )
  }
}

export default InitialScreen;