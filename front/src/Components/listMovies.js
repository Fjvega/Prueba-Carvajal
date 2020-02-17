import React, { Component } from "react";
import '../CSS/listMovies.css'
import 'react-notifications/lib/notifications.css';
import Pagination from '@material-ui/lab/Pagination';
import Chip from '@material-ui/core/Chip';

class ListMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list:[],
      pages:0
    }

    this.createList = this.createList.bind(this)

  }

  createList(currentPageIndex)
  {
    if(this.props.list.length >0)
    {
      let initial= (currentPageIndex-1)*4
      let final = currentPageIndex*4
  
      var temporal = new Array(4)
      for (let index = initial; index < final; index++) {
        if(this.props.list[index]!== undefined )
        {
          temporal.push(this.props.list[index])
        }
       
        
      }

      const that=this;
      let list=temporal.map(function(object){
      return(
        <li>
                              <div className="icon_column">
                              <h2>{object.name}</h2>
                                    <img src="/cinema.svg"/>
                              </div>
                              <div className="paragraph_column">
                                  <p>
                                 {object.description}
                                  </p>
                                  
                                  {object.category.map(data => {
                                    return (
                                      <Chip
                                        key={data+1}
                                        label={data}
                                        color="primary"
                                        className="chip_list"
                                      />
                                    );
                                    })}
                              </div>
                              <div className="icon_column_actions">
                                  <img src="/edit.svg" onClick={()=> that.props.changeIndex(2)}/>
                                  <img src="/delete.svg" onClick={()=> that.props.changeIndex(3)}/>
                              </div>
        </li>
      )
      })
      
      return(
      <ul>
          {list}
      </ul>)

    }

  }





  componentDidMount(){

  
  }

  render() {
      return(
            <div className="element_list_container">
                <div className="card_list_container" >
                    {this.createList(this.props.currentPageIndex)}
                </div>
                <Pagination count={this.props.pages} page={this.props.currentPageIndex} onChange={this.props.changePage}  />
            </div>
           
    )
  }
}

export default ListMovies;