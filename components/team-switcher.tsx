"use client"

import * as React from "react"
import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function CompanyLogo() {


  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Image src="/images/logo/logo_small_light.svg" height={20} width={20} alt="logo" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          SpeedUploads
        </span>

      </div>
    </SidebarMenuButton>

  )
}
