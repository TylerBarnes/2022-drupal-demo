import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import {
  Box,
  ButtonList,
  Container,
  Flex,
  Heading,
  Kicker,
  Section,
  Subhead,
  Text,
} from "./ui"

export default function Hero(props) {
  const image =
    props?.relationships?.field_image?.relationships?.field_media_image
      ?.gatsbyImage

  return (
    <Section>
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half">
            {image && <GatsbyImage alt={props.image.alt} image={image} />}
          </Box>
          <Box width="half">
            <Heading as="h1">
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.h1}
            </Heading>
            <Subhead as="h2">{props.subhead}</Subhead>
            <Text as="p">{props.text}</Text>
            <ButtonList links={props.links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageHeroContent on node__homepage_hero {
    id
    kicker
    h1: heading
    subhead
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
