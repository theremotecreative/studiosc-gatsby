import React from "react"

import Layout from "../components/layout-v2"
import Seo from "../components/seo"

import HeroSlider from "../components/home-sections/hero-slider"
import HomeBlog from "../components/home-sections/home-blog"
// import HomeTypologies from "../components/home-sections/home-typologies"

const IndexPage = () => {

    return(
        <Layout>
            <Seo 
            title={"StudiosC Home"} 
            description={"Need Description"}
            />
            <HeroSlider/>
            <HomeBlog />
        </Layout>
    )

}

export default IndexPage