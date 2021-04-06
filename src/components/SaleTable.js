import React from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';


import {config} from '../config';

import CustomTableHead from './CustomTableHead';



class SaleTable extends React.Component {
    state = {
        sales: []
    }

    componentDidMount() {
        
        axios.get(`${config.serverUrl}/sales`)
            .then(res => {
                const sales = res.data;
                //Buscar nome do produto
                this.setState({sales});
            })
    }


    render() {
        return (
            <div>
                <h1>Vendas</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <CustomTableHead header={config.sale.tableHeader} />
                        <TableBody>
                            {this.state.sales.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{new Date(row.date).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell align="center">{row.product}</TableCell>
                                    <TableCell align="center">{row.countryOfDestiny}</TableCell>
                                    <TableCell align="center">{row.soldUnits}</TableCell>
                                    <TableCell align="center">{row.unitAmount.toFixed(2)}</TableCell>
                                    <TableCell align="center">{(row.unitAmount*row.soldUnits).toFixed(2)}</TableCell>
                                    <TableCell align="center">{row.sentToProduction?"Sim":"Não"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

}

export default SaleTable;