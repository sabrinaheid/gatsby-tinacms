import React from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image'
import { withPlugin } from 'tinacms'
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'
import useBlogData from "../static_queries/useBlogData"

function BlogList() {
  const blogData = useBlogData()
  function renderBlogData() {
    return (
      <div>
        {blogData
          .filter(blog => blog.node.frontmatter.title !== "")
          .map(blog => {
            return (
              <Link 
                to={`/blog/${blog.node.fields.slug}`} 
                key={blog.node.id}
                style={{
                  textDecoration: 'none'
                }}>
                <li key={blog.node.fields.slug}>
                <Img 
                      fluid={
                        blog.node.frontmatter.hero_image.childImageSharp.fluid
                      }
                      style={{
                        objectFit: 'cover',
                        margin: '0 auto',
                        height: '200px',
                        width: '100%'
                      }}
                    />
                  <div style={{
                    borderBottom: '1px solid #ebebeb',
                    marginBottom: '50px'
                  }}>
                    <h2>{blog.node.frontmatter.title}</h2>
                    <p>{blog.node.frontmatter.author}</p>
                  </div>
                </li>
              </Link>
            )
          })}
      </div>
    )
  }
  return (
    <section>
      <ul
        style={{
          listStyle: 'none'
        }}>
        {renderBlogData()}</ul>
    </section>
  )
}

const CreateBlogButton = new RemarkCreatorPlugin( {
    label: 'Add New Post',
    filename: name => {
    let slug = name.title.replace(/\s+/g, '-').toLowerCase()

    return `content/posts/${slug}.md`
    },
    fields: [
      {
        label: 'Title',
        name: 'title',
        component: 'text',
        required: true
      },
      {
        label: 'Date',
        name: 'date',
        component: 'date',
        description: 'The default will be today'
      }
    ],
    frontmatter: (postInfo) => {
      return ({
      title: postInfo.title,
      date: new Date(),
      hero_image: postInfo.hero ? postInfo.hero : '/content/images/Zoo-Marecottes.jpg'})
    }
  })

export default withPlugin(BlogList, CreateBlogButton);
