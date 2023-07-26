import { ArrowRight } from 'phosphor-react'
import { Container, Form, FormError, Header } from './styles'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Please use at least 3 letters!' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Please use only letters and hyphens!',
    })
    .transform((username) => username.toLowerCase()),

  name: z.string().min(3, { message: 'Please use at least 3 letters!' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.name,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }

      console.log(err)
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to Ignite Call!</Heading>
        <Text>
          We need a few informations to create your profile! Don&apos;t worry,
          you can edit them later!
        </Text>

        <MultiStep size={4} currentStep={1} />

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Username</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="your-username"
              {...register('username')}
            />
            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Full name</Text>
            <TextInput placeholder="Your name" {...register('name')} />
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Next step
            <ArrowRight />
          </Button>
        </Form>
      </Header>
    </Container>
  )
}
