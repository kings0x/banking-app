'use client'

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'



const MobileNav = ({user}:MobileNavProps) => {

    const pathname = usePathname()
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
        <SheetTrigger>
            <Image 
            src='/icons/hamburger.svg' 
            width={30} 
            height={30} 
            alt='menu'
            className='cursor-pointer'
            />

        </SheetTrigger>
        <SheetContent side="left" className='border-none bg-white'>
            <nav className='flex flex-col gap-4'>
            <Link 
            href='/' 
            className='flex cursor-pointer items-center gap-1 px-4'>
                <Image
                src='/icons/logo.svg'
                width={24}
                height={24}
                alt='RiveTrust logo'
                className='size-[24px] max-xl:size-14'
                />

                <h1
                className='sidebar-logo font-ibm-plex-serif text-26 font-bold text-black'
                >
                    RiveTrust
                </h1>
            </Link>

            <div className='mobilenav-sheet'>
                <SheetClose asChild>
                    <nav className='flex h-full flex-col gap-6 pt-16 text-white'>

                        {sidebarLinks.map((items) => {
                            const isActive = pathname === items.route || pathname.startsWith(`${items.route}/`) 
                            return (
                                <SheetClose asChild key={items.route}>

                                    <Link
                                    key={items.label}
                                    href={items.route}
                                    className={cn('mobilenav-sheet_closew-full', {
                                        'bg-blue-500 text-white': isActive
                                    }) }>

                                        <Image
                                        src={items.imgURL}
                                        alt={items.label}
                                        width={20}
                                        height={20}
                                        
                                        className={cn({'brightness-[3] invert-0': isActive, 'brightness-0 invert-1': !isActive})}
                                        />

                                    <p className={`text-16 font-semibold text-black ${cn({'brightness-[3] invert-0': isActive, 'brightness-0 invert-1': !isActive})}`}>
                                        {items.label}
                                    </p>

                                    </Link>
                                </SheetClose>
                            )
                                
                        })}

                        USER
                        

                    </nav>
                </SheetClose>
            </div>

            FOOTER

            </nav>
        </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav