"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react'
import { useAuthStore } from '@/store/auth.store'
import { useAccount } from '@/context/account.context'
import Skeleton from '@/components/common/skeleton'
import Alert from '@/components/common/alert'
import UpdateUserAvatarForm from '@/app/forms/update-user-avatar.form'
import UpdateUserDataForm from '@/app/forms/update-user-data.form'
import UserPets from '@/components/UI/layout/user-pets'

const Account = () => {
  const router = useRouter()
  const { 
    status, 
    isAuth,
  } = useAuthStore()

  const {
    userData,
    action,
  } = useAccount()

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-start h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full pt-27 md:pt-40 px-4 md:px-20">
        <Skeleton/>
      </div>
    )
  }

  if (!isAuth) {
    return ( 
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full px-4 md:px-20">
        <div className="mt-10 md:mt-40">
          <Alert error={true} message="Данная страница доступна только для авторизованных пользователей!" />
        </div>
      </div>
    )
  }

  return (
     <div className="flex justify-center items-start min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-10rem)] w-full pt-27 md:pt-40 px-4 md:px-20">
      {userData ? (
        <div className="w-full">
          <Breadcrumbs className="mb-5 md:mb-10">
            <BreadcrumbItem 
              onClick={() => router.push("/")}
            >
              Главная
            </BreadcrumbItem>
            <BreadcrumbItem>
              Профиль
            </BreadcrumbItem>
          </Breadcrumbs>
          <div className="flex flex-col md:flex-row items-start gap-10 w-full">
            <div className="md:flex-shrink-0 flex flex-col gap-7 md:gap-10 w-full md:max-w-xl p-5 md:p-10 bg-blue-50 rounded-4xl">
              <h2 className="text-3xl md:text-4xl text-black leading-9 md:leading-12 font-bold">Привет, {userData.name}
                <span aria-label="emoji" className="ml-2" role="img">
                  👋
                </span>
              </h2>
              {action.message && <Alert error={action.error} message={action.message} />}
              <UpdateUserAvatarForm />
              <UpdateUserDataForm />
            </div>
            <div className="md:flex-1 w-full">
              <UserPets />
            </div>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  )
}

export default Account
