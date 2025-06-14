/* eslint-disable react/react-in-jsx-scope */

import Header from '@/components/Header'

import CardsSection from '@/components/CardsSection'

export default function Home() {


  return (
    <div className='flex flex-col w-full h-full m-auto items-center justify-center py-5 bg-slate-700'>

      <Header/>
      <CardsSection />
    </div>
    

  )
}
