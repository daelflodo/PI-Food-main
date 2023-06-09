
const { Diet } = require('../db');
const mapApi = require('../utils/getData')
const { API_KEY } = process.env

const getDiet = async () => {
    // La primera línea del código declara una constante llamada apiInfo y utiliza la palabra clave await para esperar el resultado de la función getApiInfo(). Esto sugiere que getApiInfo() es una función asíncrona que devuelve una promesa. El uso de await asegura que la asignación a apiInfo espere a que la promesa se resuelva antes de continuar.

    const apiInfo = await mapApi();
    const diets = await apiInfo.map((element) => element.diets).flat();
    const allDiets = [];
 
    diets.forEach(diet => { 
        if (!allDiets.some(el => el.name === diet)) {// verificar si algún elemento en allDiets tiene el mismo nombre 
          allDiets.push({ name: diet });//sino encuentra ninguna dieta en el array hace un push con la dieta nueva
        }
      });

    // await Diet.bulkCreate(allDiets)
    for (const diet of allDiets) {
        await Diet.findOrCreate({
            where: {
                name: diet.name 
            } 
        });
    }
    return allDiets;
}

module.exports = getDiet