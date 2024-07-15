
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../component_admin/Header';
import Sidebar from '../component_admin/Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

function CommandList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/e-Ectro/command/`)
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Erreur lors de la récupération des données : " + error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const theme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
      });

      const deleteOrder = async (orderId: any) => {
        try {
          await axios.delete(`http://localhost:3001/e-Ectro/command/${orderId}`);
          setOrders(); // Recharger la liste des commandes après la suppression
        } catch (error) {
          console.error('Erreur lors de la suppression de la commande :', error);
        }
      };

      const handleDelete = (id,firstName) => {
        if(confirm(`Voulez-vous supprimer la commande "${firstName}"?`)){
          fetch(`http://localhost:3001/e-Ectro/command/${id}`, {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
          // Filtrer la catégorie supprimée de la liste
          setOrders(orders.filter(command => command._id !== id));
        })
        .catch(error => console.error('Erreur lors de la suppression de la commande :', error));
        }
      };

    return (

        <>
         <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Header />
          <div  className='mb-5'></div>
          <Typography variant="h6" className='text-center'>Tableau des Commandes</Typography>
          <div  className='mb-5'></div>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'green' , minWidth:0}}>
            <TableCell sx={{ color: 'white' , fontSize: '1rem'}} >Name </TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Email</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Mobile</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Address</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Country</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">City</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Payment Method</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Order Items</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Total</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">date</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Status</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Actions&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {orders.map((order) => (
            <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 ,width: 50} }} >
              <TableCell component="th" scope="row">{order.firstName} {order.lastName}</TableCell>
              <TableCell align="right">{order.email}</TableCell>
              <TableCell align="right">{order.mobile}</TableCell>
              <TableCell align="right">{order.address1} {order.address2}</TableCell>
              <TableCell align="right">{order.country}</TableCell>
              <TableCell align="right">{order.city}</TableCell>
              <TableCell align="right">{order.paymentMethod}</TableCell>

              <TableCell align="right">
              <ul>
                {order.cartItems.map(item => (
                      <li key={item._id}>{item.libelle}: x({item.quantite})</li>
                         ))}
                     </ul>
              </TableCell>
              <TableCell align="right">${order.total}</TableCell>
              <TableCell align="right">{order.date_ajout}</TableCell>
              <TableCell align="right" sx={{ color: order.status === 'cancelled' ? 'red' : 'blue', fontSize: '1rem' }}>{order.status}</TableCell>
              <TableCell align="right">
              <IconButton onClick={() => handleDelete(order._id, order.firstName)}  aria-label="delete"  disabled={order.status === 'validated'}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </main>
      </div>
    </ThemeProvider>
        </>
        
    );
}

export default CommandList;
