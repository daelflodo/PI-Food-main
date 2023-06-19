const { Recipe, Diet } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env;
const mapApi = require('../utils/getData')
const { Op } = require('sequelize')

//esta funcion puede interactual con el modelo
//va ser una funcion async pq trabaja con los metodos del models y estos metodos manejan promesas
//los metodos de los modelos siempre dan una promesa   
// es llamada por createRecipesHandler
const createRecipe = async (name, image, summary, healthScore, steps, diets) => {
    // console.log('viene por body', name, image, summary, healthScore, steps, diets);
    if (!name) throw Error('The name undefined')
    const newRecipe = await Recipe.create({ name, image, summary, healthScore, steps, diets })
    for (let i = 0; i < diets.length; i++) {
        const dietdb = await Diet.findOne({
            where: {
                name: diets[i]
            }
        })
        newRecipe.addDiet(dietdb)
    }
    return newRecipe;
}

const getRecipebyId = async (id, sourceId) => {
    // console.log('id de control', id);
    // console.log('Source Id control:', sourceId);
    let result, recipeById;
    if (sourceId === 'API') {
        result = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
        // result = (await axios.get(`http://localhost:8080/recipes/${id}/information?apiKey=${API_KEY}`)).data

         recipeById = {
            id: result.id,
            name: result.title,//API
            image: result.image,
            summary: result.summary,
            healthScore: result.healthScore,
            steps: result.analyzedInstructions[0]?.steps?.map((ste) => ste.step ) || [],//API 
            diets: result.diets,
        }
        
    } else {
        const data = await Recipe.findOne({where:{id},
            include: {
              model: Diet,
              attributes: ["name"],
              through: {
                attributes: []
              }
            }})
            // console.log('json:', data.toJSON());// acomoda el json con tus propiedades
            // console.log('data contr', result);
            // result = await data;
            result = await data.toJSON();//
            recipeById = {
            id: result.id,
            name: result.name,//DB
            image: result.image,
            summary: result.summary,
            healthScore: result.healthScore,
            steps: result.steps,//DB
            diets:result.diets?.map(ele=>ele.name) 
        }
    }
    // console.log('result control:', result);
    // console.log('result control por valor:', result.name);

    // console.log('recipe por id control',recipeById);
    return recipeById
}

// const getRecipebyId = async (id, sourceId) => { 
//      console.log('id de control',id);
//      console.log('Source Id control:', sourceId);
//     const result = sourceId === 'API'
//         ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
//         : await Recipe.findByPk(id)
//         console.log('result control:' ,result.dataValues);
//     const recipeById = {
//         id: result.id,
//         name: result.name,//DB
//         name: result.title,//API
//         image: result.image,
//         summary: result.summary,
//         healthScore: result.healthScore,
//         steps: result.steps,//DB
//         steps: result.analyzedInstructions[0]?.steps?.map(ste=>ste.step) || [],//API
//         diets: result.diets,
//         // diets: result.diets

//     }
//     // console.log(recipeById);
//     return recipeById
// }
const getAllRecipes = async () => {
    // buscar en db 
    //buscar en api
    //unificar
    console.log("algo ");
    const dbRecipes = await Recipe.findAll(
        {
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        }
    )
    // console.log('dbRecipes ', dbRecipes.toJSON());

    const formattedRecipe = dbRecipes.map(recipe => ({
        ...recipe.toJSON(),//...recipe.toJSON(),
        diets: recipe.diets.map(diet => diet.name)
    }));
    // console.log('formattedRecipe ', formattedRecipe);
    // const apiRecipesAll = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const apiRecipes = await mapApi() //hago el llamado de la funcion q mapea la data de la api
    console.log('api recipes control:',apiRecipes);
    // return [...dbRecipes, ...apiRecipes]
    return [...formattedRecipe, ...apiRecipes]
    // return [...apiRecipes]
}
// console.log('nombre: ',name);
const searchRecipesByName = async (name) => {
    const dbRecipes = await Recipe.findAll({
        where: {
            name: { [Op.iLike]:`%${name}%`}//% se utiliza como un comodín para permitir espacios antes o después del nombre.
        },include: {//Se especifica que solo se deben incluir los atributos "name" de la tabla "Diet"
            model: Diet,
            attributes: ["name"],
            through: {//se indica que no se deben incluir los atributos de la tabla de unión entre "Recipe" y "Diet".
              attributes: []
            }} 
    })

    // const dbRecipes = await Recipe.findAll({
    //     where: {
    //         name: {
    //             [Op.iLike]: `%${name}%`
    //         }
    //     }
    // });
    // console.log('db recip control',dbRecipes);

    // console.log('receta: ',!Object.keys(dbRecipes).length);
    // if(dbRecipes.length){
    //     console.log('no soy');
    //     // dbRecipes=await Recipe.findAll()
    // }
    //busca en la Api 
    const apiRecipes = await mapApi()
    console.log('dta control: ',apiRecipes);
    const includesApiRecipes = await apiRecipes.filter((element) =>
        element.name.toLowerCase().includes(name.toString().toLowerCase())
    )
    // console.log('receta api: ',includesApiRecipes[0]);
    if (!includesApiRecipes[0]) return res.status(404).json({ error: "La receta no existe." });
    return [...dbRecipes, ...includesApiRecipes]
}
module.exports = {
    createRecipe,
    getRecipebyId,
    searchRecipesByName,
    getAllRecipes
};