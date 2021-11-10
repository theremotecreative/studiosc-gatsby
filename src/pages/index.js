import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout-v2"
import Seo from "../components/seo"

import HeroSlider from "../components/home-sections/hero-slider"
import HomeBlog from "../components/home-sections/home-blog"
// import HomeTypologies from "../components/home-sections/home-typologies"

const IndexPage = ({ data: { queryContent } }) => {

    return(
        <Layout>
            <Seo 
            title={queryContent.seo.title} 
            description={queryContent.seo.metaDesc}
            metaImage={queryContent.seo.opengraphImage.localFile.childImageSharp.fluid}
            />
            <HeroSlider/>
            <HomeBlog />
        </Layout>
    )

}

export default IndexPage

export const pageQuery = graphql`
    query {
        queryContent: wpPage(databaseId: {eq: 224}) {
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
        }
    }
`