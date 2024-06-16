import { useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
//import ListProduct from "./ListProduct";
import ListProduct from '../component_admin/ListProduct.tsx';


function DeleteProduit () {
 
    useEffect(
        ()=>{
            fetch(`http://localhost:3001/etudiants/${id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify({ _id: id }),
            })
            .then(response => {
                if(response.ok){
                    response.json();
                   // navigator('/');
                }
                else{
                    throw new Error("La suppression a echoué");
                }
            }
            )
            .catch(
                error => {
                    console.error('Error adding data:', error);
                    alert("Erreur lors de l'ajout");
                }
            );
        },
        []
      );



    return (
      <>
        <ListProduct/>
      </>
    )
  
}

export default DeleteProduit
