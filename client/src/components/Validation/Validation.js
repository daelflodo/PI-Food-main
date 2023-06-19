
const validation = (recipe)=>{
    const errors={}
    // if(!/\S+@\S+\.\S+/.test(recipe.email)){
    //    errors.email='ingresa correctamente el email' 
    // }
    if (!recipe.name) {
        errors.name='No puede estar vacio! ingrese un titulo'
    }
    if (!recipe.summary) {
        errors.summary='No puede estar vacio! ingrese un resumen'
    }
    if (/[^0-9]/.test(recipe.healthScore)) {
        errors.healthScore='No se permiten caracteres'
    }
    if(recipe.healthScore<0|| recipe.healthScore>100){
        errors.healthScore='ingrese un valor entre 0 y 100'
    }
    if(!recipe.healthScore){
        errors.healthScore='Health Score esta vacio'
    }
    if(!recipe.steps){
        errors.steps='Steps esta vacio'
    }
    if(!recipe.image){
        errors.image='Introduzca el url'
    }
    // else errors.password=''
    // if (!recipe.diets[0]) {
    //     errors.diets='Debe elijir al menos un tipo de dieta'
    // }

    return errors;
}
export default validation