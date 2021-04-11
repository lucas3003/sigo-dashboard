import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import find from 'lodash/find';
import React from 'react';
import { config } from '../config';
import CustomTableHead from './CustomTableHead';



class ProductionTable extends React.Component {

    state = {
        production: []
    }

    async componentDidMount() {
        const productionRequest = await axios.get(`${config.serverUrl}/production`);
        this.setState({production: productionRequest.data})
        await this.getProductDescriptions()
    }

    async getProductDescriptions() {
        const production = this.state.production;

        //TODO: Request for only products that are parte of a production
        const productRequest = await axios.get(`${config.serverUrl}/product`);

        production.forEach((production, index, productionArray) => {
            const product = find(productRequest.data, (product) => product.id === production.productId);
            productionArray[index].product = product.description;
        });

        this.setState({production});
    }

    render() {

        return (
            <div>
                <h1>Produção</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <CustomTableHead header={config.production.tableHeader} />
                        <TableBody>
                            {this.state.production.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{new Date(row.date).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell align="center">{row.product}</TableCell>
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

export default ProductionTable;