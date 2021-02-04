import React from 'react'
import { FirebaseContext } from '../firebase'
import RecipeItem from './recipeItem'
import Link from 'next/link'


export default function RecipeList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(() => {
    getRecipes()
  }, [])

  function getRecipes() {
    const theRecipes = firebase.db.collection('recipes').onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const recipes = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setRecipes(recipes)
  }

  return (
    <div>
      {recipes && recipes.map((recipe, index) => (
        <>
          {/* <Link href="/recipes/[recipe.name]" as={'/recipes/' + recipe.name.split(' ').join('-').toLowerCase()}> */}
            {/* <a> */}
              <RecipeItem
                key={recipe.id}
                showCount={true}
                recipe={recipe}
                index={index + 1}
              />
            {/* </a> */}
          {/* </Link> */}
          {/* <p className="has-text-primary" onClick={() => updateRecipeContext()}>edit</p> */}
        </>
      ))}

    </div>
  )
}

// export async function getStaticPaths() {
//
//   const paths = [
//     {
//       params: {
//         name: 'fart fart fart'
//       }
//     }
//   ]
//
//   return {
//     paths,
//     fallback: false
//   }
// }

export async function getStaticProps(name) {
  console.log(name)
  // const postData = getPostData(params.id)
  // return {
  //   props: {
  //     postData
  //   }
  // }
}
