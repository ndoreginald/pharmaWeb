import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../component_admin/Header';
import Sidebar from '../component_admin/Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CategorieList () {

  const navigate = useNavigate();

  const [categories,setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/e-Ectro/categorie/`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setCategories(data);
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  }, []);
  
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
    
      const handleDelete = (id,nom) => {
        if(confirm(`Voulez-vous supprimer la categorie "${nom}"?`)){
          fetch(`http://localhost:3001/e-Ectro/categorie/${id}`, {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
          // Filtrer la catégorie supprimée de la liste
          setCategories(categories.filter(category => category._id !== id));
        })
        .catch(error => console.error('Erreur lors de la suppression de la catégorie :', error));
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
          <Typography variant="h6" className='text-center'>Tableau des Categories</Typography>
          <div  className='mb-5'></div>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'green' }}>
            <TableCell sx={{ color: 'white' , fontSize: '1rem'}} >Noms </TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Description</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Actions&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((row) => (
            <TableRow
              key={row.nom}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nom}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => navigate(`/admin/editCategorie/${row._id}`)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(row._id,row.nom)} aria-label="delete">
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
    )
  
}

export default CategorieList
