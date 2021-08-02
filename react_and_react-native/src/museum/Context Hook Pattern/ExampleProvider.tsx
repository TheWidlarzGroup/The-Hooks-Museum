import React, { FC, ReactNode, memo } from 'react'
import ExampleContext from './ExampleContext'

interface Props {
  children: ReactNode
}

const ExampleProvider: FC<Props> = ({ children }) => (
  <ExampleContext.Provider value={null}>{children}</ExampleContext.Provider>
)

export default memo(ExampleProvider)
