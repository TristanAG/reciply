import Layout from '../components/layout'
import { FirebaseContext } from '../firebase'

export default function About() {
  const { firebase, user } = React.useContext(FirebaseContext)

  return (
    <Layout>
      {user ?
        <div className="content">
          <h3>My Recipes </h3>
          <p>{user.displayName}</p>
        </div>
        :
        <div className="content">
          <h3>My Recipes </h3>
          <p>please login</p>
        </div>
      }
    </Layout>
  )
}
