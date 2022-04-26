import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  FlexList,
  Box,
  Icon,
  Heading,
  Text,
  Space,
} from "./ui"

function Benefit(props) {
  const image = props?.imageFields?.find((field) => field.id === props.id)
    ?.relationships?.field_image?.relationships?.field_media_image?.gatsbyImage

  return (
    <Box as="li" width="third" padding={4} paddingY={3}>
      {image && <Icon alt={props.image.alt} image={image} size="small" />}
      <Space size={2} />
      <Heading variant="subheadSmall">{props.heading}</Heading>
      <Text>{props.text}</Text>
    </Box>
  )
}

export default function BenefitList(props) {
  return (
    <Section>
      <Container>
        <Box center>
          {props.heading && <Heading>{props.heading}</Heading>}
          {props.text && <Text variant="lead">{props.text}</Text>}
        </Box>
        <Space size={3} />
        <FlexList gutter={3} variant="start" responsive wrap>
          {props.content.map((benefit) => (
            <Benefit
              key={benefit.id}
              {...benefit}
              imageFields={props.relationships.field_content}
            />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageBenefitListContent on node__homepage_benefit_list {
    id
    heading
    text
    content {
      id
      heading
      text
      image {
        id
        gatsbyImageData
        alt
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
