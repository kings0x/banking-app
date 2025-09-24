'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import path from 'path'
import { cn } from '@/lib/utils'
import Footer from './Footer'


const Sidebar = ({user}:SiderbarProps) => {

    const pathname = usePathname()
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link 
            href='/' 
            className='mb-12 flex cursor-pointer items-center gap-2'>
                <Image
                src='/icons/logo.svg'
                width={24}
                height={24}
                alt='RiveTrust logo'
                className='size-[24px] max-xl:size-14'
                />

                <h1
                className='sidebar-logo font-ibm-plex-serif'
                >
                    RiveTrust
                </h1>
            </Link>

            {sidebarLinks.map((items) => {
                const isActive = pathname === items.route || pathname.startsWith(`${items.route}/`) 
                return (
                    <Link
                    key={items.label}
                    href={items.route}
                    className={cn('sidebar-link group', {
                        'bg-blue-500 text-white': isActive
                    }) }>

                    <div className='relative size-6'>
                        <Image
                        src={items.imgURL}
                        alt={items.label}
                        fill
                        className={cn({'brightness-[3] invert-0': isActive, 'brightness-0 invert-1': !isActive})}
                        />
                    </div>

                    <p className={`${cn({'brightness-[3] invert-0': isActive, 'brightness-0 invert-1': !isActive})}`}>
                        {items.label}
                    </p>

                    </Link>
                )
                    
            })}

            USER
        </nav>

        <Footer user={user}/>
       
    </section>
  )
}

export default Sidebar