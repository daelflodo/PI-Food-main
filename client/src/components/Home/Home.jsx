// import { Link, NavLink } from "react-router-dom"
import style from './Home.module.css'
import Recipe from "../Recipe/Recipe"
// import Paginated from "../Paginated/Paginated"
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { OrderName, filterCreated, filterRecipesDiet, getAllDiet, getAllRecipes, orderRecipesScore } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
// import { getAllRecipes } from "../../redux/actions/actions";

const Home = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.diets)
    // console.log('todas las dietas ', allDiets);
    console.log('todas las recetas ', allRecipes);
    const [currentPag, setCurrentPag] = useState(1);
    const [recipesByPag] = useState(9);
    const indexLastRecipe = currentPag * recipesByPag;
    const indexFirstRecipe = indexLastRecipe - recipesByPag;
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);
    const navigate = useNavigate();    // console.log('current home', currentRecipes);

    const pageNumbers = []//almacenar los números de página
    const handlePaginated = (pageNumber) => {
        setCurrentPag(pageNumber);
    };
    const totalPages = Math.ceil(allRecipes.length / recipesByPag)
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        // dispatch(getAllDiet)
        dispatch(getAllRecipes)
        if (currentPag > totalPages) {
            setCurrentPag(1)
        }
    }, [totalPages])
    // console.log(pageNumbers);

    const handleOrderScore = (event) => {
        dispatch(orderRecipesScore(event.target.value))
    }
    const handleOrderName = (event) => {
        dispatch(OrderName(event.target.value))
    }
    const handleFilterDiet = (event) => {
        dispatch(filterRecipesDiet(event.target.value))
    }
    const handleFilterCreated = (event) => {
        dispatch(filterCreated(event.target.value))
    }
    const handleNext = () => {
        if (currentPag < totalPages) {
            setCurrentPag(currentPag + 1)
        }
    }
    const handlePrevious = () => {
        if (currentPag > 1) {
            setCurrentPag(currentPag - 1)
        }
    }
    //row
    return (
        <div className={style.container}>
            <div>
                <select className={style.filter} onChange={handleOrderName}>
                    <option disabled selected>Order by Title</option>
                    <option value="A-Z">(A-Z)</option>
                    <option value="Z-A">(Z-A)</option>
                </select>

                <select className={style.filter} onChange={handleOrderScore}>
                    <option disabled selected>Order by Score</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>

                <select className={style.filter} onChange={handleFilterCreated}>
                    <option disabled selected>Filter by Created</option>
                    <option value="All Recipe">All</option>
                    <option value="api">Api</option>
                    <option value="db">Date Base</option>
                </select>

                <select className={style.filter} onChange={handleFilterDiet}>
                    <option disabled selected>Filter by Diet</option>
                    {
                        allDiets?.map((diet, index) => {
                            return <option value={diet.name} key={index}> {diet.name}</option>
                        }

                        )
                    }
                </select>
            </div>
            
            <div className={style.contbutton}>
                <button onClick={handleNext}>Next</button>
                {pageNumbers.map((pag) => {
                    return (<button
                        className={currentPag === pag ? "container current" : "container"}
                        key={pag}
                        onClick={() => handlePaginated(pag)}>
                        {pag}
                    </button>)

                })
                }
                <button onClick={handlePrevious}>Previous</button>
            </div>
            
            <div className={style.row}>
                {currentRecipes.map((recipe, index) => (
                    <Recipe
                        key={index}
                        id={recipe.id}
                        name={recipe.name}
                        image={recipe.image}
                        diets={recipe.diets}
                        healthScore={recipe.healthScore}
                    />
                ))}
            </div>

            {/* <div>
                {pageNumbers.map((pag) => {
                    return (<button
                        className={currentPag === pag ? "container current" : "container"}
                        key={pag}
                        onClick={() => handlePaginated(pag)}>
                        {pag}
                    </button>)
                })}
            </div> */}
        </div>
    );
};

export default Home;
