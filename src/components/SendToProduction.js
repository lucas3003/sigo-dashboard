import React from 'react';
import axios from 'axios'

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import {config} from '../config'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SendToProduction extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.saleId,
            sentToProduction: false,
            openErrorSnackbar: false,
            showLoading: false
        }
    }

    sendSaleToProduction = async (refreshHandler) => {
        let success = true;
        this.setState({
            ...this.state,
            showLoading: true
        })
        
        try {
            let res = await axios({
                method: 'put',
                url: `${config.serverUrl}/sales/sendToProduction`,
                headers: {},
                data: {
                    id: this.state.id
                }
            });
        } catch(err) {
            success = false;
            this.setOpenErrorSnackbar(true);
        } finally {
            this.setState({
                ...this.state,
                sentToProduction: success,
                showLoading: false
            })
        }
    }

    setOpenErrorSnackbar(newState) {
        this.setState({
            ...this.state,
            openErrorSnackbar: newState
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setOpenErrorSnackbar(false);
      };

    render() {
        if(!this.state.sentToProduction) {
            return(
                <div>
                    <a>Não</a>
                    <br></br>
                    <Button onClick={() => this.sendSaleToProduction()} variant="outlined" color="primary">
                        Enviar para produção
                    </Button>
                    {this.state.showLoading ? <CircularProgress /> : null}
                    
                    <Snackbar open={this.state.openErrorSnackbar} autoHideDuration={1}  message="Test">
                        <Alert onClose={this.handleClose} severity="error">
                            Quantidade de insumos não é suficiente
                        </Alert>
                    </Snackbar>    
                </div>
            );
        }

        return(
            <a>Sim</a>
        );
    }
}

export default SendToProduction;