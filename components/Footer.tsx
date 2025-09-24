import React from 'react'
import Image from 'next/image'
import { logoutAccount } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
const Footer = ({user, type='desktop'}:FooterProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await logoutAccount();
    if(loggedOut) router.push('/sign-in');
  }

  return (
    <footer className='footer'>
      <div className={type === 'mobile' ? "footer_name-mobile" : "footer_name"}>
        <p className='text-xl font-bold text-gray-700'>
          {user?.name[0] || 'G'}
        </p>
      </div>

      <div className={type === 'mobile' ? "footer_email-mobile" : "footer_email"}>
        <h1 className='text-14 font-semibold truncate text-gray-700'>
          {user?.name}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogout}>
        <Image 
        src='/icons/logout.svg'
        alt='logout'
        width={24}
        height={24}
        />
      </div>
      
    </footer>
  )
}

export default Footer