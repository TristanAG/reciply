import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Header from './header'

const name = 'plantbase 🌱'
export const siteTitle = 'plantbase 🌱'

export default function Layout({ children, home }) {
  return (
    <div className="container">

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="chill.recipes"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />

        <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap"
            />
        </noscript>
      </Head>

      <Header title={siteTitle}/>

      <main>{children}</main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          main {
            padding-left: 6px;
            padding-right: 6px;
          }
        }

      `}</style>
    </div>
  )
}
