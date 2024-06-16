import { TextField, Button, Grid, Paper, Typography, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../component_admin/Header';
import Sidebar from '../component_admin/Sidebar';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CategorieForm () {
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
  
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        produits: [{ libelle: '', description: '', prix: 0, quantite: 0 ,image:'',date_ajout: ''|| new Date()}],
    });
    
    const handleChange = (e: { target: { name: string; value: string; }; }, index?: number) => {
        const { name, value } = e.target;
        if (index !== undefined) {
            const newProduits = [...formData.produits];
            newProduits[index][name] = value;
            setFormData(prevState => ({
                ...prevState,
                produits: newProduits
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    
    const handleAddProduct = async () => {
        setFormData(prevState => ({
            ...prevState,
            produits: [...prevState.produits, { libelle: '', description: '', prix: 0, quantite: 0 ,image:'',date_ajout: ''|| new Date()}]
        }));
    };

    const handleRemoveProduct = async (index: number) => {
        const newProduits = formData.produits.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            produits: newProduits
        }));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/e-Ectro/categorie/`, formData);
            console.log('Catégorie et produits ajoutés avec succès:', formData.produits);
            alert(`Categorie ${formData.nom} ajoutée avec succès`)
            // Réinitialiser le formulaire
            setFormData({
                nom: '',
                description: '',
                produits: [{ libelle: '', description: '', prix: 0, quantite: 0 ,image:'',date_ajout: ''|| new Date()}]
            });
        } catch (error) {
            console.error('There was an error adding the category and products!', error);
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
            <Paper style={{ padding: '16px', maxWidth: '800px', margin: 'auto' }}>
              <Typography variant="h6" gutterBottom color="primary" className='text-center'>
                Saisir les informations de la nouvelle catégorie
              </Typography>
              <form onSubmit={handleSubmit} >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      type="text" 
                      id="libelle" 
                      name="nom" 
                      value={formData.nom} 
                      onChange={handleChange}
                      label="Libelle"
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
                      label="Description"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Produits
                    </Typography>
                    {formData.produits.map((produit, index) => (
                      <div className="container mt-3 pt-2">
                        <div>
                        <span className='text-danger'>
                        -----------------------------------------------------------------------------------------------------------------------------------------------------------------
                        </span>
                      </div>
                        <Grid container spacing={2} key={index}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            type="text" 
                            name="libelle" 
                            value={produit.libelle} 
                            onChange={(e) => handleChange(e, index)}
                            label="Nom du produit"
                            fullWidth
                            required 
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            type="text" 
                            name="description" 
                            value={produit.description} 
                            onChange={(e) => handleChange(e, index)}
                            label="Description du produit"
                            fullWidth
                            required 
                          />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            type="number" 
                            name="prix" 
                            value={produit.prix} 
                            onChange={(e) => handleChange(e, index)}
                            label="Prix"
                            fullWidth
                            required 
                          />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <TextField
                            type="number" 
                            name="quantite" 
                            value={produit.quantite} 
                            onChange={(e) => handleChange(e, index)}
                            label="Quantité"
                            fullWidth
                            required 
                          />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <TextField
                            type="date" 
                            name="date_ajout" 
                            value={produit.date_ajout} 
                            onChange={(e) => handleChange(e, index)}
                            label="Date d'ajout"
                            fullWidth
                            required 
                          />
                        </Grid>
                        <Grid item xs={6} sm={9}>
                          <TextField
                            type="text" 
                            name="image" 
                            value={produit.image} 
                            onChange={(e) => handleChange(e, index)}
                            label="Image Url"
                            fullWidth
                            required 
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} className="d-flex align-items-center">
                          <IconButton onClick={() => handleRemoveProduct(index)} aria-label="delete">
                            <RemoveIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      </div>
                    ))}
                    <div className="container mt-3 pt-1">
                      <Button className='md-2'
                        type="button" 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleAddProduct} 
                        startIcon={<AddIcon />}
                        fullWidth
                      >
                        Ajouter un produit
                      </Button>
                    </div>
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
    </>
  );
}

export default CategorieForm;
