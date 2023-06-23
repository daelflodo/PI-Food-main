import axios from 'axios'
import { GET_ALL_RECIPES, GET_ALL_DIET, GET_RECIPE_DETAIL, ORDER_RECIPES_SCORE, GET_RECIPE_NAME,ORDER_NAME,POST_RECIPES,FILTER_DIET, FILTER_CREATED, } from './actions-types'
//obtengo todas las recetas para mostrar al iniciar el home las primeras 9 recetas con el paginado

export const getAllRecipes = () => {
    return async function (dispatch) {
        try {
            const dataRecipe = await axios.get('http://localhost:3001/recipes')
            return dispatch({
                type: GET_ALL_RECIPES,
                payload: dataRecipe.data//--
            })
        } catch (error) {
            alert('Error:',error)
        }
    }
}

//obtengo recetas por id---📍GET | /recipes/:idRecipe
export const getRecipeDetail = (id) => {
    console.log('id de actions',id);
    return async function (dispatch) {
        try {
            const dataRecipe = await axios.get('http://localhost:3001/recipes/'+id)
            return dispatch({
                type: GET_RECIPE_DETAIL,
                payload: dataRecipe.data//--
            })
        } catch (error) {
            alert('El id de la receta no existe')
            // console.log(error.message);
        }
    }
}

//obtengo todas las dietas---📍 GET | /diets
export const getAllDiet = () => {
    return async function (dispatch) {
        try {
            const dataDiet = await axios.get('http://localhost:3001/diet')
            return dispatch({
                type: GET_ALL_DIET,
                payload: dataDiet.data//---
            })
        } catch (error) {
            alert('Error:',error)
        }
    }
}
// export const postRecipes = (data) => {
//     return {type:'POST_RECIPES', payload: data}
// }

export function postRecipes (payload){
    return async function(dispatch){
       try {
         await axios.post("http://localhost:3001/recipes/",payload);
        // console.log(dataRecipe);
        return dispatch({
            type:POST_RECIPES,
            payload:payload
        })
        
       } catch (error) {
        alert(error.response.data)
       }
    }
}

//obtengo las recetas buscadas por nombre---📍 GET | /diets
export const searchRecipesByName = (name) => {
    return async function (dispatch) {
        try {
            const dataRecipe = await axios.get('http://localhost:3001/recipes/?name=' + name)
            return dispatch({
                type: GET_RECIPE_NAME,
                payload: dataRecipe.data//--
            })
        } catch (error) {
            console.log(error.response);
            alert(error.response.data)
        }
    }
}

export const orderRecipesScore = (value) => {
    return {
        type: ORDER_RECIPES_SCORE, 
        payload: value
    }
}

export const OrderName = (value) => {
    return {
        type: ORDER_NAME, 
        payload: value
    }
}
export const filterRecipesDiet = (value) => {
    return{
        type: FILTER_DIET,
        payload:value
    }
}
export const filterCreated = (value) => {
    return {
        type: FILTER_CREATED,
        payload: value
    }
}


