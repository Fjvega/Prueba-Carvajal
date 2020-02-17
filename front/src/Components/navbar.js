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
               <a href="https://github.com/Fjvega" target="_blank">
                   <img src="/github.svg"/>
               </a>
               <a href="https://www.linkedin.com/in/francisco-vega-796004ba/" target="_blank">
                    <img src="/linkedin.svg"/>
               </a>
             </div>
          </div>
    )
  }
}

export default Navbar;