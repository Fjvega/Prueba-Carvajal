import React, { Component } from "react";
import '../CSS/navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

   
  }







  render() {
      return(
          <div className="navbar_container">
             <div className="title_container">
                 <h3>
                     Catálogo de películas
                 </h3>
             </div>
             <div className="icon_container">
                    <img src="/github.svg"/>
                    <img src="/linkedin.svg"/>
             </div>
          </div>
    )
  }
}

export default Navbar;