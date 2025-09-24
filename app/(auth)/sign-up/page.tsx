import React from 'react'
import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
const SignUp = async() => {
      const loggedInUser = await getLoggedInUser();
    console.log("Logged in user", loggedInUser)

  return (
    <section className='w-1/2 overflow-auto no-scrollbar'>
        <AuthForm type="sign-up"/>
    </section>
  )
}

export default SignUp