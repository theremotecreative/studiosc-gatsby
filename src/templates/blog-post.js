import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import styled from 'styled-components'

import Layout from "../components/layout-v2"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data: { post } }) => {

  return (
    <Layout>
      <Seo 
      title={post.seo.title} 
      description={post.seo.metaDesc}
      metaImage={post.seo.opengraphImage.localFile.childImageSharp.fluid}
      />

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
            <GatsbyImage className={"slide-background"} image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={post.featuredImage.node.title} />
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
      seo {
        title
        metaDesc
        opengraphImage {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      featuredImage {
        node {
          title
          localFile {
            childImageSharp {
              gatsbyImageData (
                  width: 1000
                  placeholder: TRACED_SVG
                  formats: [AUTO, WEBP, AVIF]
              )
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
