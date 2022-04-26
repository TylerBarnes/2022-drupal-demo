import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Subhead,
  Box,
  Icon,
  LinkList,
} from "./ui"

function Product(props) {
  const image = props?.imageFields?.find((field) => field.id === props.id)
    ?.relationships?.field_image?.relationships?.field_media_image?.gatsbyImage

  return (
    <Box center>
      {image && <Icon alt={props.image.alt} image={image} size="large" />}
      <Subhead>{props.heading}</Subhead>
      <Text>{props.text}</Text>
      <LinkList links={props.links} />
    </Box>
  )
}

export default function ProductList(props) {
  return (
    <Section>
      <Container>
        <Box center paddingY={4}>
          <Heading>
            {props.kicker && <Kicker>{props.kicker}</Kicker>}
            {props.heading}
          </Heading>
          {props.text && <Text>{props.text}</Text>}
        </Box>
        <FlexList gap={4} variant="responsive">
          {props.content.map((product) => (
            <li key={product.id}>
              <Product
                {...product}
                imageFields={props.relationships.field_content}
              />
            </li>
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageProductListContent on node__homepage_product_list {
    id
    kicker
    heading
    text
    content {
      id
      heading
      text
      image {
        alt
        id
        gatsbyImageData
      }
      links {
        id
        href
        text
      }
    }

    relationships {
      field_content {
        id
        relationships {
          field_image {
            relationships {
              field_media_image {
                gatsbyImage(width: 800)
              }
            }
          }
        }
      }
    }
  }
`
