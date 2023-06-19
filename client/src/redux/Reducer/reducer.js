import{ GET_ALL_RECIPES,GET_ALL_DIET ,GET_RECIPE_DETAIL,GET_RECIPE_NAME,POST_RECIPES, ORDER_RECIPES_SCORE,ORDER_NAME,FILTER_DIET,FILTER_CREATED } from '../actions/actions-types'

const initialState = { 
    recipes: [],
    allRecipes: [],
    diets: [],
    details: [],
}
const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_RECIPES:
            // console.log('paylo reduce:',payload);
            return {
                ...state,
                recipes: payload,
                allRecipes:payload,
                // page: state.page < payload.length ? state.page : 1
            }
            case GET_RECIPE_DETAIL:
            return {
                ...state,
                detail: payload,
            }
            case GET_ALL_DIET:
            return {
                ...state,
                diets: payload,
            }
            case GET_RECIPE_NAME: 
                return {
                  ...state,
                  recipes: payload,
                //   page: state.page < payload.length ? state.page : 1,
                };
            case POST_RECIPES:
                return{
                    ...state,
                    recipes:[...state.recipes, payload]
                    // recipes: payload
                }
            case ORDER_RECIPES_SCORE:
                 const sortRecipeScore=[...state.recipes]
                return {
                ...state, 
                recipes: 
                payload === 'Ascendente'
                    ? sortRecipeScore.sort((a, b) => a.healthScore - b.healthScore)
                    : sortRecipeScore.sort((a, b) => b.healthScore - a.healthScore),//si no descendente
                // currentPag: 0
                }
            case ORDER_NAME:
                const sortRecipeAlphabet=[...state.recipes]
                return {
                    ...state,
                    recipes: payload === 'A-Z'
                    ? sortRecipeAlphabet.sort((a, b) => a.name.localeCompare(b.name))
                    : sortRecipeAlphabet.sort((a, b) => b.name.localeCompare(a.name)),
                    allRecipes: payload === 'A-Z'
                    ? [...state.allRecipes.sort((a, b) => a.name.localeCompare(b.name))]
                    : [...state.allRecipes.sort((a, b) => b.name.localeCompare(a.name))],
                }    
            case FILTER_DIET:
                // state.recipes = state.allRecipes
                const filterRecipeDiet=[...state.allRecipes]
                // console.log('paylo: ', payload);
                // console.log('filter: ', filterRecipeDiet);
                return{
                    ...state,
                    //filtra filterRecipeDiet y devuelve los elementos 
                    //cuya propiedad diets contiene al menos un valor igual a la diet q viene por payload.
                    recipes:filterRecipeDiet.filter((recip) => recip.diets.includes(payload))
                }
            case FILTER_CREATED:
                const allRecipes= state.allRecipes
                const filterCreated =  payload === 'db' 
                    ?allRecipes.filter(recip => recip.created === true)
                    :allRecipes.filter(recip => recip.created === false)
                return{
                    ...state,
                recipes: payload === 'All Recipe' ? state.allRecipes : filterCreated 
                   
                }     
        default:
            return { ...state }
    }
}

export default rootReducer
// import { GET_RECIPES } from "./actions-types";
// export const initialState = {
//     recipes: [],
//     allRecipes : [],
//     data : [],
//     typediets :[]
// }

// function rootReducer (state=initialState, action) {
//     switch(action.type) {
//         case GET_RECIPES:
//             return {
//                 ...state,
//                 recipes: action.payload, 
//                 allRecipes: action.payload,
                
      //      }
    //     case 'NEW_API':
    //         return {
    //             ...state,
    //             recipes: action.payload, 
    //             allRecipes: action.payload,
    //         }    
    //     case 'FILTER_BY_TYPEDIET':
    // const allRecDiet = state.allRecipes
    // const typeDietFilter = allRecDiet.filter((recipes) => {
    //     return recipes.diets && recipes.diets.includes(action.payload);
    // });
    // return{
    //     ...state,
    //     recipes: action.payload === 'All'? allRecDiet : typeDietFilter
    // }

    // case 'FILTER_CREATED':
    //     const allRecipes = state.allRecipes
    //     const createdFilter = action.payload === 'created' ?  allRecipes.filter(el => el.createdInDB) : allRecipes.filter(el=> !el.createdInDB)
    //     return {
    //         ...state,
    //         recipes: action.payload === 'All' ? state.allRecipes : createdFilter
    //     }
        

    //     case 'ORDER_BY_NAME' :
    //         let order = action.payload === 'asc' ? 
    //         state.recipes.sort(function(a,b) {
                
    //             if(a.name.toLowerCase() > b.name.toLowerCase()) {
                
    //                 return 1
    //             }
    //             if( b.name.toLowerCase() > a.name.toLowerCase()){
    //                 return -1
    //             }
    //             return 0
    //         }) : 
    //         state.recipes.sort(function(a,b) {
    //             if(a.name.toLowerCase() > b.name.toLowerCase()) {
    //                 return -1
    //             }
    //             if( b.name.toLowerCase() > a.name.toLowerCase()){
    //                 return 1
    //             }
    //             return 0
    //         })
    //         return{
    //             ...state,
    //             recipes : order

    //     }

    //     case 'ORDER_BY_PUNTUATION' : 
    //     let orderpunt = action.payload === 'menormayor' ? 
    //         state.recipes.sort(function(a,b) {
    //             if(a.healthScore > b.healthScore) {
    //                 return 1
    //             }
    //             if( b.healthScore > a.healthScore){
    //                 return -1
    //             }
    //             return 0
    //         }) : 
    //         state.recipes.sort(function(a,b) {
    //             if(a.healthScore > b.healthScore) {
    //                 return -1
    //             }
    //             if( b.healthScore > a.healthScore){
    //                 return 1
    //             }
    //             return 0
    //         })
    //         return{
    //             ...state ,
    //             recipes : orderpunt
    //     }
    //     case 'GET_BY_NAME':
    //         return {
    //             ...state,
    //             recipes: action.payload,
    //         }
    //     case 'GET_BY_ID':
    //         return{
    //             ...state,
    //             data: action.payload
    //         }
    //     case 'POST_RECIPE':
    //             return{
    //                 ...state,
    //             }
    //     case 'GET_TYPE_DIETS':
    //         return {
    //             ...state,
    //             typediets : action.payload
    //         }        
    //     case 'DELETE_RECIPE':
    //         return{
    //             ...state,
    //         }
    //     // case PUT_RECIPE:
    //     //     return{
    //     //         ...state,
    //     //     }
//         default:
//             return state;
//     }
// }

// export default rootReducer;