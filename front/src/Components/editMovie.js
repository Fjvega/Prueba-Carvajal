import React, { Component } from "react";
import '../CSS/addmovie.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { MenuItem } from "@material-ui/core";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { IP } from "../Resources";

class EditMovie extends Component {
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
   this.updateMovie= this.updateMovie.bind(this)
  }


/*


Metodo: GET

Funcionamiento : Pide la lista de géneros al back
el cual tiene un archivo precargado con varios géneros


*/
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










/*


Metodo: POST

Funcionamiento : Verifica que los campos no esten vacios
si los campos si contienen información envia una una petición
al server, al recibir una respuesta exitosa usa props.refresh()
para así recargar la lista de películas


*/
updateMovie(){

    if(this.props.category.length=== 0  || this.props.description ==='')
    {
        NotificationManager.info('Campos vacíos');
    }else
    {   
        let body=JSON.stringify({
            name: this.props.name,
            description: this.props.description,
            category: this.props.category
          })
       
        var url = IP+'/movies/updateMovie';
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
            NotificationManager.success('Se editó una película con éxito');
            that.props.refresh()
            
           
          }else{
            NotificationManager.error('Error en el servidor');
          }
          
          }
          );
    }
}



/*

Funcionamiento : Hace uso del nombre del elemento del form
para asi cambiar su contraparte en el state
*/
handleChange(event) {
    
    let nam = event.target.name;
    let val = event.target.value;
  
  
    this.setState({[nam]: val});
    console.log(this.state)
  }



render() {
      return(

            <div className="add_container">
                <div className="add_card">
                         <TextField 
                         id="standard-basic" 
                         label="Nombre de la película" 
                         name="name"
                         value={this.props.name}
                         disabled
                         />

                         <TextField
                          className="description"
                          id="outlined-multiline-static"
                          label="Descripción"
                          multiline
                          rows="4"
                          defaultValue=" "
                          variant="outlined"
                          name="currentSelectedMovieDescription"
                          value={this.props.description }
                          defaultValue=""
                          onChange={this.props.handleChange}
                        />
                        <div className="category_container">
                              <TextField
                              className="add_category"
                              id="standard-select-currency"
                              select
                              label="Categoría"
                              helperText="Seleccione una categoria correspondiente"
                              name="newCategory"
                              onChange={this.props.handleChange}
                              value={this.props.newCategory || ""}
                              >
                                        {this.state.category.map(value => (
                                          <MenuItem key={value} value={value}>
                                            {value}
                                          </MenuItem>
                                        ))}
                            </TextField>
                            <Button className="add_category_button" variant="outlined" onClick={this.props.add} >Agregar</Button>
                        </div>
                        
                        <Paper className="chips_container" elevation={0}>
                            {this.props.category.map(data => {


                              return (
                                <Chip
                                  key={data}
                                  label={data}
                                  onDelete={()=>this.props.delete(data)}
                                  color="primary"
                                  className="chip"
                                />
                              );
                            })}
                        </Paper>
                        
                        <Button className="add_movie" variant="contained" onClick={this.updateMovie} >Guardar Cambios</Button>
                </div>
            </div>
 
    )
  }
}

export default EditMovie;