import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tooltip } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../component_admin/Header';
import Sidebar from '../component_admin/Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

function ContactAdmin() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/e-Ectro/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleEdit = (id) => {
    // Logic for editing a contact
  };



  const handleDelete = (id: any,nom: undefined) => {
    if(confirm(`Voulez-vous supprimer ce message de "${nom}"?`)){
      fetch(`http://localhost:3001/e-Ectro/contact/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      // Filtrer la catégorie supprimée de la liste
      setContacts(contacts.filter(contact => contact._id !== id));
    })
    .catch(error => console.error('Erreur lors de la suppression du message :', error));
    }
  };

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

  const styles = {
    cell: {
      maxWidth: '150px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };

  return (
    <>
     <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flexGrow: 1, padding: '20px' }}>
            <Header />
            <div className='mb-5'></div>
            <Typography variant="h6" className='text-center'>Tableau des Messages</Typography>
            <div className='mb-5'></div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className='bg-primary'>
                    <TableCell sx={{ fontSize: '1rem' }}>Nom</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }} >Email</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }} >Subject</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }} >Message</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }} align="right">Date</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }} align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{contact.name}</TableCell>
                      <TableCell >{contact.email}</TableCell>
                      <Tooltip title={contact.subject}>
                        <TableCell sx={styles.cell}>{contact.subject}</TableCell>
                      </Tooltip>
                      <Tooltip title={contact.message}>
                        <TableCell  sx={styles.cell}>{contact.message}</TableCell>
                      </Tooltip>
                      <TableCell align="right">{contact.date}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(contact._id)} aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(contact._id)} aria-label="delete">
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

export default ContactAdmin;
