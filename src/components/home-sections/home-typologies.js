import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Slider from "react-slick"

const HomeTypologies = () => {

    const data = useStaticQuery(graphql`
        query {
            wpHomeSection(databaseId: {eq: 58}) {
                homeImageSection {
                    homeImageOne {
                        title
                        localFile {
                            childImageSharp {
                                gatsbyImageData (
                                    width: 430
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
                    }
                    homeImageTwo {
                        title
                        localFile {
                          childImageSharp {
                              gatsbyImageData (
                                  width: 430
                                  placeholder: BLURRED
                                  formats: [AUTO, WEBP, AVIF]
                              )
                            }
                        }
                    }
                    homeImageThree {
                        title
                        localFile {
                          childImageSharp {
                              gatsbyImageData (
                                  width: 430
                                  placeholder: BLURRED
                                  formats: [AUTO, WEBP, AVIF]
                              )
                            }
                        }
                    }
                    homeImageFour {
                        title
                        localFile {
                          childImageSharp {
                              gatsbyImageData (
                                  width: 995
                                  placeholder: BLURRED
                                  formats: [AUTO, WEBP, AVIF]
                              )
                            }
                        }
                    }
                    homeImageGallery {
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
    `)

    const queryContent = data.wpHomeSection.homeImageSection

    const homeOneImage = getImage(queryContent.homeImageOne.localFile.childImageSharp.gatsbyImageData)
    const homeTwoImage = getImage(queryContent.homeImageTwo.localFile.childImageSharp.gatsbyImageData)
    const homeThreeImage = getImage(queryContent.homeImageThree.localFile.childImageSharp.gatsbyImageData)
    const homeFourImage = getImage(queryContent.homeImageFour.localFile.childImageSharp.gatsbyImageData)

    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 1000,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const sliderMap = queryContent.homeImageGallery


    return(

        <MainSection>
            <div class="single-images">
                <h2>Explore our work typologies</h2>
                <div class="flex-row">
                    <div class="left-col">
                        <div class="top-images">
                            <GatsbyImage className={"tall-image"} image={homeOneImage} alt={queryContent.homeImageOne.title} />
                            <GatsbyImage className={"tall-image"} image={homeTwoImage} alt={queryContent.homeImageTwo.title} />
                        </div>
                        <div class="bottom-image">
                            <GatsbyImage className={"big-image"} image={homeFourImage} alt={queryContent.homeImageFour.title} />
                        </div>
                    </div>
                    <div class="right-col">
                        <GatsbyImage className={"tall-image"} image={homeThreeImage} alt={queryContent.homeImageThree.title} />
                    </div>
                </div>
            </div>
            <div class="image-slider">
                <div class="slider-container">
                    <Slider {...settings}>
                        {sliderMap.map(imageSrc => (
                            <div class="image-slide">
                                <GatsbyImage className={"slide-background"} image={imageSrc.localFile.childImageSharp.gatsbyImageData} alt={"slide"} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            
        </MainSection>
        
    )

}

const MainSection = styled.section`
    padding: 30px;
    .single-images {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        margin-bottom: 75px;
        h2 {
            font-family: Roboto;
            font-size: 32px;
            font-weight: 300;
            line-height: 1.4;
            margin-top: 40px;
            margin-bottom: 40px;
            width: 100%;
        }
        .tall-image {
            max-width: 350px;
            width: 100%;
        }
        .flex-row {
            display: flex;
            justify-content: center;
            align-items: center;
            .left-col {
                max-width: 775px;
                width: 100%;
                .top-images {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 75px;
                }
            }
            .right-col {
                max-width: 425px;
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
    .image-slider {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        margin-bottom: 75px;
        .slider-container {
            max-width: 775px;
            width: 100%;
            margin-left: auto;
        }
        .slick-prev {
            width: 25px;
            height: 25px;
            border-top: 6px solid #fff;
            border-left: 6px solid #fff;
            left: 25px;
            z-index: 2;
            transform: rotate(-45deg);
            &:before {
                display: none;
            }
        }
        .slick-next {
            width: 25px;
            height: 25px;
            border-top: 6px solid #fff;
            border-right: 6px solid #fff;
            right: 25px;
            z-index: 2;
            transform: rotate(45deg);
            &:before {
                display: none;
            }
        }
    }
`

export default HomeTypologies