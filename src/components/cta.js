import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  Nudge,
  Container,
  Section,
  Heading,
  Text,
  ButtonList,
  Kicker,
} from "./ui"

export default function HomepageCta(props) {
  const image =
    props?.relationships?.field_image?.relationships?.field_media_image
      ?.gatsbyImage

  return (
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="primary">
        <Heading center>
          {props.kicker && <Kicker center>{props.kicker}</Kicker>}
          {props.heading}
        </Heading>
        <Text as="p" center variant="lead">
          {props.text}
        </Text>
        <ButtonList links={props.links} variant="center" reversed />
        {image && (
          <Nudge left={5} right={5} bottom={5}>
            <GatsbyImage alt={props.image.alt} image={image} />
          </Nudge>
        )}
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageCtaContent on node__homepage_cta {
    id
    kicker
    heading
    text
    image {
      alt
      id
    }
    links {
      id
      href
      text
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
