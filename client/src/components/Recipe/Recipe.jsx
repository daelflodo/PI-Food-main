import React from "react"
import { Link } from "react-router-dom"
import style from './Recipe.module.css'
const Recipe = ({ image, name, diets, id, healthScore }) => {

    return (
        <div className={style.componente}>
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
