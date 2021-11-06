import React from "react"

import Layout from "../components/layout-v2"
import Seo from "../components/seo"

import PressGrid from "../components/press-grid"

const PressPage = () => {

    return(
        <Layout>
            <Seo 
            title={"Press Page"} 
            description={"Need Description"}
            />
            <PressGrid />
        </Layout>
    )

}

export default PressPage