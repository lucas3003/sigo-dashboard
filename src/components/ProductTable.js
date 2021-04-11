import React from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import {config} from '../config';

import find from 'lodash/find';

import CustomTableHead from './CustomTableHead';

class ProductTable extends React.Component {
    state = {
        products: []
    }

    async componentDidMount() {
        const productRequest = await axios.get(`${config.serverUrl}/product`);
        this.setState({products: productRequest.data});
        this.getSupplyName();
    }

    async getSupplyName() {
        const products = this.state.products;

        //TODO: Request for only supplies that are parte of a product. Make some cache.
        const supplyRequest = await axios.get(`${config.serverUrl}/supply`);

        products.forEach((product, i, productsArray) => {
            product.supplies.forEach((supply, j, suppliesArray) => {
                const foundSupply = find(supplyRequest.data, (sup) => sup.id === supply.id)
                suppliesArray[j].description = foundSupply.description
            })
        })

        this.setState({products});
    }

    render() {
        return (
            <div>
                <h1>Produtos</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <CustomTableHead header={config.product.tableHeader} />
                        <TableBody>
                            {this.state.products.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    {
                                        row.supplies.map(supply => (
                                            <div style={{width: "100%"}} align="center">
                                            <TableRow align="center" key={supply.id}>
                                                <TableCell align="center">Nome: {supply.description}</TableCell>
                                                <TableCell align="center">Quantidade: {supply.qty}</TableCell>
                                            </TableRow>
                                            </div>
                                        ))
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

}

export default ProductTable;