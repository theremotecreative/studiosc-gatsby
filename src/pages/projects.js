import React from "react"

import Layout from "../components/layout-v2"
import Seo from "../components/seo"

import IsoGrid from "../components/isotope-grid-v3"

const ProjectPage = () => {

    return(
        <Layout>
            <Seo 
            title={"StudiosC Projects"} 
            description={"Need Description"}
            />
            <IsoGrid />
        </Layout>
    )

}

export default ProjectPage