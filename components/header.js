import Link from 'next/link'

export default function Header({ title }) {

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <b className="has-text-success">{title} 🥑</b>
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
                <a className="navbar-item">
                  My Recipes
                </a>
                <a className="navbar-item">
                  Add Recipe
                </a>
                <a className="navbar-item">
                  Contact
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link href="/login">
                  <a className="button is-primary"><strong>Sign up</strong></a>
                </Link>
                <a className="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>


      <style jsx>{`
        .logo {
          color: #568203;
        }
      `}</style>

    </header>
  )
}
