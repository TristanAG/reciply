import React from 'react'
import Layout from '../../components/layout'
import Firebase from '../../firebase/firebase'
import Link from 'next/link'

export default function Recipe({ recipe }) {
  // const { firebase, user } = React.useContext(FirebaseContext)

  return (
    <Layout>
      <div class="content">
        <h1>{recipe.name}</h1>
        <div className="button is-dark">Save Recipe?</div>
        <p>//description goes here...</p>
        <h2>Instructions</h2>
        <p>{recipe.steps}</p>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li>{ingredient.ingredientName} <small><i className="has-text-info">{ingredient.ingredientQuantity}</i></small></li>
          ))}
        </ul>

      </div>
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
