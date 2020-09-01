import Link from 'next/link'

export default function Header({ title }) {
  
  return (
    <header>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
            <b>{title} 🥑</b>
          </a>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Browse
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Recipes
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  My Recipes
                </a>
                <a class="navbar-item">
                  Add Recipe
                </a>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider" />
                <a class="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <Link href="/login" morty="hey its me morty">
                  <a class="button is-primary"><strong>Sign up</strong></a>
                </Link>
                <a class="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
