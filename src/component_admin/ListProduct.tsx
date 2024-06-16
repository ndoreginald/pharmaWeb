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

function ListProduct () {

  const [products,setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/e-Ectro/produit/`)
      .then(response => response.json())
      .then(data => {
        if (data) {
            setProducts(data);
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
    
      const handleDelete = async (id,nom) => {
        if(confirm(`Voulez vous vraiment supprimer cet article "${nom}"?`)){
          try {
            const response = await fetch(`http://localhost:3001/e-Ectro/produit/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              setProducts(products.filter((product) => product._id !== id));
            } else {
              console.error('Erreur lors de la suppression du produit :', response.statusText);
            }
          } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
          }
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
          <Typography variant="h6" className='text-center'>Tableau des Produits</Typography>
          <div  className='mb-5'></div>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'green' , minWidth:0}}>
            <TableCell sx={{ color: 'white' , fontSize: '1rem'}} >Image </TableCell>
            <TableCell sx={{ color: 'white' , fontSize: '1rem'}} >libelle </TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">description</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">prix&nbsp;($)</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">quantite&nbsp;</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Catégorie&nbsp;</TableCell>
            <TableCell sx={{ color: 'white' ,fontSize: '1rem'}} align="right">Actions&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map( (p) => (
            <TableRow key={p.libelle} sx={{ '&:last-child td, &:last-child th': { border: 0 ,width: 50} }} >
              <TableCell component="th" scope="row" style={{ width:"100px",height: "100px"}}>
                <div className="overflow-hidden" style={{width: "100px",height: "100px"}}>
                  <img className="img-fluid " src={p.image} alt={p.libelle}/>
                </div>
              </TableCell>
              <TableCell component="th" scope="row">{p.libelle}</TableCell>
              <TableCell align="right">{p.description}</TableCell>
              <TableCell align="right">{p.prix} $</TableCell>
              <TableCell align="right">{p.quantite}</TableCell>
              <TableCell align="right">{p.idCategorie.nom}</TableCell>
              <TableCell align="right">
              
                <IconButton onClick={() => navigate(`/admin/editProduct/${p._id}`)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(p._id,p.libelle)} aria-label="delete">
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

export default ListProduct
