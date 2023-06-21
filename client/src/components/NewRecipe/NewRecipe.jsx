import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from '../Validation/Validation'
import style from '../NewRecipe/NewRecipe.module.css'
import { getAllDiet, getAllRecipes, postRecipes } from "../../redux/actions/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRecipe = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let listDiets = useSelector((state) => state.diets);
    console.log('lista ', listDiets);
    const [errors, setErrors] = useState({})
    const [recipe, setRecipe] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
        image: "",
    });
    // console.log('recipe',recipe);
    // console.log('errors',errors);
    // console.log(recipe.diets);
    useEffect(() => {
        dispatch(getAllDiet());
        dispatch(getAllRecipes());
    }, []);

    const handleChange = (event) => {
        if (event.target.name === 'diets') {
            setRecipe({// este solamente es para el estado de diets
                ...recipe,
                diets: [...recipe.diets, event.target.value] //usando bracket-notations pq no sabemos cual es el nombre de la 
                //propiedad 
            })
            setErrors(validation({
                ...recipe,
                [event.target.name]: event.target.value
            }))
        } else {// aqui es para el resto de los estados
            setRecipe({
                ...recipe,
                [event.target.name]: event.target.value
            })
            setErrors(validation({
                ...recipe,
                [event.target.name]: event.target.value
            }))
        }

        //declaramos la funcion validation dentro del handleChange para q las validaciones sean en tiempo real o mejor dicho
        //cada ves que cambie el estado de los input
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
        //     console.log(recipe);
        if (recipe.name ==='' || Object.keys(errors).length !== 0) {
            event.preventDefault()
            alert('Faltan Datos')
        }
        else{
            dispatch(postRecipes(recipe))
            alert(`Recetas ${recipe.name} creada`)
        } 
        
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
        <div className={style.container}>
            <h1>New Recipe</h1>
            <form onSubmit={handleSubmit} >
                {/* <span>New Recipe</span> */}
                { !recipe.name && <label style={{ color: "red" }} htmlFor="name">Name</label>}
                <input
                    name="name"
                    type="text"
                    value={recipe.name}
                    onChange={handleChange}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                {!recipe.summary && <label style={{ color: "red" }} htmlFor="summary">Summary</label>}
                <input
                    name="summary"
                    type="text"
                    value={recipe.summary}
                    onChange={handleChange}
                />
                {errors.summary && <p style={{ color: "red" }}>{errors.summary}</p>}

                {!recipe.healthScore && <label style={{ color: "red" }} htmlFor="healthScore">Health Score</label>}
                <input
                    name="healthScore"
                    type="text"
                    value={recipe.healthScore}
                    onChange={handleChange}
                />
                {errors.healthScore && <p style={{ color: "red" }}>{errors.healthScore}</p>}

                {!recipe.steps && <label style={{ color: "red" }} htmlFor="steps">Steps</label>}
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

                {!recipe.image && <label style={{color:"red"}} htmlFor="image" >Url image</label>}
                <input
                    name="image"
                    type="text"
                    value={recipe.image}
                    onChange={handleChange}
                />
                
                { errors.image && <p style={{ color: "red" }}>{errors.image}</p>}

                {/* ------------------------------------------- */}
                {/* <div > */}
                {/* hago un mapeo para agregar la dieta */}

                {/* <br /> */}
                {/* <select name="diets" onChange={(event) => handleSelect(event)}> */}
                <select className={style.diets} name="diets" onChange={handleChange}>
                    <option disabled selected>Select a diet</option>
                    {listDiets?.map((element, index) => (
                        <option key={index} value={element?.name}>
                            {element?.name}
                        </option>
                    ))}
                </select>
                {errors.diets && <p style={{ color: "red" }}>{errors.diets}</p>}
                {/* hago un mapeo para borrar la dieta */}
                <div >
                    {recipe.diets?.map((diet, index) => (
                        <div key={index} >
                            <button
                                className={style.buttonDelete}
                                onClick={() => handleDelete(diet)}
                            > x </button>
                            <span className={style.spanDiets} key={index}>{diet}</span>
                        </div>
                    ))}

                </div>
                {/* </div> */}


                {/* ------------------------------------------- */}
                <br />

                <button disabled={Object.keys(errors).length !== 0}>Create</button>
            </form>
        </div>
    )
}
export default NewRecipe