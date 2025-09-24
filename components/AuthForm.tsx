"use client";
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {signUp, signIn} from '../lib/actions/user.actions'
import { Form , FormProvider} from 'react-hook-form'

  

const AuthForm = ({type}:AuthFormProps) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const formSchema =  authFormSchema(type);
    const router = useRouter()


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password:"",
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
            city:""
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try{
            //sign up with appwrite and create plaid token
            if(type === 'sign-up'){
                const newUser = await signUp(values)
                setUser(newUser)
            }
            // sign in with appwrite and create plaid token
            if(type === 'sign-in'){
                const response = await signIn(
                    {
                        email: values.email,
                        password: values.password
                    }
                )

                if (response){
                    router.push('/')
                }
            }

        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsLoading(false)
        }
        

    }

  return (
    <section className="auth-form px-4 mx-auto">
        <header className="flex flex-col gap-5 md:gap-8">
              <Link 
            href='/' 
            className='flex cursor-pointer items-center gap-1'>
                <Image
                src='/icons/logo.svg'
                width={24}
                height={24}
                alt='RiveTrust logo'
                />

                <h1
                className='font-ibm-plex-serif text-26 font-bold text-black'
                >
                    RiveTrust
                </h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}

                    <p className="text-16 font-normal text-gray-600">
                        {user
                            ? 'Link your account to get started with RiveTrust':
                            'Please enter your details'
                        }
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">
                {/**PlaidLink component */}
            </div>
        ): (
            <div className="flex flex-col gap-4">
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                       {type === 'sign-up' && 
                        <>
                            <div className='flex gap-4'>
                                <CustomInput
                                name='firstName'
                                label='First Name'
                                placeholder='Enter Your First Name'
                                control={form.control}
                                />

                                <CustomInput
                                name='lastName'
                                label='Last Name'
                                placeholder='Enter Your Last Name'
                                control={form.control}
                                />
                            </div>
                            


                            <CustomInput
                            name='address'
                            label='Address'
                            placeholder='Enter Your Specific Address'
                            control={form.control}
                            />

                            <CustomInput
                            name='city'
                            label='City'
                            placeholder='Enter Your City'
                            control={form.control}
                            />

                            <div className='flex gap-4'>
                                <CustomInput
                                name='state'
                                label='State'
                                placeholder='Enter Your State'
                                control={form.control}
                                />

                                <CustomInput
                                name='postalCode'
                                label='Postal Code'
                                placeholder='Example: 11101'
                                control={form.control}
                                />
                            </div>


                            <div className="flex gap-4">
                                <CustomInput
                                name='dateOfBirth'
                                label='Date of Birth'
                                placeholder='DD-MM-YYYY'
                                control={form.control}
                                />

                                <CustomInput
                                name='ssn'
                                label='SSN'
                                placeholder='Example: 1234'
                                control={form.control}
                                />
                            </div>

                        </>

                       } 
                        <CustomInput control={form.control} name='email' label={'Email'} placeholder={'Enter Your Email'}/>


                        <CustomInput control={form.control} name='password' label={'Password'} placeholder={'Enter Your Password'}/>
                        



                        <Button 
                        type="submit" 
                        className='form-btn w-full cursor-pointer'
                        disabled={isLoading}
                        >
                            {
                                isLoading
                                ?
                                (<>
                                    <Loader2 
                                    size={20}
                                    className='animate-spin'
                                    />
                                    Loading...
                                </>
                                )
                                :
                                type === 'sign-in'
                                ?
                                'Sign In'
                                :
                                'Sign Up'
                            }
                        </Button>
                    </form>
                </FormProvider>

                <footer className='flex justify-center gap-1'>
                    <p className='text-14 font-normal text-gray-600'>
                        {
                        type === 'sign-in'
                        ? "Don't have an account ?"
                        :
                        "Already have an account ?"
                        }
                    </p>
                    <Link
                    href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                    className='form-link'
                    >
                        {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                    </Link>
                </footer>
            </div>
        )}
    </section>
  )
}

export default AuthForm