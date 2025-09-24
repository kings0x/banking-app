import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const Home = async() => {

  const loggedIn = await getLoggedInUser();
  console.log("Home page details:", loggedIn)

  return (
    <section className='home no-scrollbar'>
      <div className='home-content no-scrollbar min-h-screen'>
        <header className='home-header'>
        <HeaderBox
        type="greeting"
        title="Welcome"
        user={loggedIn?.name || "Guest"}
        subtext='Access and manage your accounts and transactions efficiently.'
        />


        <TotalBalanceBox 
        accounts={[]}
        totalBanks={1}
        totalCurrentBalance={1235.75}
        />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar 
      user={loggedIn!}
      transactions={[]}
      banks={[{}, {}]}
      />
    </section>
  )
}

export default Home