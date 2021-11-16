import React from "react"
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from "../components/layout-v2"
import StudioMap from "../components/google-map"
import Seo from "../components/seo"

const ContactPage = ({ data: { queryContent } }) => {

    return(
        <Layout>
            <Seo 
            title={queryContent.seo.title} 
            description={queryContent.seo.metaDesc}
            metaImage={queryContent.seo.opengraphImage.localFile.childImageSharp.fluid}
            />
            <StudioRow>
                <StudioMap />

                <div class="contact-information">
                <h2>OFFICE</h2>
                <p>37 Greenpoint Avenue</p>
                <p>Brooklyn, NY 11222</p>
                <p>Office: 929.295.0385</p>
                <p><a href="mailto:info@studiosc.net">info@studiosc.net</a></p>
                </div>
            </StudioRow>

            
        </Layout>
    )

}

const StudioRow = styled.section`
    max-width: 1200px;
    width: 100%;
    padding: 3rem;
    margin: 0 auto;
    .contact-information {
        h2 {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            text-transform: uppercase;
            font-size: 2em;
            padding: 30px 0;
            max-width: 100%;
            margin: 0;
        }
        p {
            font-family: Arial;
            margin: 0;
            font-size: 16px;
            line-height: 20px;
        }
    }
    @media(max-width:767px) {
        padding: 20px;
    }
`

export default ContactPage

export const pageQuery = graphql`
    query {
        queryContent: wpPage(databaseId: {eq: 233}) {
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