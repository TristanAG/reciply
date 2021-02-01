import '../styles/global.css'
import 'bulma/css/bulma.min.css'
import useAuth from '../components/auth/useAuth'
import firebase, { FirebaseContext } from '../firebase'
import { RecipeProvider } from '../components/RecipeContext'

// function doSomething() {
//   return 'doin thangs'
// }

const fartSound = "bfrfff!"

export default function App({ Component, pageProps }) {
  const user = useAuth()
  // console.log({ user })
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <RecipeProvider>
        <Component {...pageProps} />
      </RecipeProvider>
    </FirebaseContext.Provider>
  )
}
