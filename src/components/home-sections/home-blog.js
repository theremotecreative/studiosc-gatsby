import React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage } from "gatsby-plugin-image"

const HomeBlogSection = () => {

    const data = useStaticQuery(graphql`
        query {
            queryContent: allWpPost(limit:6) {
                nodes {
                    title
                    uri
                    featuredImage {
                        node {
                            title
                            localFile {
                                childImageSharp {
                                    gatsbyImageData (
                                        width: 600
                                        placeholder: BLURRED
                                        formats: [AUTO, WEBP, AVIF]
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    const blogMap = data.queryContent.nodes

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
                        <Link to={`/blog${post.uri}`} itemProp="url">
                            <GatsbyImage image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={post.featuredImage.node.title} />
                            <h3 dangerouslySetInnerHTML={{ __html: post.title}} itemProp="headline"/>
                        </Link>
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
            grid-column-gap: 20px;
            grid-row-gap: 40px;
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
                    height: 300px;
                }
            }
        }
    }
    
`

export default HomeBlogSection