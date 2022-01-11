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
        height: calc(100vh - 95px);
        .hero-slide {
            height: calc(100vh - 95px);
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
    @media(max-width:1200px) {
        .slick-slider {
            height: calc(80vh - 95px);
            .hero-slide {
                height: calc(80vh - 95px);
            }
        }
    }
    @media(max-width:767px) {
        .slick-slider {
            height: calc(60vh - 95px);
            .hero-slide {
                height: calc(60vh - 95px);
            }
        }
    }
`

export default props => (
    <StaticQuery
      query={graphql`
        query {
            allWpHomeSlide(sort: {fields: date, order: DESC}) {
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