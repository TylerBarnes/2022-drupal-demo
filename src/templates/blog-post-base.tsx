import * as React from "react"
import { graphql } from "gatsby"
import BlogPost from "../templates/blog-post"

export default function BlogPostBase(props) {
  const post = props.data.nodeBlogPost
  return (
    <BlogPost
      title={post.title}
      html={post.field_body.processed}
      image={
        post.relationships.field_image?.relationships?.field_media_image
          ?.gatsbyImage
      }
    />
  )
}

export const query = graphql`
  query aBlogPost($id: String!) {
    nodeBlogPost(id: { eq: $id }) {
      id
      title
      field_body {
        processed
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
              gatsbyImage(width: 1152)
            }
          }
        }
      }
    }
  }
`
