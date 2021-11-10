import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"
import styled from 'styled-components'

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout-v2"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <PostMain>
          <header>
            <h1 itemProp="headline">{parse(post.title)}</h1>

            <p>{post.date}</p>

            {/* if we have a featured image for this post let's display it */}
            {featuredImage?.fluid && (
              <Image
                fluid={featuredImage.fluid}
                alt={featuredImage.alt}
                style={{ marginBottom: 50 }}
              />
            )}
          </header>

          {!!post.content && (
            <section itemProp="articleBody">{parse(post.content)}</section>
          )}
        </PostMain>
      </article>

    </Layout>
  )
}

const PostMain = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 3rem;
  margin: 0 auto;
  h1 {
    font-family: Roboto;
    font-size: 32px;
    font-weight: 300;
    line-height: 1.4;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 100%;
  }
`

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
