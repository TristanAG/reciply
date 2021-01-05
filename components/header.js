import Link from 'next/link'
import { FirebaseContext } from '../firebase'

export default function Header({ title }) {

  const { user, firebase } = React.useContext(FirebaseContext)
  console.log(user)

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <b >{title} 🍴</b>
            </a>
          </Link>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Browse
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Recipes
              </a>

              <div className="navbar-dropdown">
                <Link href="my-recipes"><a className="navbar-item">My Recipes</a></Link>
                <Link href="create-recipe"><a className="navbar-item">Add Recipe</a></Link>
                {/* <a className="navbar-item">Contact</a> */}
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {user ? (
                <>
                  <span className="greeting">hey 👋&nbsp; {user.displayName}</span>
                  <a className="button is-light" onClick={() => firebase.logout()}>
                    Log Out
                  </a>
                </>
              ) : (
                <div className="buttons">
                  <Link href="/login">
                    <a className="button is-primary"><strong>Sign up</strong></a>
                  </Link>
                  <a className="button is-light">
                    Log in
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>


      <style jsx>{`
        .logo {
          color: #568203;
        }
        .greeting {
          margin-right: 12px;
        }
      `}</style>

    </header>
  )
}
