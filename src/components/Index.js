import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    paper: {
        width: '100%',
        height: '100%',
      }
})

export default function Index() {
    const classes = useStyles();

    return(
        <Paper className={classes.paper} elevation={3}> 
            <Typography variant='h3' align="center">
            Bem-Vindo(a) ao SIGO (Sistema Integrado de Gestão de Operação)
            </Typography>
        
        </Paper>
    )
}