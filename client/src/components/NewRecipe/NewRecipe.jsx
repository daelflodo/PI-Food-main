import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from '../Validation/Validation'
import style from '../NewRecipe/NewRecipe.module.css'
import { getAllDiet, getAllRecipes, postRecipes } from "../../redux/actions/actions";
import axios from "axios";

const NewRecipe = () => {
    const dispatch = useDispatch();
    let listDiets = useSelector((state) => state.diets);
    // console.log('lista ', listDiets);
    const [errors, setErrors] = useState({})
    const [recipe, setRecipe] = useState({
        name: "",
        summary: "",
        healthScore: "",
        // steps: [],
        steps: "",
        diets: [],
        image: "",
    });
    // console.log(recipe.diets);
    useEffect(() => {
        dispatch(getAllDiet());
        dispatch(getAllRecipes());
    }, []);

    const handleChange = (event) => {
        setRecipe({
            ...recipe,
            [event.target.name]: event.target.value //usando bracket-notations pq no sabemos cual es el nombre de la 
            //propiedad 
        })
        // setRecipe({
        //     ...recipe,
        //     steps: [...recipe.steps, event.target.value]
        // })
        //declaramos la funcion validation dentro del handleChange para q las validaciones sean en tiempo real o mejor dicho
        //cada ves que cambie el estado de los input

        setErrors(validation({
            ...recipe,
            [event.target.name]: event.target.value
        }))
    }
    //selecciona lso tipos de diet
    const handleSelect = (event) => {
        setRecipe({
            ...recipe,
            diets: [...recipe.diets, event.target.value]
        })
    }
    const handleSteps = (event) => {
        setRecipe({
            ...recipe,
            steps: [...recipe.steps, event.target.value]
        })
    }
    // Elimina los tipos de Diet
    const handleDelete = (diet) => {
        setRecipe({
            ...recipe,
            diets: recipe.diets.filter((element) => element !== diet),
        });
    }
    const handleSubmit = (event) => {
        
        event.preventDefault()
    //     console.log(recipe);
    dispatch(postRecipes(recipe))
        // axios.post("http://localhost:3001/recipes/",recipe) //hago un post a la ur pasandole el body recipe(que son los values del formulario)
        // .then(response=>alert(response))//cuando se resuelva la promesa hago un alert de la respuesta
        // .catch(error => alert(error))
        // console.log('respueta ', recipe);


    // console.log('1: ',recipe);
    //agregar una imagen default
    // const newRecipe = {
    //     ...recipe,
    //     // image: recipe.image // || o una imagen por default
    // }
    
}


return (
    <div  className={style.container}>
        <h1>New Recipe</h1>
        <form onSubmit={handleSubmit} >
            {/* <span>New Recipe</span> */}
            <label htmlFor="name">Name</label>
            <input
                name="name"
                type="text"
                value={recipe.name}
                onChange={handleChange}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

            <label htmlFor="summary">Summary</label>
            <input
                name="summary"
                type="text"
                value={recipe.summary}
                onChange={handleChange}
            />
            {errors.summary && <p style={{ color: "red" }}>{errors.summary}</p>}

            <label htmlFor="healthScore">Health Score</label>
            <input
                name="healthScore"
                type="text"
                value={recipe.healthScore}
                onChange={handleChange}
            />
            {errors.healthScore && <p style={{ color: "red" }}>{errors.healthScore}</p>}

            <label htmlFor="steps">Steps</label>
            <input
                name="steps"
                type="text"
                value={recipe.steps}
                onChange={handleChange}
                // onChange={handleSteps}
            />
            {/* <button onClick={handleadd}>add</button> */}
            {errors.steps && <p style={{ color: "red" }}>{errors.steps}</p>}
            <br />

            <label htmlFor="image">Url image</label>
            <input
                name="image"
                type="text"
                value={recipe.image}
                onChange={handleChange}
            />
            {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}

            {/* ------------------------------------------- */}
            <div >
            {/* hago un mapeo para agregar la dieta */}
                <label >Select Diet:</label>
                <br />
                <select onChange={(event) => handleSelect(event)}>
                    <option disabled security="">Select a diet</option>
                    {listDiets?.map((element, index) => (
                        <option key={index} value={element?.name}>
                            {element?.name}
                        </option>
                    ))}
                </select>
                {/* {errors.diets && <p style={{ color: "red" }}>{errors.diets}</p>} */}
                {/* hago un mapeo para borrar la dieta */}
                <div >
                    {recipe.diets?.map((diet, index) => (
                        <div key={index} >
                            <button
                                onClick={() => handleDelete(diet)}
                            > x </button>
                            <span key={index}>{diet}</span>
                        </div>
                    ))}
                    
                </div>
            </div>


            {/* ------------------------------------------- */}
<br />

            <button>Create</button>
        </form>
    </div>
)
}
export default NewRecipe