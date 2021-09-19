import Link from 'next/link'
import { FirebaseContext } from '../firebase'
import { useState } from 'react'

export default function Header({ title }) {

  const { user, firebase } = React.useContext(FirebaseContext)
  const [dropDownState, setDropdownState] = useState(false)

  return (

    <header>

      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="content">
          <div className="navbar-brand">
              <Link href="/">
                <a className="navbar-item">
                  <p className="logo">{title}</p>
                  {/* <p className="logo" style={{"color":"#338a4c"}}>{title}</p> */}
                </a>
              </Link>

              <a role="button" className={dropDownState === true ? "navbar-burger burger is-active" : "navbar-burger burger"} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setDropdownState(!dropDownState)}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
          </div>
        </div>

        <div id="navbarBasicExample" className={dropDownState === true ? "navbar-menu is-active" : "navbar-menu"}>
          {/* <div className="navbar-start">

          </div> */}

          {/* <center> */}
              {/* <div className="inner"> */}
                <Link href="/create-recipe">
                  <a className="navbar-item has-text-grey">
                    <span>New Recipe</span>
                  </a>
                </Link>
                <Link href="/my-recipes">
                  <a className="navbar-item has-text-grey">
                    <span>My Recipes</span>
                  </a>
                </Link>
                <Link href="/meal-planner">
                  <a className="navbar-item has-text-grey">
                    <span>Meal Planner</span>
                  </a>
                </Link>
                <Link href="/shopping-list">
                  <a className="navbar-item has-text-grey">
                    <span>Shopping List</span>
                  </a>
                </Link>
              {/* </div> */}
          {/* </center> */}

          <div className="navbar-end end-mod">
            <div className="navbar-item">
              {user ? (
                <>
                  <a className="button is-light" onClick={() => firebase.logout()}>
                    {user && '@ ' + user.displayName.split(' ').join('').toLowerCase()}
                    {/* login toggle */}
                  </a>
                </>
              ) : (
                  <span className="login-button">
                    <Link href="/sign-up">
                      <a className="button is-link is-light"><strong>Sign up</strong></a>
                    </Link>
                    &nbsp;
                    <Link href="/login">
                      <a className="button is-light">
                        Log in
                      </a>
                    </Link>
                  </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`

        nav {
          box-shadow:   0 0.5em 1em -0.125em rgb(10 10 10 / 2%), 0 0 0 1px rgb(10 10 10 / 2%);
        }

        .greeting {
          margin-right: 12px;
        }
        .navbar-brand {
          height: 20px;

        }
        .navbar-item {
          text-align: right;
        }
        .inner {
          margin-top:4px;
        }
        .end-mod {
          // padding-top: 4px;
          margin-top: -2px;
        }
        .mobile-mod {
          display: block;
        }

        .login-button {
          text-align: right;
        }

        @media (min-width: 1024px) {
          .navbar-brand {
            margin-top: 10px;

          }
        }

      `}</style>

    </header>

  )
}
