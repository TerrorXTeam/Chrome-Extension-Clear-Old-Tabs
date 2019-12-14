import React, { Component } from "react";
import styles from "./App.css";
import TabTable from "./components/TabTable/TabTable";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ChromeTabsData: null,
      tabsToClose: [],
      value:0
    };
    this.closeTabsHandler = this.closeTabsHandler.bind(this);
    this.fetchStorageDataHandler = this.fetchStorageDataHandler.bind(this);
    this.chromeCloseTabsHandler = this.chromeCloseTabsHandler.bind(this);
    this.sortObjects = this.sortObjects.bind(this);
  }

  //Sorts objects in an array
  sortObjects = (a, b) => {
    console.log(a)
    console.log(b)
    const aClicked = new Date(a.timeStampClick);
    const bClicked = new Date(b.timeStampClick);

    let comparison = 0;
    if (aClicked > bClicked) {
      comparison = 1;
    }
    else if (aClicked < bClicked) {
      comparison = -1;
    }
    return comparison;
  };

  //Get tabs stats from local storage and refresh the state
  fetchStorageDataHandler = () => {
    window.chrome.storage.local.get(
      null,
      function (data) {
        console.log(Object.values(data))
        const sortedTabsData = Object.values(data).sort(this.sortObjects)
        this.setState({
          ChromeTabsData: sortedTabsData//Object.values(data)
        })
      }.bind(this)
    );
  }
  //Close the selected chrome tabs 
  chromeCloseTabsHandler = (tabs) => {
    let chromeCloseList = [];
    tabs.forEach((tab) => {
      let tabID = Number(tab.substr(3))
      chromeCloseList.push(tabID);
    })
    window.chrome.tabs.remove(chromeCloseList)
    this.setState({
      tabsToClose: []
    })
  }


  componentDidMount() {
    this.fetchStorageDataHandler();
  }

  //Update state and remove closed tabs from local storage
  closeTabsHandler() {
    window.chrome.storage.local.remove(this.state.tabsToClose, function () {
      this.fetchStorageDataHandler();
      this.chromeCloseTabsHandler(this.state.tabsToClose);
    }.bind(this))
  }

  render() {
    return (
      this.state.ChromeTabsData && (
        <div className={styles.App}>
          <TabTable
            chromeTabs={this.state.ChromeTabsData}
            closeTabs={this.closeTabsHandler}
            ToClose={this.state.tabsToClose}
            currentTime={new Date()} />

          <BottomNavigation
            value={this.state.value}
            onChange={(event, newValue) => {
              this.setState({value : newValue});
            }}
            showLabels
          // className={classes.root}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>


        </div>
      )
    );
  }
}
export default App;
