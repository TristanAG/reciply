import Layout from '../components/layout'
import Firebase from '../firebase/firebase'
import { FirebaseContext } from '../firebase'

export default function ShoppingList() {

  const { user, firebase } = React.useContext(FirebaseContext)

  return (
    <Layout>
      <>
        <div className="content">
          <h3>Shopping List</h3>
        </div>
      </>

      <style jsx>{`
      `}</style>
    </Layout>
  )
}
