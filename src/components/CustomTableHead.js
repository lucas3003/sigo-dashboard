import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class CustomTableHead extends React.Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    {this.props.header.map((header) => (
                        <TableCell style={{fontWeight: 'bold'}} align="center">{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>        
        );
    }

}

export default CustomTableHead;