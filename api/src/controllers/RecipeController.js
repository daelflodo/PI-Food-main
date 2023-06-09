const { Recipe, Diet } = require('../db')
const axios = require('axios')
const { API_KEY} = process.env;
const mapApi = require('../utils/getData')
const { Op } = require('sequelize')

//esta funcion puede interactual con el modelo
//va ser una funcion async pq trabaja con los metodos del models y estos metodos manejan promesas
//los metodos de los modelos siempre dan una promesa   

const createRecipe = async (name, image, summary, healthScore, steps, diets) => {
    const newRecipe = await Recipe.create({ name, image, summary, healthScore, steps, diets })
    // console.log(newRecipe);
    for (let i = 0; i < diets.length; i++) { 
        const dietdb = await Diet.findOne({ where: { name: diets[i] } })
        newRecipe.addDiet(dietdb)
    }
    return newRecipe;
}

const getRecipebyId = async (id, sourceId) => {
    const result = sourceId === 'API'
        ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
        : await Recipe.findByPk(id)
    const recipeById={
        name: result.name,//DB
        name: result.title,//API
        image: result.image,
        summary: result.summary,
        healthScore: result.healthScore,
        steps: result.steps,//DB
        steps: result.analyzedInstructions,//API
        // diets: result.diets
        
    }
    console.log(recipeById);
    return recipeById
}
const getAllRecipes = async () => {
    // buscar en db 
    //buscar en api
    //unificar
    const dbRecipes = await Recipe.findAll()
    // const apiRecipesAll = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const apiRecipes = await mapApi() //hago el llamado de la funcion q mapea la data de la api

    return [...dbRecipes, ...apiRecipes]
}
const searchRecipesByName = async (name) => {
    const dbRecipes = await Recipe.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
    // const apiRecipesAll = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const apiRecipes = await mapApi()
    const includesApiRecipes = await apiRecipes.filter((element) =>
        element.name.toLowerCase().includes(name.toString().toLowerCase())
    )
    return [...dbRecipes, includesApiRecipes]
}
module.exports = {
    createRecipe,
    getRecipebyId,
    searchRecipesByName,
    getAllRecipes
};