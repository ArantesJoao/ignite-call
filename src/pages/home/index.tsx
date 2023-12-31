import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Uncomplicated scheduling | Ignite Call"
        description="Link your calendar and let people book appointments when you are available."
      />
      <Container>
        <Hero>
          <Heading size="4xl">Uncomplicated scheduling</Heading>
          <Text size="xl">
            Link your calendar and let people book appointments when you are
            available.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            alt="Calendar interface preview"
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
