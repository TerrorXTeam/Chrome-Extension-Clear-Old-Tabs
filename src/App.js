import React, { Component } from "react";
import styles from "./App.css";
import TabTable from "./components/TabTable/TabTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ChromeTabsData: null,
      tabsToClose: []
    };
    this.closeTabsHandler = this.closeTabsHandler.bind(this);
    this.fetchStorageDataHandler = this.fetchStorageDataHandler.bind(this);
    this.chromeCloseTabsHandler = this.chromeCloseTabsHandler.bind(this);
  }

//Get tabs stats from local storage and refresh the state
  fetchStorageDataHandler = () => {
    window.chrome.storage.local.get(
      null,
      function (data) {
        this.setState({
          ChromeTabsData: Object.values(data)
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
      tabsToClose:[]
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
          <TabTable chromeTabs={this.state.ChromeTabsData} closeTabs={this.closeTabsHandler} ToClose={this.state.tabsToClose} />
        </div>
      )
    );
  }
}
export default App;
