import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const FooterLogo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo-white-square.png" }) {
        childImageSharp {
          gatsbyImageData (
              width: 45
              placeholder: TRACED_SVG
              formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  const mainLogo = getImage(data.placeholderImage.childImageSharp.gatsbyImageData)

  return <GatsbyImage image={mainLogo} alt="StudiosC Footer Logo" style={{margin: '0 auto'}}/>
}

export default FooterLogo