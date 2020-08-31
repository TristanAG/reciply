import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

import Date from '../components/date'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main>
        <section class="section">
          <div class="container">
            <p class="subtitle">
              Full featured social / lifestyle recipe app MVP
            </p>
            <ul>
              <li>Find Recipes</li>
              <li>Post Recipes</li>
              <li>Assign Recipes to calendar to generate a meal plan (react drag'n'drop)</li>
              <li>Automatically generated shopping lists</li>
            </ul>
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
