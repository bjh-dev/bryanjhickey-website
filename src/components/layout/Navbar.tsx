'use client'

import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { getLinkByLinkObject } from '@/lib/links'
import { cn } from '@/lib/utils'
import { SettingsQueryResult } from '@/types/sanity.types'
import Link from 'next/link'
import { useState } from 'react'

export default function NavBar({
  menuItems,
}: {
  menuItems: NonNullable<NonNullable<SettingsQueryResult>['menu']>
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-1 items-center justify-end">
      {/* Desktop Navigation */}
      <div className="hidden items-center space-x-6 md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item._key}>
                {item.childMenu ? (
                  // Dropdown menu for items with children
                  <>
                    <NavigationMenuTrigger
                      className={cn(navigationMenuTriggerStyle())}
                    >
                      {item.text}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[200px] p-1">
                        {item.childMenu.map((child) => (
                          <NavigationMenuLink key={child._key} asChild>
                            <Link
                              href={
                                child.link
                                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (getLinkByLinkObject(child.link as any) ??
                                    '#')
                                  : '#'
                              }
                              className="block rounded-md p-2 hover:bg-gray-100"
                              {...(child.link?.openInNewTab
                                ? {
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                  }
                                : {})}
                            >
                              {child.text}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  // Simple link for items without children
                  <NavigationMenuLink asChild>
                    <Link
                      href={
                        item.link
                          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (getLinkByLinkObject(item.link as any) ?? '#')
                          : '#'
                      }
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'cursor-pointer',
                      )}
                      {...(item.link?.openInNewTab
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {item.text}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="text-gray-800 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="sr-only">Navbar Icon</div>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isMobileMenuOpen
                ? 'M6 18L18 6M6 6l12 12'
                : 'M4 6h16M4 12h16M4 18h16'
            }
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={cn(
          'absolute top-full right-0 left-0 z-50 origin-top transform bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
        )}
      >
        <div className="px-4 py-2">
          {menuItems.map((item) => (
            <div key={item._key}>
              {item.childMenu ? (
                // Parent item with children
                <>
                  <div className="px-4 py-2 font-medium">{item.text}</div>
                  <div className="pl-4">
                    {item.childMenu.map((child) => (
                      <Link
                        key={child._key}
                        href={
                          child.link
                            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (getLinkByLinkObject(child.link as any) ?? '#')
                            : '#'
                        }
                        className="block rounded-md px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                        {...(child.link?.openInNewTab
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {child.text}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                // Single menu item
                <Link
                  href={
                    item.link
                      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (getLinkByLinkObject(item.link as any) ?? '#')
                      : '#'
                  }
                  className="block rounded-md px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                  {...(item.link?.openInNewTab
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {item.text}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-4 flex flex-col space-y-2 p-4">
            <Button asChild variant="outline">
              <Link href="/booking">Book a Time with Bryan</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
