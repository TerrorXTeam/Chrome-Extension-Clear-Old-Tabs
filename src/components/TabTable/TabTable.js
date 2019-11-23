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
        backgroundColor: "#009879",
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

let tabsToClose = []

class TabTable extends Component {
    constructor(props) {
        super(props);
        this.handleClosingTabs = this.handleClosingTabs.bind(this);
        this.addCloseTabsHandler = this.addCloseTabsHandler.bind(this);
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
            rows.push(
                <StyleTableRow key={tab.tabID}>
                    <StyleTableCell padding="checkbox" size="small" align="left" onChange={e => this.addCloseTabsHandler(e,tab.tabID)}>
                        <Checkbox />
                    </StyleTableCell>
                    <StyleTableCell size="small" component="th" scrope="row">
                        {tab.tabTitle}
                    </StyleTableCell>
                    <StyleTableCell size="small" align="left">{tab.timeStampClick}</StyleTableCell>
                </StyleTableRow>
            )

        })
        return (
            <div >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyleTableCell padding="checkbox" />
                            <StyleTableCell align="left">Tab Name</StyleTableCell>
                            <StyleTableCell align="left">Last Time Used</StyleTableCell>
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