import * as React from "react"
import { graphql } from "gatsby"
import BlogPost from "../templates/blog-post"

export default function BlogPostBase(props) {
  console.log(props)
  const post = props.data.nodeBlogPost
  return <BlogPost title={post.title} html={post.field_body.processed}
  image={post.relationships.field_image}
  />
}

export const query = graphql`
query aBlogPost($id: String!) {
  nodeBlogPost(id: {eq: $id}) {
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
          gatsbyImageData(width: 1152)
        }
      }
    }
}
`
