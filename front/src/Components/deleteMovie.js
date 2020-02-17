import React, { Component } from "react";
import '../CSS/addmovie.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { IP } from "../Resources";

class DeleteMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category :[],
      selectedCategory:[],
      name:'',
      description:'',
      currentCategorySelected :''
    }

   this.deleteMovie= this.deleteMovie.bind(this)
  }













/*


Metodo: POST

Funcionamiento : Guarda en un JSON el nombre de la pelicula que se quiere eliminar
así : {name: String}, cuando el back responde de manera éxitosa se llama a la función
props.refresh() para recargar la lista 


*/

deleteMovie(){


        let body=JSON.stringify({
            name: this.props.name,
          })
       
        var url = IP+'/movies/delete';
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
            NotificationManager.success('Se eliminó una película con éxito');
            that.props.refresh()
            
           
          }else{
            NotificationManager.error('Error en el servidor');
          }
          
          }
          );
    
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
                         <h3>
                             ¿Esta seguro que desea eliminar esta película?
                         </h3>
                        <Button className="add_movie" variant="contained" onClick={this.deleteMovie}>Eliminar</Button>
                </div>
            </div>
 
    )
  }
}

export default DeleteMovie;