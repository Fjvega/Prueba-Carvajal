import React, { Component } from "react";
import '../CSS/layout.css'
import Navbar from "../Components/navbar";
import TabManager from "../Components/tabManager";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ListMovies from "../Components/listMovies";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { IP } from "../Resources";




class InitialScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index:0,
      currentPageIndex:1,
      pages:0,
      list:[],
      currentSelectedMovieName: null,
      currentSelectedMovieDescription: null,
      currentSelectedMovieCategory :null,
      newCategory : null,
      loader:false
    }

   this.changeIndex= this.changeIndex.bind(this)
   this.refreshList= this.refreshList.bind(this)
   this.changePage= this.changePage.bind(this)
   this.handleChange= this.handleChange.bind(this)
   this.handleDeleteCategory= this.handleDeleteCategory.bind(this)
   this.addCategory= this.addCategory.bind(this)
   this.filterList = this.filterList.bind(this)
  }

  
 theme = createMuiTheme({
  palette: {
    primary: grey,
  }
});
  /*Cambia la pestaña donde estan las opciones de CRUD */
  changeIndex(data,currentSelectedMovie)
  {
    if(currentSelectedMovie==='')
    {
      this.setState({index:data})
    }else
      {
          let temporal = new Array(currentSelectedMovie.category.length)
          temporal = currentSelectedMovie.category.map(function(item){
            return(item)
          })
        this.setState({index:data,
          currentSelectedMovieDescription:currentSelectedMovie.description,
          currentSelectedMovieName:currentSelectedMovie.name,
          currentSelectedMovieCategory:temporal
        })

    }
  }




  refreshList()
  {
    console.log("llegue al refresh")
    var url = IP+'/movies/getMovies/none/none';
    const that = this;
    this.setState({loader:true})
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
        that.setState({list: response.movies,pages:pages,index:0},that.setState({loader:false,currentPageIndex:1}))
      }
      );
  
  }

  /*Cambia la paginacion de la lista */
  changePage(event,value)
  {
    console.log(value)
    this.setState({currentPageIndex:value})
  
  }



  /* Inicio Metodos que manejan la edicion de la pelicula */
  
  
  handleChange(event) {
    
    let nam = event.target.name;
    let val = event.target.value;
  
  
    this.setState({[nam]: val});
    console.log(this.state)
  }

  handleDeleteCategory(data){

    let newCategory =this.state.currentSelectedMovieCategory.filter(function (category) {
      return category !== data;
  });
  
  this.setState({currentSelectedMovieCategory:newCategory})
  
  }

  addCategory(){
      console.log(this.state.newCategory)
    if(this.state.newCategory !== null)
    {
        if(this.state.currentSelectedMovieCategory.includes(this.state.newCategory))
        {
            NotificationManager.info('Ésta categoría ya fue seleccionada');
    
        }else
        {
            let newAdd = this.state.currentSelectedMovieCategory
            newAdd.push(this.state.newCategory)
            this.setState({selectedCategory:newAdd},console.log(this.state))
        }

    }

}


/* Fin Metodos que manejan la edicion de la pelicula */



/*
Metodo: GET

Funcionamiento : Envia una peticion con los parametros por url de 
/name/category, para realizar un filtro, se puede filtrar tanto solo
por nombre o categoría , 


*/
filterList(name,category)
{
  console.log(name+'/'+category)
  console.log("llegue al Filter")
  if(category==="" && name  ==='')
  {
      NotificationManager.info('Campos vacíos');
  }else
  {   

    if(category==="" || null)
    {
      var url = IP+'/movies/getMovies/'+name+'/none';
     
    }else
    {
      if(name==='')
      {
        var url = IP+'/movies/getMovies/none/'+category;
      }else
      {
        var url = IP+'/movies/getMovies/'+name+'/'+category;
      }
    }

    this.setState({loader:true})
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
        that.setState({list: response.movies,pages:pages,index:0},that.setState({loader:false,currentPageIndex:1}))
      }
      );
  }


}



/*
Metodo: GET

Funcionamiento : Envia una peticion con los parametros por url de 
/none/none, siendo el primer parametro el nombre , el segundo la categoría
/none/none es por default cargar todas las películas


*/

  componentDidMount()
  {
    var url = IP+'/movies/getMovies/none/none';
    const that = this;
    this.setState({loader:true})
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
      that.setState({list: response.movies,pages:pages},that.setState({loader:false}))
      }
      );
  }

  render() {
      return(
          <div className="app_container">
              <ThemeProvider theme={this.theme}>       
              <Navbar></Navbar>
              <div className="view_container">
                  <div className="list_container">
                    <ListMovies 
                    changeIndex={this.changeIndex}  
                    pages={this.state.pages} 
                    currentPageIndex={this.state.currentPageIndex} 
                    changePage={this.changePage} 
                    list={this.state.list}
                    loader ={this.state.loader}
                    />
                    
                  </div>
                  <div className="option_container">
                      <TabManager 
                      index={this.state.index} 
                      changeIndex={this.changeIndex} 
                      refresh={this.refreshList} 
                      name={this.state.currentSelectedMovieName}
                      description={this.state.currentSelectedMovieDescription}
                      category={this.state.currentSelectedMovieCategory}
                      newCategory={this.state.newCategory}
                      handleChange= {this.handleChange}
                      deleteCategory={this.handleDeleteCategory}
                      addCategory={this.addCategory}
                      filter={this.filterList}
                    
                      >
                     
                      </TabManager>
                  </div>
              </div>
              </ThemeProvider>
              <NotificationContainer/>
          </div>
    )
  }
}

export default InitialScreen;