

const validation = (recipe) => {
    const errors = {}
    if (!recipe.name) {
        errors.name = 'Ingrese un titulo!'
    }
    if (!recipe.summary) {
        errors.summary = 'El resumen esta vacio'
    }
    if (/[^0-9]/.test(recipe.healthScore)) {
        errors.healthScore = 'No se permiten caracteres ingrese un numero'
    }
    if (recipe.healthScore < 0 || recipe.healthScore > 100) {
        errors.healthScore = 'ingrese un valor entre 0 y 100'
    }
    if (!recipe.healthScore) {
        errors.healthScore = 'El puntaje de salud esta vacio'
    }
    if (!recipe.steps) {
        errors.steps = 'Introduza los pasos de preparacion'
    }
    if (!recipe.image) {
        errors.image = 'Introduzca una url para la imagen'
    }
    if (!recipe.diets.length) {
        errors.diets = 'Introduzca al menos una dieta'
    }
    // if(listDiets.includes(recipe.diets)){ // trampita
    //     errors.diets = 'La dieta no existe '
    // }
    return errors;
}
export default validation