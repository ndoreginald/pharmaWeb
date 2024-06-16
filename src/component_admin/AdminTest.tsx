import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AdminTest () {
 
const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
      libelle: '',
      description: '',
      idCategorie: '',
      prix: 0,
      quantite: 0,
      image: ''
  });

  useEffect(() => {
      // Fetch categories from the server
      fetch(`http://localhost:3001/pharmaDB/categorie/`)
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
          const response = await axios.post(`http://localhost:3001/pharmaDB/produit/`, formData);
          console.log('Produit ajouté avec succès:', response.data);
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
        <div className='container bg-light'>
    <div className="welcome-page">
      <div className="logo">
        <img src="img/img_ellipse_25.png"
                        alt=""
                        className="rounded-circle w-full object-cover mt-5 thick-green-border"
                         />
      </div>
      <h1 className="title">Formulaire </h1>
      <p className="subtitle">saisir les informations du nouveau produit</p>
      <div className="input-container">
          <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="libelle">Libellé :</label>
                <input className="form-control"
                    type="text" 
                    id="libelle" 
                    name="libelle" 
                    value={formData.libelle} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="description">Description :</label>
                <textarea className="form-control"
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="idCategorie">Catégorie :</label>
                <select className="form-control"
                    id="idCategorie" 
                    name="idCategorie" 
                    value={formData.idCategorie} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>
                            {category.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="prix">Prix :</label>
                <input className="form-control"
                    type="number" 
                    id="prix" 
                    name="prix" 
                    value={formData.prix} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="quantite">Quantité :</label>
                <input className="form-control"
                    type="number" 
                    id="quantite" 
                    name="quantite" 
                    value={formData.quantite} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label htmlFor="image">Image URL :</label>
                <input className="form-control"
                    type="text" 
                    id="image" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange} 
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Ajouter le produit</button>
        </form>
      </div>
    </div>
    </div>
      </>
    )
  
}

export default AdminTest
