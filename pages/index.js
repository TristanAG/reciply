import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import useAuth from '../components/auth/useAuth'
import RecipeList from '../components/recipeList'

import Date from '../components/date'

export default function Home({ allPostsData }) {


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
