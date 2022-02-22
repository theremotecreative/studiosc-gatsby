import React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage } from "gatsby-plugin-image"

const HomeBlogSection = () => {

    const data = useStaticQuery(graphql`
    query {
        allWpHomeUpdate(limit: 6, sort: {fields: date, order: DESC}) {
          edges {
            node {
              title
              featuredImage {
                node {
                  title
                  localFile {
                    childImageSharp {
                      gatsbyImageData (
                          width: 800
                          placeholder: TRACED_SVG
                          formats: [AUTO, WEBP, AVIF]
                      )
                    }
                  }
                }
              }
              homeUpdateContent {
                linkNewTab
                homeUpdateLink
              }
            }
          }
        }
      }
    `)

    const blogMap = data.allWpHomeUpdate.edges

    return(

        <MainSection>
            <div class="main-row">
                <h2>Latest news and updates</h2>
                <div class="blog-grid">
                {blogMap.map(post => (
                    <article 
                    class="home-post"
                    itemScope
                    itemType="http://schema.org/Article"
                    >
                        {post.node.homeUpdateContent.linkNewTab ? (
                            <a href={post.node.homeUpdateContent.homeUpdateLink} target="_blank"  rel="noreferrer">
                                <GatsbyImage image={post.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={post.node.featuredImage.node.title} />
                                <h3 dangerouslySetInnerHTML={{ __html: post.node.title}} itemProp="headline"/>
                            </a>
                        ) : (
                            <Link to={post.node.homeUpdateContent.homeUpdateLink}>
                                <GatsbyImage image={post.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={post.node.featuredImage.node.title} />
                                <h3 dangerouslySetInnerHTML={{ __html: post.node.title}} itemProp="headline"/>
                            </Link>
                        )}
                    </article>
                ))}
                </div>
            </div>
        </MainSection>
        
    )

}

const MainSection = styled.section`
    padding: 30px;
    .main-row {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        h2 {
            font-family: Roboto;
            font-size: 32px;
            font-weight: 300;
            line-height: 1.4;
            margin-top: 40px;
            margin-bottom: 40px;
            width: 100%;
        }
        .blog-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-column-gap: 40px;
            grid-row-gap: 40px;
            transition-duration: .3s;
            article {
                a {
                    text-decoration: none;
                }
                h3 {
                    font-family: Roboto;
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 1.4;
                    margin-top: 10px;
                    margin-bottom: 30px;
                }
                .gatsby-image-wrapper {
                    height: auto;
                }
            }
        }
    }
    @media(max-width:1200px) {
        .main-row {
            max-width: 800px;
            .blog-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
    }
    @media(max-width:767px) {
        .main-row {
            max-width: 400px;
            .blog-grid {
                grid-template-columns: 1fr;
            }
        }
    }
`

export default HomeBlogSection