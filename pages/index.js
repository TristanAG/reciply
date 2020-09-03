import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import useAuth from '../components/auth/useAuth'

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
              Full featured social / lifestyle recipe app MVP
            </p>
            <ul>
              <li>Find great recipes that fit your preferences</li>
              <li>Create, store, and share your own recipes</li>
              {/* i just thought of something
                  this could be a little tool for people to pass recipes around. you could login, and you can generate a custom recipe url to share with friends
                */}
              <li>Assign recipes to days of the week to generate a meal plan (react drag'n'drop)</li>
              <li>Automatically generated shopping lists to easily buy the groceries you need for your meal plan</li>
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
