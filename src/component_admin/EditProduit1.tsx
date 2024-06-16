import { Paper, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduit1 () {

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
    
    const {id} = useParams(); //Recupere l'id du produit en parametre
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(null); // product initialisé à null
    const [formData, setFormData] = useState({
      libelle: '',
      description: '',
      idCategorie: '',
      prix: 0,
      quantite: 0,
      image: '',
      popularity: 0,
      date_ajout: ''
    });

    const [catName,setCatName] = useState('');
  
    // Récupérer le produit
    useEffect(() => {
      fetch(`http://localhost:3001/e-Ectro/produit/${id}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setProduct(data);
            console.log(product);
          }
        })
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
    }, [id]);
  
    // Récupérer les catégories
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
  
    // Initialiser formData une fois que le produit est récupéré
    useEffect(() => {
      if (product) {
        const formattedDate = product.date_ajout ? product.date_ajout.split('T')[0] : '';
        setCatName(product.idCategorie.nom);
        setFormData({
          libelle: product.libelle || '',
          description: product.description || '',
          idCategorie: product.idCategorie|| '',
          prix: product.prix || 0,
          quantite: product.quantite || 0,
          image: product.image || '',
          popularity: product.popularity || 0,
          date_ajout: formattedDate || ''
        });
      }
    }, [product]);
    
      const handleChange = (e: { target: { name: any; value: any; }; }) => {
          const { name, value } = e.target;
          setFormData(prevState => ({
              ...prevState,
              [name]: value
          }));
          console.log(e.target)
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const updatedFormData = {
            ...formData,
            date_ajout: new Date(formData.date_ajout).toISOString()
          };
          await fetch(`http://localhost:3001/e-Ectro/produit/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFormData),
          })
            .then(response => response.json())
            .catch(error => console.error('Error updating data:', error));
            navigate(`/admin/editCategorie/${product.idCategorie._id}`);
        } catch (error) {
          console.error('Erreur lors de la mise à jour des données :', error);
        }
      };

      const cancelEdit =() =>{
        navigate(`/admin/editCategorie/${product.idCategorie._id}`);
      }
    

    return (
      <>
        
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Header />
          <div className='mb-5'></div>
          <div className="row">
            <div className="col-6">
            <Paper style={{ padding: '16px', maxWidth: '500px', margin: 'auto' }}>
            <Typography variant="h6" gutterBottom color="primary" className='text-center'>
            <h2 className='text-primary font-italic text-monospace'>Editer Produit</h2>
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className='font-italic'>Libelle</label>
                  <input type="text" name="libelle" className="form-control font-italic text-monospace" value={formData.libelle} onChange={handleChange} required/>
                </div>
                <div className="form-group col-md-6">
                  <label className='font-italic ' htmlFor="inputState">Categorie</label>
                  <select id="inputState" name="idCategorie" className="form-control font-italic text-monospace" onChange={handleChange} required>
                    <option selected value={formData.idCategorie}>{catName} </option>
                    {categories.map(cat=>(
                      <option value={cat._id}>{cat.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className='font-italic'>Description</label>
                <input type="text" name="description" className="form-control font-italic text-monospace" value={formData.description} onChange={handleChange} required/>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className='font-italic'>Prix</label>
                  <input type="number" name="prix" className="font-italic form-control text-monospace" value={formData.prix} onChange={handleChange} required/>
                </div>
                <div className="form-group col-md-6">
                  <label className='font-italic'htmlFor="inputState">Quantité</label>
                  <input type="number" name="quantite" className="form-control font-italic text-monospace" value={formData.quantite} onChange={handleChange} required/>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className='font-italic' htmlFor="image">Image URL</label>
                  <input type="text" name="image" className="font-italic form-control text-monospace" id="image" value={formData.image} onChange={handleChange} required/>
                </div>
                <div className="form-group col-md-4">
                  <label className='text-warnings' htmlFor="inputState">Date Ajout</label>
                  <input type="date" name="date_ajout" className="font-italic form-control text-monospace" id="date" value={formData.date_ajout} onChange={handleChange} required/>
                </div>
                <div className="form-group col-md-2">
                  <label className='font-italic' htmlFor="inputZip">Popular</label>
                  <input type="number" name="popularity" className="font-italic form-control text-monospace" id="popular" value={formData.popularity} onChange={handleChange} required/>
                </div>
              </div>
              <div className="container">
  <div className="row gap-3">
  <button type="button" onClick={cancelEdit} className="btn btn-danger text-monospace col-5 ms-4 ">Annuler</button>
    <button type="submit" className="btn btn-success text-monospace col-5 ">Valider</button>
  </div>
</div>
              
            </form>
          </Paper>
            </div>
            <div className="col-6">
            <div className='card'>
    <img className="card-img-top" src={formData.image} alt={formData.libelle}/>
    </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>

    <hr />


      </>
    )
  }


export default EditProduit1;
