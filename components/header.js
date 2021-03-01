import Link from 'next/link'
import { FirebaseContext } from '../firebase'
import { useState } from 'react'

export default function Header({ title }) {

  const { user, firebase } = React.useContext(FirebaseContext)
  const [dropDownState, setDropdownState] = useState(false)

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="content">
          <div className="navbar-brand">
              <Link href="/">
                <a className="navbar-item">
                  <p className="logo has-text-grey">{title}</p>
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
          <div className="navbar-start">

          </div>

          <center>
              <div className="inner">
                <Link href="/create-recipe">
                  <a className="navbar-item has-text-grey">
                    ➕&nbsp;&nbsp;<span style={{'textDecoration': 'underline'}}>New Recipe</span>
                  </a>
                </Link>
                <Link href="/my-recipes">
                  <a className="navbar-item has-text-grey">
                    👨‍🍳&nbsp;&nbsp;<span style={{'textDecoration': 'underline'}}>My Recipes</span>
                  </a>
                </Link>
                <a className="navbar-item has-text-grey">
                  📆️&nbsp;&nbsp;<span style={{'textDecoration': 'underline'}}>Meal Planner</span>
                </a>
                <a className="navbar-item has-text-grey">
                  🗒️&nbsp;&nbsp;<span style={{'textDecoration': 'underline'}}>Shopping List</span>
                </a>
              </div>
          </center>

          <div className="navbar-end end-mod">
            <div className="navbar-item">
              {user ? (
                <>
                  <a className="button is-light" onClick={() => firebase.logout()}>
                    {/* Log Out */}{user && '@ ' + user.displayName.split(' ').join('').toLowerCase()}
                  </a>
                </>
              ) : (
                  <span className="login-button">
                    <Link href="/login">
                      <a className="button is-primary"><strong>Sign up</strong></a>
                    </Link>
                    <a className="button is-light">
                      Log in
                    </a>
                  </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .logo {
          font-size: 28px;
          padding-top: 21px;
          padding-left: 10px;
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
          padding-top: 4px;
        }
        .mobile-mod {
          display: block;
        }

        .login-button {
          text-align: right;
        }

      `}</style>

    </header>
  )
}
