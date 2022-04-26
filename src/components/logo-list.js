import * as React from "react"
import { graphql } from "gatsby"
import { Space, Container, Section, FlexList, Text, Logo } from "./ui"

export function LogoItem(props) {
  const image = props?.imageFields?.find((field) => field.id === props.id)
    ?.relationships?.field_image?.relationships?.field_media_image?.gatsbyImage

  if (!props.image || !image) return null

  return <Logo alt={props.alt} image={image} size="medium" />
}

export default function LogoList(props) {
  return (
    <Section paddingY={4}>
      <Container width="narrow">
        {props.text && (
          <Text center variant="lead">
            {props.text}
          </Text>
        )}
        <Space size={4} />
        <FlexList gap={4} variant="center">
          {props.logos.map(
            (logo) =>
              logo && (
                <li key={logo.id}>
                  <LogoItem
                    {...logo}
                    imageFields={props.relationships.field_logos}
                  />
                </li>
              )
          )}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageLogoListContent on node__homepage_logo_list {
    id
    text
    logos {
      id
      alt
      image {
        id
        gatsbyImageData
        alt
      }
    }

    relationships {
      field_logos {
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
