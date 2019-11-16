import React, { Component } from 'react';
import styles from './App.css'
import TabTable from './components/TabTable/TabTable' 

class App extends Component  {
  render () {
  return (
    <div className={styles.App}>
      <TabTable chromeTabs= {this.props.chromeTabs} />
    </div>
  );
}
}
export default App;
