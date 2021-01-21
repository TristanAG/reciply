import Layout from '../../components/layout'
import Firebase from '../../firebase/firebase'


export default function Recipe({ recipe }) {
  // const { firebase, user } = React.useContext(FirebaseContext)
  return (
    <Layout>
      <h1>{recipe.name}</h1>
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






















// export async function getStaticProps(context) {
//
//   const recipesCollection = Firebase.db.collection('recipes')
//   const query = recipesCollection.where("href", "==", context.params.name).get().then(function(querySnapshot) {
//
//     const snapshot = querySnapshot.docs[0];
//     const data = snapshot.data();
//     console.log('data')
//     console.log(data)
//
//     return {
//       props: {
//         name: data.name
//       }  // will be passed to the page component as props
//     }
//   })
// }
//
//
// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: {name: 'href'} }
//     ],
//     fallback: true
//   }
// }
//
