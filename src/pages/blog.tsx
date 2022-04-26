import * as React from "react"
import { graphql } from "gatsby"
import BlogIndex from "../templates/blog-index"

export default function Blog(props) {
  const posts = props.data.allNodeBlogPost.nodes.map((post) => {
    return {
      title: post.title,
      slug: post.path.alias?.slice(1), // Drupal aliases start with a forward slash.
      category: post.relationships.field_category?.[0].name,
      image:
        post.relationships?.field_image?.relationships?.field_media_image
          ?.gatsbyImage,
    }
  })

  return <BlogIndex posts={posts} />
}

export const query = graphql`
  query blogPost {
    allNodeBlogPost(sort: { fields: [created] }) {
      nodes {
        id
        title
        field_body {
          value
          processed
          format
        }
        path {
          alias
        }
        relationships {
          field_category {
            name
          }
          field_image {
            relationships {
              field_media_image {
                gatsbyImage(width: 400)
              }
            }
          }
        }
      }
    }
  }
`
