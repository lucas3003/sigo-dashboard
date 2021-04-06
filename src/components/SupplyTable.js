import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'
import CustomTableHead from './CustomTableHead';

import {config} from '../config'

class SupplyTable extends React.Component {

    state = {
        supplies: []
    }

    componentDidMount() {
        axios.get(`${config.serverUrl}/supply`)
            .then(res => {
                const supplies = res.data;
                this.setState({supplies});
            })
    }

    render() {

        return (
            <div>
                <h1>Insumos</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <CustomTableHead header={config.supply.tableHeader} />
                        <TableBody>
                            {this.state.supplies.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">{row.qty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

}

export default SupplyTable;