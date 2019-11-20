import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const ChromeTabsData = [{tabID: 73, tabName: "Your environments", lastTimeClicked: "2019-11-09T12:42:52.627Z"},
                      {tabID: 74, tabName: "React Training", lastTimeClicked: "2019-11-09T12:10:52.627Z"},
                      {tabID: 76, tabName: "Props vs State", lastTimeClicked: "2019-11-09T10:42:52.627Z"},
                      {tabID: 77, tabName: "Ideatester.nlsss", lastTimeClicked: "2019-10-09T9:42:52.627Z"},
                      {tabID: 78, tabName: "CheckerTester", lastTimeClicked: "2019-10-09T16:25:52.627Z"}
]

ReactDOM.render(<App chromeTabs={ChromeTabsData}  />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
