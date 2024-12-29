import { useState, FormEvent } from 'react'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { AuthForm } from '../component/auth/Auth'
import Header from '../layouts/Header'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation } = useMutateAuth()

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({ email: email, password: pw })
    } else {
      await registerMutation
        .mutateAsync({ email: email, password: pw })
        .then(() =>
          loginMutation.mutate({
            email: email,
            password: pw,
          })
        )
    }
  }
  return (
    <>
      <Header isLogin={false} />
      <AuthForm
        email={email}
        setEmail={setEmail}
        pw={pw}
        setPw={setPw}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onSubmit={submitAuthHandler}
      />
    </>
  )
}
