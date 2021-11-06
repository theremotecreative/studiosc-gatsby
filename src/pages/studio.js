import React from "react"
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from 'styled-components'
import Slider from "react-slick"

import Layout from "../components/layout-v2"
import Seo from "../components/seo"

const StudioPage = ({ data: { pageContent, sliderContent, teamContent } }) => {

    const sliderMap = sliderContent.edges
    const teamMap = teamContent.edges

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        autoplay: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return(
        <Layout>
            <Seo 
            title={"Studio Page"} 
            description={"Need Description"}
            />
            <ProfileSection>
                <div class="slider-container">
                    <Slider {...settings}>
                        {sliderMap.map(imageSrc => (
                            <div class="studio-slide">
                                <GatsbyImage className={"slide-background"} image={imageSrc.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={imageSrc.node.featuredImage.node.title} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div class="content" dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            </ProfileSection>
            <TeamSection>
                {teamMap.map(teamSrc => (
                    <div class="team-member">
                        <GatsbyImage className={"team-background"} image={teamSrc.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={teamSrc.node.featuredImage.node.title} />
                        <h3>{teamSrc.node.title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: teamSrc.node.content }} />
                    </div>
                ))}
            </TeamSection>
        </Layout>
    )

}

const ProfileSection = styled.section`
    max-width: 1260px;
    width: 100%;
    padding: 0 50px;
    margin: 50px auto;
    div.slider-container {
        overflow: hidden;
        .slick-slider {
            width: 100%;
            max-width: 890px;
            overflow: visible;
            .slick-list {
                overflow: visible;
            }
            .slick-slide {
                max-width: 890px;
                width: 890px;
                .gatsby-image-wrapper {
                    img {
                        display: block;
                        object-fit: cover;
                        height: 640px;
                        width: 850px;
                    }
                }
            }
        }
        .slick-prev {
            width: 30px;
            height: 30px;
            left: 30px;
            border-top: 6px solid #fff;
            border-left: 6px solid #fff;
            transform: rotate(-45deg);
            z-index: 2;
            color: transparent;
            box-shadow: -1px -1px 2px rgb(0 0 0 / 20%);
            &:before {
                display: none;
            }
            &.slick-disabled {
                opacity: 0;
            }
        }
        .slick-next {
            width: 30px;
            height: 30px;
            right: -230px;
            border-top: 6px solid #fff;
            border-right: 6px solid #fff;
            transform: rotate(45deg);
            z-index: 2;
            color: transparent;
            box-shadow: 1px -1px 2px rgb(0 0 0 / 20%);
            &:before {
                display: none;
            }
            &.slick-disabled {
                opacity: 0;
            }
        }
    }
    div.content {
        padding: 50px 0px;
        p {
            font-family: Roboto;
            color: #242424;
            font-size: 20px;
        }
    }
`

const TeamSection = styled.section`
    max-width: 1260px;
    width: 100%;
    padding: 0 50px;
    margin: 50px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    .team-member {
        width: calc(25% - 30px);
        .gatsby-image-wrapper {
            height: 350px;
            margin-bottom: 10px;
        }
        h3, p {
            font-family: Arial;
            margin: 0;
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
        }
        p {
            margin-bottom: 20px;
        }
    }
`

export default StudioPage

export const pageQuery = graphql`
    query {
        pageContent: wpPage(databaseId: {eq: 227}) {
            content
        }
        sliderContent: allWpStudioSlide(sort: {fields: date, order: ASC}) {
            edges {
              node {
                featuredImage {
                  node {
                    title
                    localFile {
                      childImageSharp {
                        gatsbyImageData (
                            width: 1000
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
        teamContent: allWpTeamMember(sort: {fields: date, order: DESC}) {
            edges {
              node {
                title
                content
                featuredImage {
                  node {
                    title
                    localFile {
                      childImageSharp {
                        gatsbyImageData (
                            width: 500
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
    }
`