import React from "react"
import { Link, useNavigate } from "react-router-dom"
import style from './Recipe.module.css'
import axios from 'axios'
const Recipe = ({ image, name, diets, id, healthScore }) => {


    const handleDelete = (event)=>{
        axios.delete("http://localhost:3001/recipes/"+id) //hago un post a la ur pasandole el body recipe(que son los values del formulario)
        .then(response=> alert(response.data))//cuando se resuelva la promesa hago un alert de la respuesta
        .catch(error => alert(error.response.data))        
    }

    
    return (
        <div className={style.componente}>
           {isNaN(id) && <button onClick={handleDelete}>x</button>}
            <h4>Score: {healthScore}</h4>
            <h3>{id}</h3>
            <h2>{name}</h2>
            <Link to={`/detail/${id}`} key={id}  >
                <img src={image} alt="Image Not Found" />
            </Link>
            <div className={style.diet}>
                {diets?.map((diet,index) =>
                    <p key={index}> { diet }</p>
                )}
            </div>
        </div>

    )
}

export default Recipe
