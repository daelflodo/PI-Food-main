const axios = require('axios')
const { API_KEY } = process.env

const mapApi = async()=>{
    const apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const mapRecipes = await apiData.data.results.map(element =>{
        return{
            id: element.id,
            name: element.title,
            diets: element.diets,
            image: element.image,
            summary: element.summary,
            healthScore: element.healthScore,
            steps: element.analyzedInstructions,
            created: false,//para filtrar si es de la Api o creado en la BD
        }
    })
    return mapRecipes
}
module.exports = mapApi