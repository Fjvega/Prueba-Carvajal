import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../CSS/tabs.css'
import CreateMovie from "./createMovie";
import 'react-notifications/lib/notifications.css';
class TabManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category :[],
      selectedCategory:[],
      name:'',
      description:'',
      currentCategorySelected :''
    }

   this.handleDeleteCategory = this.handleDeleteCategory.bind(this)
   this.handleChange = this.handleChange.bind(this)
   this.addCategory = this.addCategory.bind(this)
  }



componentDidMount(){

  var url = 'http://localhost:5000/movies/getGenres';
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
    that.setState({category: response.genres})
    }
    );

}



handleDeleteCategory(data){

  let newCategory =this.state.selectedCategory.filter(function (category) {
    return category !== data;
});

this.setState({selectedCategory:newCategory})

}


handleChange(event) {
    
  let nam = event.target.name;
  let val = event.target.value;


  this.setState({[nam]: val});
  console.log(this.state)
}


addCategory(){
  let newAdd = this.state.selectedCategory
  newAdd.push(this.state.currentCategorySelected)
  this.setState({selectedCategory:newAdd},console.log(this.state))
}
  render() {
      return(
        <Tabs>
        <TabList>
          <Tab>Agregar película</Tab>
          <Tab disabled={true}>Eliminar Película</Tab>
        </TabList>
     
        <TabPanel>
            <CreateMovie/>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    )
  }
}

export default TabManager;