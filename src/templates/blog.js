import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { remarkForm } from "gatsby-tinacms-remark"

function Blog(props) {
  const data = props.data.markdownRemark

  return (
    <Layout>
      <article>
        <Img
            fluid={data.frontmatter.hero_image.childImageSharp.fluid}
            style={{
              objectFit: 'cover',
              margin: '0 auto',
              height: '200px',
              width: '100%'
            }}
          />
        <div
          style={{
            textAlign: 'center'
          }}>
          <h1>{data.frontmatter.title}</h1>
          <h3>{data.frontmatter.date} {data.frontmatter.author}</h3>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data.html }}
          style={{
            maxWidth: '60%',
            margin: '0 auto'
          }}
        ></div>
      </article>
    </Layout>
  )
}

const BlogTemplateOptions = {
  fields: [
    {
      label: "Blog Title",
      name: "rawFrontmatter.title",
      component: "text",
    },
    {
      label: "Date Posted",
      name: "rawFrontmatter.date",
      component: "date",
    },
    {
      label: "Hero Image",
      name: "rawFrontmatter.hero_image",
      component: "image",
      parse: filename => `../images/${filename}`,
      uploadDir: () => "/content/images/",
      previewSrc: markdownRemark => {
        if (!markdownRemark.frontmatter.hero_image) return ""
        return markdownRemark.frontmatter.hero_image.childImageSharp.fluid.src
      },
    },
    {
      label: "Author",
      name: "rawFrontmatter.author",
      component: "text",
    },
    {
      label: "Blog Body",
      name: "rawMarkdownBody",
      component: "markdown",
    },
  ],
}

export default remarkForm(Blog, BlogTemplateOptions)

export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
      fields {
        slug
      }
      frontmatter {
        title
        author
        date(formatString: "MMMM Do, YYYY")
        hero_image {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`
