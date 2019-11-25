import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const StyleTableCell = withStyles(theme => ({
    paddingCheckbox: {
        padding: 30,
    },
    head: {
        backgroundColor: "#4485f4",
        color: "#ffffff",
        textAlign: "left",
        "font-weight": "bold"
    },
    body: {
        "border-bottom": "1px solid #dddddd",
        fontSize: 14,
    }
}))(TableCell);


const StyleTableRow = withStyles(({
    root: {

        '&:nth-of-type(odd)': {
            backgroundColor: "#f3f3f3f1"
        },

    },
}))(TableRow);



class TabTable extends Component {
    constructor(props) {
        super(props);
        this.handleClosingTabs = this.handleClosingTabs.bind(this);
        this.addCloseTabsHandler = this.addCloseTabsHandler.bind(this);
        this.msToTimeHandler=this.msToTimeHandler.bind(this);
    }


    //  formatDate=(date)=> {

    //     var dd = date.getDate();
    //     var mm = date.getMonth() + 1;
    //     var yyyy = date.getFullYear();
    //     var hh = date.getHours();
    //     var ss = date.getSeconds();
    //     if (dd < 10) { dd = '0' + dd }
    //     if (mm < 10) { mm = '0' + mm }
    //     date = yyyy + mm + dd;
    //     time = hh + ":" + ss;
    //     return time
    //   }
      
      
      msToTimeHandler=(duration)=> {
        let milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds;
      }

    addCloseTabsHandler = (e,ID) => {
        let tabID='Tab'+ID
        if (this.props.ToClose.includes(tabID)){
            let elemntIndex = this.props.ToClose.indexOf(tabID);
            this.props.ToClose.splice(elemntIndex,1)}
        else{

            this.props.ToClose.push(tabID);
        }
    }
        

    handleClosingTabs = (e) => {
        this.props.closeTabs();

    }

    render() {

        const rows = [];

        this.props.chromeTabs.forEach((tab) => {
            let timeStampClick = new Date(tab.timeStampClick)
            let deltaTimeStampClick=this.props.currentTime.getTime() - timeStampClick.getTime()

            rows.push(
                <StyleTableRow key={tab.tabID}>
                    <StyleTableCell padding="checkbox" size="small" align="left" onChange={e => this.addCloseTabsHandler(e,tab.tabID)}>
                        <Checkbox />
                    </StyleTableCell>
                    <StyleTableCell size="small" component="th" scrope="row">
                        {tab.tabTitle}
                    </StyleTableCell>
                    <StyleTableCell size="small" align="center">{this.msToTimeHandler(deltaTimeStampClick)}</StyleTableCell>
                </StyleTableRow>
            )

        })
        return (
            <div >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyleTableCell padding="checkbox" />
                            <StyleTableCell align="center">Tab Name</StyleTableCell>
                            <StyleTableCell align="center" style={{width:"100px"}}>Last Time Used</StyleTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
                <div>
                    <Fab color="primary" aria-lable="close" size="small" disabled={false} onClick={e => this.handleClosingTabs(e)}>
                        <CloseIcon />
                    </Fab>
                </div>

            </div>
        );
    }
}
export default TabTable;