"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Tabs as TabsPrimitive } from "radix-ui"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "h-8 rounded-lg bg-muted p-[3px]",
        chips: "flex-wrap gap-2 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 motion-reduce:transition-none",
        "group-data-[variant=default]/tabs-list:h-[calc(100%-1px)] group-data-[variant=default]/tabs-list:flex-1 group-data-[variant=default]/tabs-list:rounded-md group-data-[variant=default]/tabs-list:border group-data-[variant=default]/tabs-list:border-transparent group-data-[variant=default]/tabs-list:px-1.5 group-data-[variant=default]/tabs-list:py-0.5 group-data-[variant=default]/tabs-list:text-sm group-data-[variant=default]/tabs-list:font-medium group-data-[variant=default]/tabs-list:text-foreground/60 group-data-[variant=default]/tabs-list:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:bg-background group-data-[variant=default]/tabs-list:data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm",
        "group-data-[variant=chips]/tabs-list:rounded-2xl group-data-[variant=chips]/tabs-list:border group-data-[variant=chips]/tabs-list:border-border group-data-[variant=chips]/tabs-list:bg-white group-data-[variant=chips]/tabs-list:px-5 group-data-[variant=chips]/tabs-list:py-[11px] group-data-[variant=chips]/tabs-list:font-heading group-data-[variant=chips]/tabs-list:text-xs group-data-[variant=chips]/tabs-list:leading-[1.15] group-data-[variant=chips]/tabs-list:font-semibold group-data-[variant=chips]/tabs-list:text-ink group-data-[variant=chips]/tabs-list:uppercase group-data-[variant=chips]/tabs-list:hover:border-ink group-data-[variant=chips]/tabs-list:hover:bg-ink group-data-[variant=chips]/tabs-list:hover:text-highlight group-data-[variant=chips]/tabs-list:data-active:border-highlight group-data-[variant=chips]/tabs-list:data-active:bg-highlight group-data-[variant=chips]/tabs-list:data-active:text-ink group-data-[variant=chips]/tabs-list:data-active:hover:border-highlight-hover group-data-[variant=chips]/tabs-list:data-active:hover:bg-highlight-hover group-data-[variant=chips]/tabs-list:data-active:hover:text-ink group-data-[variant=chips]/tabs-list:active:scale-95",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
