"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-5" />
        ),
        info: (
          <InfoIcon className="size-5" />
        ),
        warning: (
          <TriangleAlertIcon className="size-5" />
        ),
        error: (
          <OctagonXIcon className="size-5" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "cn-toast !items-start !gap-3 !rounded-lg !border !border-border !bg-white !p-3.5 !pr-4 !text-ink !shadow-[0_10px_30px_-10px_rgb(10_10_10/0.25)]",
          title: "!text-[13px] !leading-[1.3] !font-semibold",
          description: "!text-xs !text-ink-muted",
          icon: "!mt-px !size-5 !shrink-0",
          success: "[&_[data-icon]]:!text-status-paid",
          error: "[&_[data-icon]]:!text-status-failed",
          warning: "[&_[data-icon]]:!text-status-pending",
          info: "[&_[data-icon]]:!text-ink-muted",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
