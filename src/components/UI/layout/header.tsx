"use client"

import React, { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from 'next/link'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Divider,
  cn,
} from "@heroui/react"
import type { NavbarProps } from "@heroui/react"
import { Icon } from "@iconify/react"
import { useAuthStore } from "@/store/auth.store"
import { signOutFunc } from "@/actions/sign-out"
import LoginnModal from "../modals/login.modal"
import RegistrationModal from "../modals/registration.modal"
import { siteConfig } from "@/config/site.config"

const Header = (props: NavbarProps) => {
  const router = useRouter()
  const menu = siteConfig.menu
  const { isAuth, session, status, setAuthState } = useAuthStore()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (e) {
      // console.error("При выходе из системы возникла ошибка: ", e)
    }
    setAuthState("unauthenticated", null)
  }

  const NavBarItems = () => {
    return (
      menu.map((item) => {
        const isActive = pathname === item.href
        return (
          <NavbarItem key={item.href}>
            <Link 
              href={item.href}
              className={`nav-item ${isActive ? "active-nav-item" : ""}`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        )
      })
    )
  }   

  const NavBarMenuItems = () => {
    return menu.map((item, index) => (
      <NavbarMenuItem key={item.href}>
        <Link 
          href={item.href}
          className="mb-2 w-full" 
          onClick={() => setIsMenuOpen(false)}
        >
          {item.label}
        </Link>
        {index < menu.length - 1 && <Divider className="opacity-50" />}
      </NavbarMenuItem>
    ))
  }

  return (
    <Navbar
      {...props}
      classNames={{
        base: cn("border-default-100 h-[65px] md:h-[100px]", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-between",
        item: "hidden md:flex"
      }}
      style={{position: "fixed"}}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <Link 
        href="/"
        onClick={() => setIsMenuOpen(false)}
      >
        <NavbarBrand>
          <span className="font-nunito text-lg font-bold">WhiskersTails</span>
        </NavbarBrand>
      </Link>

      <NavbarContent justify="center">
        {NavBarItems()}
      </NavbarContent>

      <NavbarContent className="hidden md:flex !grow-0" justify="end">
        <NavbarItem className="ml-2 flex! gap-2">
          {status === "loading" ? 
            <Button 
              isLoading 
              radius="full" 
              variant="light"
              className="dark-scheme-button-white"
            >
              Загрузка...
            </Button> 
          : 
            !isAuth ? (
              <>
                <Button 
                  radius="full" 
                  className="bg-white"
                  onPress={() => setIsLoginOpen(true)}
                >
                  Войти
                </Button>
                <Button
                  color="primary"
                  radius="full"
                  className="font-medium"
                  endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                  onPress={() => setIsRegistrationOpen(true)}
                >
                  Зарегистрироваться
                </Button>
              </>
            ) : (
              <>
                <Link href="/account">
                  <Button 
                    radius="full"
                    className="bg-white"
                  >
                    {session?.user?.name}
                  </Button>
                </Link>
                <Button
                  color="primary"
                  radius="full"
                  className="font-medium"
                  endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                  onPress={handleSignOut}
                >
                  Выйти
                </Button>
              </>
            )
          }
        </NavbarItem>
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="bg-default-200/50 shadow-medium dark:bg-default-100/50 top-[calc(var(--navbar-height)-1px)] max-h-fit pt-6 pb-6 backdrop-blur-md backdrop-saturate-150">
        {status === "loading" ?
            <Button 
              isLoading 
              radius="full" 
              variant="light"
              className="dark-scheme-button-white"
            >
              Загрузка...
            </Button> 
          : !isAuth ? (
            <>
              <NavbarMenuItem>
                <Button 
                  fullWidth 
                  variant="faded"
                  onPress={() => {
                    setIsMenuOpen(false)
                    setIsLoginOpen(true)
                  }}
                >
                  Войти
                </Button>
              </NavbarMenuItem>
              <NavbarMenuItem className="mb-4">
                <Button 
                  fullWidth 
                  color="primary"
                  onPress={() => {
                    setIsMenuOpen(false)
                    setIsRegistrationOpen(true)
                  }}
                >
                  Зарегистрироваться
                </Button>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link 
                  href="/account"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button 
                    fullWidth 
                    variant="faded"
                  >
                    {session?.user?.name}
                  </Button>
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem className="mb-4">
                <Button 
                  fullWidth 
                  color="primary"
                  onPress={handleSignOut}
                >
                  Выйти
                </Button>
              </NavbarMenuItem>
            </>
          )
        }
        {NavBarMenuItems()}
      </NavbarMenu>

      <LoginnModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setIsRegistrationOpen={() => setIsRegistrationOpen(true)}
      />
      
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        setIsLoginOpen={() => setIsLoginOpen(true)}
      /> 
    </Navbar>
  )
}

export default Header