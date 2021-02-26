import {createContext} from 'react'

interface Example {

}

const ExampleContext = createContext<Example | null>(null)

export default ExampleContext
