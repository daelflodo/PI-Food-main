const { createRecipe, getRecipebyId, searchRecipesByName, getAllRecipes } = require('../controllers/RecipeController')
const Recipe = require('../models/Recipe')
const { Diet } = require('../db')
// const { search } = require('../routes')




const getRecipebyIdHandler = async (req, res) => {
    const { id } = req.params//GKUYGJGV-54GHGFG-GDFG
    // console.log('id de handle',id);
    const sourceId = isNaN(id) ? 'DB' : 'API'
    // console.log('Source Id handle:', sourceId);
    try {
        const recipe = await getRecipebyId(id, sourceId);
        console.log('recipe:', recipe);
        res.status(200).json(recipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    // res.send(`Dael: Esta ruta obtiene el detalle de la receta con id: ${id}`)
}
const getRecipesHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const resultRecipes = name ? await searchRecipesByName(name) : await getAllRecipes(); //res.status(400).send('no hay concidencia en la busquedad');
        if (!Object.keys(resultRecipes[0]).length) throw new Error('Recipe Not Found')
        return res.status(200).json(resultRecipes)
    } catch (error) {
        return res.status(405).send(Error.message)
    }
}

//ruta post para crear recipes recibe body del formulario
const createRecipesHandler = async (req, res) => {
    const { name, image, summary, healthScore, steps, diets } = req.body
    //colocamos un try catch en esta pocicion y resuelve el error q podria retornar el controller
    // console.log('bodyy ',req.body);
    try {
        const newRecipe = await createRecipe(name, image, summary, healthScore, steps, diets)
        if (!diets[0]) throw Error('La receta debe tener al menos un tipo de dieta')
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}
module.exports = {
    getRecipebyIdHandler,
    getRecipesHandler,
    createRecipesHandler
}