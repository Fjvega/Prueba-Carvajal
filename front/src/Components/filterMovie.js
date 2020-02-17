import React, { Component } from "react";
import '../CSS/addmovie.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { MenuItem } from "@material-ui/core";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { IP } from "../Resources";

class FilterMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category :[],
      selectedCategory:[],
      name:'',
      description:'',
      currentCategorySelected :''
    }

   
   this.handleChange = this.handleChange.bind(this)
   this.resetFilters = this.resetFilters.bind(this)
  }



componentDidMount(){
  console.log("llegue al did mount del create")
  var url = IP+'/movies/getGenres';
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





handleChange(event) {
    
  let nam = event.target.name;
  let val = event.target.value;


  this.setState({[nam]: val});
  console.log(this.state)
}


resetFilters()
{
    this.setState({name:'',currentCategorySelected:''},this.props.reset)
}



  render() {
      return(

            <div className="add_container">
                <div className="add_card">
                         <TextField 
                         id="standard-basic" 
                         label="Nombre de la película" 
                         name="name"
                         value={this.state.name}
                         onChange={this.handleChange}
                         primary
                         />

                        <div className="category_container">
                              <TextField
                              id="standard-select-currency"
                              select
                              label="Categoría"
                              helperText="Seleccione una categoria correspondiente"
                              className="add_category_filter"
                              name="currentCategorySelected"
                              onChange={this.handleChange}
                              value={this.state.currentCategorySelected || " "}
                              onChange={this.handleChange}
                              
                              >
                                        {this.state.category.map(value => (
                                          <MenuItem key={value} value={value}>
                                            {value}
                                          </MenuItem>
                                        ))}
                            </TextField>
                        </div>
                        
                      
                        <Button className="add_movie" variant="contained" onClick={()=>this.props.filter(this.state.name,this.state.currentCategorySelected)} >Aplicar Filtro</Button>
                        <Button className="reset_filter" variant="contained" onClick={this.resetFilters} >Limpiar Filtro</Button>
                </div>
            </div>
 
    )
  }
}

export default FilterMovie;