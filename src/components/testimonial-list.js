import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  Heading,
  Kicker,
  Flex,
  Box,
  FlexList,
  Blockquote,
  Text,
  Avatar,
} from "./ui"

function Testimonial(props) {
  const image = props?.imageFields?.find((field) => field.id === props.id)
    ?.relationships?.field_avatar?.relationships?.field_media_image?.gatsbyImage

  return (
    <Flex variant="start">
      {image && props.avatar && <Avatar alt={props.avatar.alt} image={image} />}
      <Blockquote>
        <Text as="p" variant="lead">
          {props.quote}
        </Text>
        <figcaption>
          <Text as="cite" bold variant="caps">
            {props.source}
          </Text>
        </figcaption>
      </Blockquote>
    </Flex>
  )
}

export default function TestimonialList(props) {
  return (
    <Section>
      <Container>
        <Box center>
          <Heading>
            {props.kicker && <Kicker>{props.kicker}</Kicker>}
            {props.heading}
          </Heading>
        </Box>
        <FlexList gutter={3} variant="start" responsive wrap>
          {props.content.map((testimonial, index) => (
            <Box as="li" key={testimonial.id + index} width="half" padding={3}>
              <Testimonial
                {...testimonial}
                imageFields={props.relationships.field_content}
              />
            </Box>
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageTestimonialListContent on node__homepage_testimonial_list {
    id
    kicker
    heading
    content {
      id
      quote
      source
      avatar {
        id
        gatsbyImageData
        alt
      }
    }

    relationships {
      field_content {
        id
        relationships {
          field_avatar {
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
