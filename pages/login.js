import Layout from '../components/layout'

export default function login() {
  const [login, setLogin] = React.useState(true)

  return (
    <Layout>
      <div>
        <h2>{login ? "login page" : "create account"}</h2>
        <form>
          {!login && <input type="text" placeholder="Your name" autocomplete="off" />}
          <br />
          <input type="email" placeholder="Your email" autocomplete="off" />
          <br />
          <input type="password" placeholder="Choose a secure password" autocomplete="off" />
        </form>
        <div>
          <button type="submit"> submit </button><br />
          <button type="button" onClick={() => setLogin(prevLogin => !prevLogin)}> {login ? "need to create an account?" : "already have an account?"}</button>
        </div>
      </div>
    </Layout>
  )
}
