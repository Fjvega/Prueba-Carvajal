import React, { Component } from "react";
import '../CSS/addmovie.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { MenuItem } from "@material-ui/core";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class CreateMovie extends Component {
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
   this.addMovie= this.addMovie.bind(this)
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

    if(this.state.selectedCategory.includes(this.state.currentCategorySelected))
    {
        NotificationManager.info('Ésta categoría ya fue seleccionada');

    }else
    {
        let newAdd = this.state.selectedCategory
        newAdd.push(this.state.currentCategorySelected)
        this.setState({selectedCategory:newAdd},console.log(this.state))
    }
}



addMovie(){

    if(this.state.selectedCategory.length=== 0 || this.state.name ==='' || this.state.description ==='')
    {
        NotificationManager.info('Campos vacíos');
    }else
    {   
        let body=JSON.stringify({
            name: this.state.name,
            description: this.state.description,
            category: this.state.selectedCategory
          })
       
        var url = 'http://localhost:5000/movies/add';
        const that = this;
        
        fetch(url, {
          method: 'POST', 
          headers:{
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          body:body
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => 
          {
          console.log('Success:', response)
          if(response.state==="success")
          {
            NotificationManager.success('Se agregó una película con éxito');
            that.setState({name:'',description:'',selectedCategory:[ ],currentCategorySelected:''})
          }else{
            NotificationManager.error('Ésta película ya existe');
          }
          
          }
          );
    }
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
                         />

                         <TextField
                          className="description"
                          id="outlined-multiline-static"
                          label="Descripción"
                          multiline
                          rows="4"
                          defaultValue=" "
                          variant="outlined"
                          name="description"
                          value={this.state.description}
                          defaultValue=""
                          onChange={this.handleChange}
                        />
                        <div className="category_container">
                              <TextField
                              className="add_category"
                              id="standard-select-currency"
                              select
                              label="Categoría"
                              helperText="Seleccione una categoria correspondiente"
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
                            <Button className="add_category_button" variant="outlined" onClick={this.addCategory}>Agregar</Button>
                        </div>
                        
                        <Paper className="chips_container" elevation={0}>
                            {this.state.selectedCategory.map(data => {


                              return (
                                <Chip
                                  key={data}
                                  label={data}
                                  onDelete={()=>this.handleDeleteCategory(data)}
                                  color="primary"
                                  className="chip"
                                />
                              );
                            })}
                        </Paper>
                        
                        <Button className="add_movie" variant="contained" onClick={this.addMovie} >Agregar Película</Button>
                </div>
            </div>
 
    )
  }
}

export default CreateMovie;