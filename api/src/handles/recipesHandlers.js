const { createRecipe, getRecipebyId, searchRecipesByName, getAllRecipes } = require('../controllers/RecipeController')
const Recipe = require('../models/Recipe')
const { Diet } = require('../db')
// const { search } = require('../routes')




const getRecipebyIdHandler = async (req, res) => {
    const { id } = req.params//GKUYGJGV-54GHGFG-GDFG
    const sourceId = isNaN(id) ? 'DB' : 'API'
    try {
        const recipe = await getRecipebyId(id, sourceId);
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
        if (!Object.keys(resultRecipes[0]).length) throw Error('Recipe Not Found')
        return res.status(200).json(resultRecipes)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
    // else res.send(`Quiero buscar todos las recetas`)

    // res.send('Dael:Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query.s')
}

const createRecipesHandler = async (req, res) => {
    //colocamos un try catch en esta pocicion y resuelve el error q podria retornar el controller
    const { name, image, summary, healthScore, steps, diets } = req.body
    try {
        const newRecipe = await createRecipe(name, image, summary, healthScore, steps, diets)
        if(!diets[0]) throw Error('La receta debe tener al menos un tipo de dieta') 

        res.status(201).json(newRecipe)
        // res.send('Dael: Esta ruta recibirá todos los datos necesarios para crear una nueva receta y relacionarla con los tipos de dieta solicitados.')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    getRecipebyIdHandler,
    getRecipesHandler,
    createRecipesHandler
}