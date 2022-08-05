import React, { createContext, useContext } from 'react'

export const AppContext = createContext()

export default function BlogContext() {
  return (
    useContext(AppContext)
  )
}
