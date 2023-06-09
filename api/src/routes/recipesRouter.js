const { Router } = require('express')
const recipesRouter = Router();
const {getRecipebyIdHandler, getRecipesHandler, createRecipesHandler} = require('../handles/recipesHandlers')


recipesRouter.get('/:id', getRecipebyIdHandler)
recipesRouter.get('/', getRecipesHandler)
recipesRouter.post('/',createRecipesHandler)

module.exports = recipesRouter