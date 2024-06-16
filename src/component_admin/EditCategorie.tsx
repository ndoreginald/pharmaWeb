import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../component_admin/Header';
import Sidebar from '../component_admin/Sidebar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/css/EditCategorie.css'

function EditCategorie () {
 
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

  const navigate = useNavigate();
  const {id} = useParams(); //Recupere l'id de la categorie en parametre
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    produits: [],
  });

  const [showProducts, setShowProducts] = useState(false);

  const toggleShowProducts = () => {
    setShowProducts(prevShowProducts => !prevShowProducts);
  };  

  // Récupérer la categorie à modifier
  useEffect(() => {
    fetch(`http://localhost:3001/e-Ectro/categorie/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setCategorie(data);
          console.log(categorie);
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
  }, [id]);

  // Initialiser formData une fois que la categorie est récupérée
  useEffect(() => {
    if (categorie) {
      setFormData({
        nom: categorie.nom || '',
        description: categorie.description || '',
        produits: categorie.produits|| [],
      });
    }
    console.log(formData);
  }, [categorie]);
  
  // Récupérer toutes les categories
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
  }

  //Mise à jour de la categorie et de tous les produits qu'elle englobe
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:3001/e-Ectro/categorie/${id}`, formData);
        console.log('Produit ajouté avec succès:', response.data);
        // Réinitialiser le formulaire
        setFormData({
            nom: '',
            description: '',
            produits: [],
        });
        navigate('/admin/categories');
    } catch (error) {
        console.error('There was an error adding the product!', error);
    }
  };

  const cancelEdit =() =>{
    navigate('/admin/categories');
  }

  const handleDelete = (id,nom) => {
    if(confirm(`Voulez-vous supprimer la categorie "${nom}"?`)){
      fetch(`http://localhost:3001/e-Ectro/categorie/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => console.error('Erreur lors de la suppression de la catégorie :', error));
    navigate('/admin/categories');
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
          <div className='edit-categorie-container'>
          <Typography variant="h4" align="center" gutterBottom color="primary" className='title'>
            <h2 className='text-primary font-italic text-monospace'>Editer Categorie</h2>
          </Typography>
          <form onSubmit={handleSubmit} >
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nom"
                label="Libelle"
                fullWidth
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            component="span"
            className="products-toggle"
            onClick={toggleShowProducts}
          >
            Produits ({formData.produits ? formData.produits.length : 0})
          </Typography>
          </Grid>
        {showProducts && (
          <Grid item xs={12}>
            <div className="products-list">
              <Grid container spacing={2}>
                {formData.produits && formData.produits.map((product, index) => (
                    <Grid item className="product-item">
                      <a className="text-decoration-none" href={`/admin/editProduct1/${product._id}`}>
                        <div className="product-content">
                          <div className="product-image">
                            <img className="img-fluid" src={product.image} alt={product.nom} />
                          </div>
                          <div className="product-info">
                            {product.nom}
                          </div>
                        </div>
                      </a>
                    </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        )}
        <div className="row gap-3">
        <button type="submit" onClick={cancelEdit} className="btn btn-warning text-monospace col-5 ms-3 ">Annuler</button>
        <button type="submit" className="btn btn-success text-monospace col-5">Valider</button>
        </div>
        <button type="button" onClick={()=>{handleDelete(id,formData.nom)}} className="btn btn-danger text-monospace col-12 mt-2">Supprimer</button>
            </Grid>
          </form>
          </div>
        </Paper>
        </main>
      </div>
    </ThemeProvider>

    </>
  )

}

export default EditCategorie
