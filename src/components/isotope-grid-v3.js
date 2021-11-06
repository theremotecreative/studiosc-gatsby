import React, { Component, useState, useEffect, useRef }  from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components'
import { GatsbyImage } from "gatsby-plugin-image"

//import Isotope from "isotope-layout/js/isotope";

class IsoGridv3 extends Component {

    componentDidMount() {

        if (typeof window !== `undefined`) {
    
          // import Isotope API
            const Isotope = require("isotope-layout/js/isotope");

            // init one ref to store the future isotope object
            const isotope = React.useRef()

            // store the filter keyword in a state
            const [filterKey, setFilterKey] = React.useState('*')
          
            // initialize an Isotope object with configs
            React.useEffect(() => {
                isotope.current = new Isotope('.filter-container', {
                itemSelector: '.filter-item',
                layoutMode: 'fitRows',
                })
                // cleanup
                return () => isotope.current.destroy()
            }, [])

            // handling filter key change
            React.useEffect(() => {
                filterKey === '*'
                ? isotope.current.arrange({filter: `*`})
                : isotope.current.arrange({filter: `.${filterKey}`})
            }, [filterKey])

            const handleFilterKeyChange = key => () => setFilterKey(key)

        }
    }

    render() {

        const { data } = this.props; 
        const propertyMap = data.allWpProperty.edges

        return(
            <>
            <GridMain>
                <ul class="project-cats">
                <li onClick={handleFilterKeyChange('*')}>All</li>
                <li onClick={handleFilterKeyChange('development')}>Development</li>
                <li onClick={handleFilterKeyChange('residential')}>Residential</li>
                <li onClick={handleFilterKeyChange('office')}>Office</li>
                <li onClick={handleFilterKeyChange('adaptive-reuse')}>Adaptive Reuse</li>
                </ul>
                <ul className="filter-container">

                {propertyMap.map(property => (

                    <div className={`filter-item ${property.node.categories.nodes.map(category => ( category.slug  )).join(' ')}`}>
                    <GatsbyImage className={"slide-background"} image={property.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={"slide"} />
                    <Link to={property.node.slug}>
                        <div>
                        <h3>{property.node.title}</h3>
                        <p>{property.node.propertyInfo.propertyLocation}</p>
                        </div>
                    </Link>
                    </div>
                ))}
                </ul>
            </GridMain>
            </>
        )

    }

}

const GridMain = styled.section`
  max-width: 100%;
  padding: 0 30px;
  ul.project-cats {
    list-style: none;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    margin: 0;
    margin-top: -25px;
    position: relative;
    z-index: 4;
    li {
      color: #4c5166;
      font-family: Roboto;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 1px;
      padding-left: 20px;
      text-transform: lowercase;
      margin: 0;
      line-height: 3;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .filter-item {
    height: 400px;
    width: 33%;
    border: 10px solid #fff;
    background-color: #fff;
    position: relative;
    .gatsby-image-wrapper {
      position: relative;
      height: 100%;
      width: 100%;
      z-index: 1;
      opacity: 1;
      transition-duration: .5s;
    }
    a {
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      color: #000;
      text-decoration: none;
      z-index: 2;
      opacity: 0;
      transition-duration: .5s;
    }
    h3 {
      font-family: Roboto;
      text-align: center;
      font-size: 30px;
      letter-spacing: 1.5px;
      font-weight: 400;
      text-transform: uppercase;
    }
    p {
      font-family: Roboto;
      text-align: center;
      font-size: 13px;
      font-weight: 400;
    }
    &:hover {
      .gatsby-image-wrapper {
        opacity: 0;
      }
      a {
        opacity: 1;
      }
    }
  }
  @media(max-width:1200px) {
    .filter-item {
      width: 50%;
    }
  }
  @media(max-width:767px) {
    .filter-item {
      width: 100%;
    }
  }
`

export default props => (
    <StaticQuery
      query={graphql`
        query {
            allWpProperty(sort: {fields: date, order: ASC}) {
                edges {
                  node {
                    title
                    slug
                    categories {
                      nodes {
                        slug
                      }
                    }
                    featuredImage {
                      node {
                        localFile {
                          childImageSharp {
                            gatsbyImageData (
                                width: 800
                                placeholder: BLURRED
                                formats: [AUTO, WEBP, AVIF]
                            )
                          }
                        }
                      }
                    }
                    propertyInfo {
                      propertyLocation
                    }
                  }
                }
              }
        }
      `}
      render={data => <IsoGridv3 data={data} {...props} />}
    />
  );