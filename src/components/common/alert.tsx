
"use client"

import { Alert as AlertHeroui } from "@heroui/react"

interface IProps {
    error: boolean
    message: string
}

const Alert = ({ error, message}: IProps) => {
  return (
    <AlertHeroui 
      key={message}
      color={error ? "danger" : "success"} 
      title={message} 
    />
  )
}

export default Alert
