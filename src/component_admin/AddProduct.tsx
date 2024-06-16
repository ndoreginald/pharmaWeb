import { TextField, Button, Grid, Paper, Typography, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';

function AddProduct () {

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
  
      const [categories, setCategories] = useState([]);
      const [formData, setFormData] = useState({
        libelle: '',
        description: '',
        idCategorie: '',
        prix: 0,
        quantite: 0,
        image: '',
        date_ajout: '' || new Date()
      });
    
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
    
      const handleChange = (e: { target: { name: any; value: any; }; }) => {
          const { name, value } = e.target;
          setFormData(prevState => ({
              ...prevState,
              [name]: value
          }));
      };
    
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
          e.preventDefault();
          try {
              const response = await axios.post(`http://localhost:3001/e-Ectro/produit/`, formData);
              console.log('Produit ajouté avec succès:', response.data);
              alert(`Produit ${formData.libelle} ajouté avec succès`);
              // Réinitialiser le formulaire
              setFormData({
                  libelle: '',
                  description: '',
                  idCategorie: '',
                  prix: 0,
                  quantite: 0,
                  image: ''
              });
             
          } catch (error) {
              console.error('There was an error adding the product!', error);
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
          <div className='mb-5'></div>
          <Paper style={{ padding: '16px', maxWidth: '500px', margin: 'auto' }}>
      <Typography variant="h6" gutterBottom color="primary" className='text-center'>
      saisir les informations du nouveau produit
      </Typography>
      <form onSubmit={handleSubmit} >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              type="text" 
              id="libelle" 
              name="libelle" 
              value={formData.libelle} 
              onChange={handleChange}
              label="libelle"
              fullWidth
              required 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              fullWidth
              required 
              label="description"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
             type="number" 
             id="prix" 
             name="prix" 
             label="prix"
             value={formData.prix} 
             onChange={handleChange} 
             fullWidth
             required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number" 
              id="quantite" 
              name="quantite" 
              label="quantite"
              value={formData.quantite} 
              onChange={handleChange} 
              fullWidth
              required
            />
            </Grid>
             <Grid item xs={12}>
            <TextField
              select
              label="Catégorie"
              name="idCategorie"
              value={formData.idCategorie}
              onChange={handleChange}
              fullWidth
              required
            >
              {categories.map(cat=>(
                <MenuItem value={cat._id}>{cat.nom}</MenuItem>
              ))}
            </TextField>
          
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date" 
              id="date_ajout" 
              name="date_ajout" 
              value={formData.date_ajout} 
              onChange={handleChange} 
              fullWidth
              label="Date d'ajout"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text" 
              id="image" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              fullWidth
              label="image"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Valider
            </Button>
          </Grid>
        </Grid>
      </form>

    </Paper>
        </main>
      </div>
    </ThemeProvider>

    <hr />


      </>
    )
  }


export default AddProduct
