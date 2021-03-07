import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import useAuth from '../components/auth/useAuth'
import RecipeList from '../components/recipeList'
import UserContext from '../contexts/UserContext'


import Date from '../components/date'

export default function Home({ allPostsData }) {

  const { userInfo, setUserInfo } = React.useContext(UserContext)
  console.log('home here now')
  console.log(userInfo)


  // console.log('looky here')
  // if (userInfo) {
  //   console.log(userInfo.name)
  // }

  // console.log(userInfo)
  //^^ no not working at all here... i really gotta figure out what's up with this context stuff this time...
  // console.log('check it out')
  // const user = useAuth()
  //
  // if(user) {
  //   alert('do something with ' + user.uid)
    //set the context here... right?
    //does that mean i have to create a context elsewhere, and then just update that context here ?
      //yes that seems like the right idea
    //2 i also need to bring in my firebase instance
    //actually i should probably just do this in _app.js strait up
  // }


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main>

        <section class="section">
          <div class="container">
            <p class="subtitle">
              All Recipes
              {userInfo && <b>{userInfo.savedRecipes}</b>}
            </p>
            <RecipeList listContext={"all"}/>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
