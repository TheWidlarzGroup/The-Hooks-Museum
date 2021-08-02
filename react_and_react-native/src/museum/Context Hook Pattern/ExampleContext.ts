import { createContext } from 'react'

interface Example {
  field: string
}

const ExampleContext = createContext<Example | null>(null)

export default ExampleContext
