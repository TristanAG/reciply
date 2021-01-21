import Layout from '../../components/layout'
import Firebase from '../../firebase/firebase'


export default function Recipe(props) {
  // const { firebase, user } = React.useContext(FirebaseContext)
  return (
    <Layout>
      {props.name}
    </Layout>
  )
}


export async function getStaticProps(context) {

  const recipesCollection = Firebase.db.collection('recipes')
  const query = recipesCollection.where("href", "==", context.params.name).get().then(function(querySnapshot) {

    const snapshot = querySnapshot.docs[0];
    const data = snapshot.data();
    console.log('data')
    console.log(data)

    return {
      props: {
        name: data.name
      }  // will be passed to the page component as props
    }
  })
}


export async function getStaticPaths() {
  return {
    paths: [
      { params: {name: 'href'} }
    ],
    fallback: true
  }
}



//
//
//
//
// function getSingleRecipe() {
//   const recipe = firebase.db.collection('recipes')
//   const query = recipe.where("name", "==", "new recipe").get().then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//           // doc.data() is never undefined for query doc snapshots
//           console.log(doc.id, " => ", doc.data());
//       });
//   })
//
// }
