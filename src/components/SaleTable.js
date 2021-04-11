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
import SendToProduction from './SendToProduction';

import find from 'lodash/find';

class SaleTable extends React.Component {
    state = {
        sales: []
    }

    async getAllSales() {
        const salesRequest = await axios.get(`${config.serverUrl}/sales`);
        this.setState({sales: salesRequest.data});
        await this.getProductDescriptions();

    }

    //TODO: Move this method to a bigger scope, it might be useful for other contexts
    async getProductDescriptions() {
        const sales = this.state.sales;

        //TODO: Request for only products that are parte of a sale
        const productRequest = await axios.get(`${config.serverUrl}/product`);

        sales.forEach((sale, index, salesArray) => {
            const product = find(productRequest.data, (product) => product.id === sale.productId);
            salesArray[index].product = product.description;
            
        });

        this.setState({sales});
    }

    async componentDidMount() {
        await this.getAllSales();
    }

    async refresh() {
        await this.getAllSales();
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
                                    <TableCell align="center">{row.sentToProduction?"Sim":<SendToProduction saleId={row.id} refreshHandler={this.refresh} />}</TableCell>
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