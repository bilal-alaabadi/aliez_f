import React from 'react'
import Banner from './Banner'
// import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
import HeroSection from './HeroSection'
import PromoBanner from './PromoBanner'
import DealsSection from './DealsSection'
// import DealsSection from './DealsSection'

const Home = () => {
  return (
    <>
    <Banner />
    <HeroSection />
    <PromoBanner />
    <TrendingProducts/>
    <DealsSection />
    </>
  )
} 

export default Home


