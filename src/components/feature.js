import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  Flex,
  Box,
  Subhead,
  Kicker,
  Text,
  ButtonList,
} from "./ui"

export default function Feature(props) {
  const image =
    props.relationships.field_image.relationships.field_media_image.gatsbyImage

  return (
    <Section padding={4} background="muted">
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half" order={props.flip ? 1 : null}>
            {!!image && <GatsbyImage alt={props.image.alt} image={image} />}
          </Box>
          <Box width="half">
            <Subhead>
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.heading}
            </Subhead>
            <Text variant="lead">{props.text}</Text>
            <ButtonList links={props.links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageFeatureContent on node__homepage_feature {
    id
    kicker
    heading
    text
    links {
      id
      href
      text
    }
    image {
      id
      alt
    }
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
`
