"use client"

import { AccountProvider } from "@/context/account.context"
import Account from "@/components/UI/layout/account"

const AccountPage = () => {
  return (
    <AccountProvider>
      <Account />
    </AccountProvider>
  )
}

export default AccountPage



