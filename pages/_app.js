import '../styles/global.css'
import 'bulma/css/bulma.min.css'
import useAuth from '../components/auth/useAuth'
import firebase, { FirebaseContext } from '../firebase'
import RecipeContext, { doSomething } from '../components/RecipeContext'

// function doSomething() {
//   return 'doin thangs'
// }

const fartSound = "bfrfff!"

export default function App({ Component, pageProps }) {
  const user = useAuth()
  // console.log({ user })
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <RecipeContext.Provider value={{ doSomething, fartSound }}>
        <Component {...pageProps} />
      </RecipeContext.Provider>
    </FirebaseContext.Provider>
  )
}
