import React from 'react'
import Header from './Header'
import Footer from './Footer'

type MainLayoutProps = {
  children: React.ReactNode
  isLogin?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isLogin }) => {
  return (
    <div>
      <Header isLogin={isLogin} />
      <main className="min-h-screen">{children}</main>
      <Footer isLogin={isLogin} />
    </div>
  )
}

export default MainLayout
