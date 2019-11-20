import React, { Component } from "react";
import styles from "./App.css";
import TabTable from "./components/TabTable/TabTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ChromeTabsData: null };
    this.closeTabsHandler=this.closeTabsHandler.bind(this);
  }

  componentDidMount() {
    window.chrome.storage.local.get(
      null,
      function(data) {
        this.setState({
          ChromeTabsData: Object.values(data)
        });
      }.bind(this)
    );
  }


  closeTabsHandler (tabsToClose) {
    console.log(tabsToClose)
  }

  render() {
    return (
      this.state.ChromeTabsData && (
        <div className={styles.App}>
          <TabTable chromeTabs={this.state.ChromeTabsData} closeTabs={this.closeTabsHandler} />
        </div>
      )
    );
  }
}
export default App;
