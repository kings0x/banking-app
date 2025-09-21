import React from 'react'

const AuthLayout = ({children}: Readonly<{children: React.ReactNode;
}>) => {
  return (
    <>
        <div>AuthLayout</div>
        {children}
    </>
    
  )
}

export default AuthLayout