import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';


class TabTable extends Component {
    render() {
        const rows = [];

        this.props.chromeTabs.forEach((tab) => {
            rows.push(
                <TableRow key={tab.tabID}>
                    <TableCell align="left">
                        <Checkbox />
                    </TableCell>
                    <TableCell component="th" scrope="row">
                        {tab.tabName}
                    </TableCell>
                    <TableCell align="left">{tab.lastTimeClicked}</TableCell>
                </TableRow>
            )

        })
        return (
            <div >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="left">Tab Name</TableCell>
                            <TableCell align="left">Last Time Used</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
export default TabTable;