import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Flex,
  Box,
  Icon,
  ButtonList,
  Nudge,
} from "./ui"

function Stat(props) {
  return (
    <Box>
      <Text variant="stat">{props.value}</Text>
      <Text variant="statLabel">{props.label}</Text>
    </Box>
  )
}

export default function StatList(props) {
  const icon =
    props.relationships?.field_icon?.relationships?.field_media_image
      ?.gatsbyImage

  const image =
    props.relationships?.field_image?.relationships?.field_media_image
      ?.gatsbyImage

  return (
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="primary">
        <Flex responsive variant="end">
          <Box width="half">
            {icon && <Icon alt={props.icon.alt} image={icon} />}
            <Heading>
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.heading}
            </Heading>
            {props.text && <Text variant="lead">{props.text}</Text>}
            <FlexList wrap gap={4}>
              {props.content.map((stat) => (
                <li key={stat.id}>
                  <Stat {...stat} />
                </li>
              ))}
            </FlexList>
            <ButtonList links={props.links} reversed />
          </Box>
          <Box width="half">
            {image && (
              <Nudge right={5} bottom={5}>
                <GatsbyImage alt={props.image.alt} image={image} />
              </Nudge>
            )}
          </Box>
        </Flex>
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageStatListContent on node__homepage_stat_list {
    id
    kicker
    heading
    text
    image {
      id
      alt
      gatsbyImageData
    }
    icon {
      id
      alt
      gatsbyImageData
    }
    content {
      id
      value
      label
      heading
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
      field_icon {
        relationships {
          field_media_image {
            gatsbyImage(width: 800)
          }
        }
      }
    }
  }
`
