import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = ( props ) => {
  return (
    <Svg viewBox="0 0 32 32" { ...props }>
      <image href="/images/logo/logo-vertical.svg" width={ 32 } height={ 32 }/>
    </Svg>
  )
}

export default Icon
