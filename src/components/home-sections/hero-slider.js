import React, { Component } from "react"
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage } from "gatsby-plugin-image"
import Slider from "react-slick"

class HeroSlider extends Component {

    render() {

        const { data } = this.props; 
        const slideMap = data.allWpHomeSlide.edges

        const settings = {
            arrows: false,
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 6000,
            speed: 1000,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return(
            <SliderMain>

                <Slider {...settings}>
                    {slideMap.map(imageSrc => (
                        <div class="hero-slide">
                            <GatsbyImage className={"slide-background"} image={imageSrc.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={"slide"} />
                        </div>
                    ))}
                </Slider>

            </SliderMain>
        )

    }

}

const SliderMain = styled.section`
    .slick-slider {
        height: 100vh;
        .hero-slide {
            height: 100vh;
            position: relative;
            display: flex !important;
            justify-content: center;
            align-items: center;
            .slide-background {
                position: absolute !important;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                img {
                    height: 100%;
                    object-fit: cover;
                }
                &.top-center {
                    img {
                        object-position: top center;
                    }
                }
            }
            .slide-content {
                text-align: center;
                position: relative;
                z-index: 3;
                max-width: 800px;
                h1,
                h2 {
                    font-family: Roboto;
                    font-size: 60px;
                    font-weight: 100;
                    line-height: 1.5;
                    color: #fff;
                    text-shadow: 2px 2px 4px rgba(0,0,0,.8);
                    transition-duration: .3s;
                }
                p {
                    font-family: Roboto;
                    font-size: 24px;
                    line-height: 1.5;
                    color: #fff;
                    transition-duration: .3s;
                }
                a {
                    font-family: Roboto;
                    font-size: 24px;
                    line-height: 1.5;
                    color: #fff;
                    text-decoration: none;
                    font-family: Roboto;
                    font-size: 24px;
                    line-height: 1.5;
                    color: #fff;
                    background-color: #25afb4;
                    padding: 10px 50px;
                    border: 2px solid #fff;
                    border-radius: 50px;
                    transition-duration: .3s;
                    &:hover {
                        color: #25afb4;
                        background-color: #fff;
                    }
                }
            }
        }
        .slick-dots {
            bottom: 25px;
            z-index: 4;
            li {
                background-color: #fff;
                border: 1px solid #000;
                border-radius: 50%;
                width: 15px;
                height: 15px;
                margin: 0 10px;
                transition-duration: .3s;
                opacity: .5;
                &.slick-active {
                    opacity: 1;
                }
                button {
                    &:before {
                        content:'';
                    }
                }
            }
        }
    }
    @media(max-width:767px) {
        .slick-slider {
            .hero-slide {
                .slide-content {
                    padding: 0 20px;
                    h1,
                    h2 {
                        font-size: 32px;
                        line-height: 1.3;
                    }
                    p {
                        font-size: 18px;
                        line-height: 1.3;
                    }
                    a {
                        display: inline-block;
                        font-size: 18px;
                    }
                }
            }
        }
    }
`

export default props => (
    <StaticQuery
      query={graphql`
        query {
            allWpHomeSlide {
                edges {
                    node {
                        featuredImage {
                            node {
                                localFile {
                                    childImageSharp {
                                        gatsbyImageData (
                                            width: 1800
                                            placeholder: TRACED_SVG
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
      `}
      render={data => <HeroSlider data={data} {...props} />}
    />
  );