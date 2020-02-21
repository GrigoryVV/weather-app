import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Button } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

const useStyles = makeStyles({
    table: {
      width: '100%',
    },
  });
  
  function createData(city, countryCode, temperature) {
    return { city, countryCode, temperature };
  }
  
  const rows = [
    createData('Novosibirsk', 'RU', -6.0),
    createData('London', 'GB', 9.0),
    createData('New York', 'US', 16.0,),
    createData('Totonto', 'CA', 3.7),
    createData('Berlin', 'DE', 10.0),
  ];

export default function Favorites(props) {

    const classes = useStyles();

    return (
        <TableContainer component='div'>
            <Typography variant='h5'>Your favorite cities</Typography>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell align="right">Temperature&nbsp;(&#730;C)</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <TableRow key={row.city + row.countryCode}>
                    <TableCell component="th" scope="row">
                        {row.city}
                    </TableCell>
                    <TableCell>{row.countryCode}</TableCell>
                    <TableCell align="right">{row.temperature}</TableCell>
                    <TableCell align="center">
                        <Button color="secondary">
                            <DeleteRoundedIcon/>
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
