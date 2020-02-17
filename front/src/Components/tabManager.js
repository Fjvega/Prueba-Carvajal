import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../CSS/tabs.css'
import CreateMovie from "./createMovie";
import 'react-notifications/lib/notifications.css';
import EditMovie from "./editMovie";
import DeleteMovie from "./deleteMovie";
import FilterMovie from "./filterMovie";

class TabManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }


  }



  render() {
      return(
        <Tabs selectedIndex={this.props.index}>
        <TabList>
          <Tab onClick={()=>this.props.changeIndex(0,'')}>Búsqueda</Tab>
          <Tab onClick={()=>this.props.changeIndex(1,'')}>Agregar película</Tab>
          <Tab  disabled={true}>Editar película</Tab>
          <Tab disabled={true}>Eliminar Película</Tab>
        </TabList>
        <TabPanel>
           <FilterMovie
              filter={this.props.filter} 
              reset={this.props.refresh}
           
           ></FilterMovie>
        </TabPanel>
        <TabPanel >
            <CreateMovie refresh={this.props.refresh} changePage={this.props.changePage}/>
        </TabPanel>
        <TabPanel>
            <EditMovie 
            name={this.props.name} 
            description={this.props.description}
            category ={this.props.category}
            newCategory={this.props.newCategory}
            handleChange={this.props.handleChange}
            delete={this.props.deleteCategory}
            add = {this.props.addCategory}
            refresh={this.props.refresh}
            >

            </EditMovie>
        </TabPanel>
        <TabPanel>
            <DeleteMovie
            name={this.props.name}
            refresh={this.props.refresh} 
            >

            </DeleteMovie>
        </TabPanel>
      </Tabs>
    )
  }
}

export default TabManager;