import Layout from '../components/layout'
import Link from 'next/link'

export default function About() {
  return (
    <Layout>
      <p>Hey there - this site mainly serves as a development blog for my side projects. I work at <a href="http://www.nordicnaturals.com">Nordic Naturals</a> as a Magento 2 frontend developer.
        If you want to check out my professional stuff, please check my <a>LinkedIn</a></p>
      <p>I'm also a musician, I play guitar and make lofi music. I post my stuff to <a>Instagram</a></p>
      <p>Im passionate about programming and javascript, and my side projects are mostly based around React. Currently im working on a recipe app with Next.js and Firebase so
      my wife and I can streamline our meal planning called <a>chill.recipes</a></p>
    </Layout>
  )
}
