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
    paddingCheckbox:{
        padding:30,
    },
    head: {
        backgroundColor:"#009879",
        color: "#ffffff",
        textAlign: "left",
        "font-weight": "bold"
    },
    body:{
        "border-bottom": "1px solid #dddddd",
        fontSize: 14,
    }
}))(TableCell);


const StyleTableRow=withStyles(({
    root:{

        '&:nth-of-type(odd)':{
            backgroundColor: "#f3f3f3f1"
        },
    
    },
}))(TableRow);



class TabTable extends Component {


    render() {

        const rows = [];

        this.props.chromeTabs.forEach((tab) => {
            rows.push(
                <StyleTableRow key={tab.tabID}>
                    <StyleTableCell padding="checkbox"  size="small"  align="left">
                        <Checkbox />
                    </StyleTableCell>
                    <StyleTableCell  size="small"  component="th" scrope="row">
                        {tab.tabName}
                    </StyleTableCell>
                    <StyleTableCell  size="small"  align="left">{tab.lastTimeClicked}</StyleTableCell>
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
                    <Fab color="primary" aria-lable="close" size="small" disabled={false}>
                        <CloseIcon />
                    </Fab>
                </div>

            </div>
        );
    }
}
export default TabTable;