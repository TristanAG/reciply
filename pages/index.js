import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import useAuth from '../components/auth/useAuth'
import RecipeList from '../components/recipeList'

import Date from '../components/date'

export default function Home({ allPostsData }) {
  // const user = useAuth()
  // console.log({ user })
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
