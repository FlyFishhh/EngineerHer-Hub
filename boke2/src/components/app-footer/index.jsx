import React, { memo } from 'react'
import { FooterWrapper } from './style'

const AppFooter = memo(() => {
  return (
    <FooterWrapper>
      <div className='wrapper'>
        <div className='statement'>© 2024 Techladies Hub</div>
      </div>
    </FooterWrapper>
  )
})

export default AppFooter