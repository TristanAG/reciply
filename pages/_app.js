import '../styles/global.css'
import 'bulma/css/bulma.min.css'
import useAuth from '../components/auth/useAuth'
import firebase, { FirebaseContext } from '../firebase'
import { RecipeProvider } from '../components/RecipeContext'

export default function App({ Component, pageProps }) {
  const user = useAuth()

  let userInfo = null

  if (user) {
    console.log('s w i s h')
    console.log(user)

    var docRef = firebase.db.collection('users').doc(user.uid);
    docRef.get().then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      userInfo = doc.data()
      console.log(userInfo.savedRecipes)
    } else {
        // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  }

  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <RecipeProvider>
        <Component {...pageProps} />
      </RecipeProvider>
    </FirebaseContext.Provider>
  )
}
