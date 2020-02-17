import React, { Component } from "react";
import '../CSS/layout.css'
import Navbar from "../Components/navbar";
import TabManager from "../Components/tabManager";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ListMovies from "../Components/listMovies";

class InitialScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index:0,
      currentPageIndex:1,
      pages:0,
      list:[]
    
    }

   this.changeIndex= this.changeIndex.bind(this)
   this.refreshList= this.refreshList.bind(this)
   this.changePage= this.changePage.bind(this)
  }


  changeIndex(data)
  {
    this.setState({index:data})
  }
  handleChange(event) {
    
    let nam = event.target.name;
    let val = event.target.value;


    this.setState({[nam]: val});
    console.log(this.state)
  }


  refreshList()
  {
    console.log("llegue al refresh")
    var url = 'http://localhost:5000/movies/getMovies/none/none';
    const that = this;
    
    fetch(url, {
      method: 'GET', // or 'PUT'
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => 
      {
        console.log('Success:', response)
        let pages= Math.ceil(response.movies.length/4)
        that.setState({list: response.movies,pages:pages})
      }
      );
  
  }

  changePage(event,value)
  {
    console.log(value)
    this.setState({currentPageIndex:value})
  
  }

  componentDidMount()
  {
    var url = 'http://localhost:5000/movies/getMovies/none/none';
    const that = this;
    
    fetch(url, {
      method: 'GET', // or 'PUT'
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => 
      {
      console.log('Success:', response)
      let pages= Math.ceil(response.movies.length/4)
      that.setState({list: response.movies,pages:pages})
      }
      );
  }

  render() {
      return(
          <div className="app_container">
              <Navbar></Navbar>
              <div className="view_container">
                  <div className="list_container">
                    <ListMovies changeIndex={this.changeIndex}  
                    pages={this.state.pages} 
                    currentPageIndex={this.state.currentPageIndex} 
                    changePage={this.changePage} 
                    list={this.state.list}/>
                  </div>
                  <div className="option_container">
                      <TabManager index={this.state.index} changeIndex={this.changeIndex} refresh={this.refreshList} ></TabManager>
                  </div>
              </div>
              <NotificationContainer/>
          </div>
    )
  }
}

export default InitialScreen;