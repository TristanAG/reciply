import '../styles/global.css'
import 'bulma/css/bulma.min.css'
import useAuth from '../components/auth/useAuth'
import firebase, { FirebaseContext } from '../firebase'
import { RecipeProvider } from '../components/RecipeContext'

export default function App({ Component, pageProps }) {
  const user = useAuth()
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <RecipeProvider>
        <Component {...pageProps} />
      </RecipeProvider>
    </FirebaseContext.Provider>
  )
}
