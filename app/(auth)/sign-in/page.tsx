import React from 'react'
import AuthForm from '@/components/AuthForm'

const SignIn = async() => {

  return (
    <section className='w-1/2'>
        <AuthForm type="sign-in"/>
    </section>
  )
}

export default SignIn