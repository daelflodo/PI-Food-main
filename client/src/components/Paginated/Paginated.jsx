// import React from "react"
// import { useEffect } from "react"
// import style from '../Paginated/Paginated.module.css'


// const Paginated = ({ recipesByPag, allRecipes, handlePaginated , currentPag }) => {
//   // useEffect(() => {
//   //   paginated(1)
//   // }, [allRecipes])//cada vez que el valor de allRecipes cambie, se llamará a la función paginated(1)

//   const pageNumbers = []//almacenar los números de página
//   for (let i = 1; i <= Math.ceil(allRecipes.length / recipesByPag); i++) {
//     pageNumbers.push(i);
//   }

//   // const
//   return (
//      <nav className={style.container}>
//       {/* <ul > */}
//         {pageNumbers.map((pag) =>{
//           return(
//             // <li key={pag}>
//             <button
//               className={currentPag === pag ? "container current" : "container"}
//               onClick={() => handlePaginated (pag)}
//             >
//               {pag}
//             </button>
//           // </li>
//           )
//         })
//         }
//       {/* </ul> */}
//     </nav>
   
//   )
// }
// export default Paginated