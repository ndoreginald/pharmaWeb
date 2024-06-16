import { useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import CategorieList from "../component_admin/CategorieList.tsx";
//import CategorieList from "./CategorieList.tsx";


function DeleteCategorie () {
 
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
        <CategorieList/>
      </>
    )
  
}

export default DeleteCategorie
