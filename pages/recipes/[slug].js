import React from 'react'
import Layout from '../../components/layout'
import Firebase from '../../firebase/firebase'
import RecipeContext from '../../components/RecipeContext'


export default function Recipe({ recipe }) {
  // const { firebase, user } = React.useContext(FirebaseContext)
  // const { fartSound, doSomething } = React.useContext(RecipeContext)
  const recipeContext = React.useContext(RecipeContext);


  recipeContext.setName(recipe.name)
  console.log('look')
  console.log(recipeContext.name)





  return (
    <Layout>
      <h1>{recipe.name}</h1>
      <h3>context: {recipeContext.name}</h3>
      <p>{recipe.steps}</p>
    </Layout>
  )
}


export const getStaticPaths = async () => {
  const recipes = await Firebase.db.collection('recipes').get()
  const paths = recipes.docs.map(recipe => ({

    params: {
      slug: recipe.data().slug
    }
  }));

  console.log(paths)

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const res = await Firebase.db.collection('recipes').where("slug", "==", slug).get()
  const recipe = res.docs.map(recipe => recipe.data());
  console.log('look')
  console.log(recipe)
  if (recipe.length) {
    return {
      props: {
        recipe: recipe[0]
      }
    }
  } else {
    return {
      props: {}
    }
  }
}
