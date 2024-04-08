"use client"

import Image from "next/image"
import { Post } from "@/types"
import { Carousel, type CustomFlowbiteTheme } from "flowbite-react"

import { formatDate } from "@/lib/utils"

import { Icons } from "./icons"

interface BlogHighlightCarouselProps {
  topPosts: Post[]
}

const customTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "flex flex-col items-center justify-center h-[360px] w-full gap-8 px-8 relative",
    leftControl:
      "absolute transform left-0 -translate-x-3/4 bottom-1/2 focus:outline-none",
    rightControl:
      "absolute right-0 translate-x-3/4 bottom-1/2 focus:outline-none",
  },
  indicators: {
    active: {
      off: "bg-black/50 hover:bg-white dark:bg-gray-800 dark:hover:bg-muted-foreground",
      on: "bg-muted-foreground dark:bg-gray-800",
    },
    base: "h-3 w-3 rounded-full",
    wrapper: "flex justify-center gap-2 bottom-4",
  },
  item: {
    base: "relative flex w-full h-full",
    wrapper: {
      off: "w-full h-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full h-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex snap-mandatory overflow-y-hidden scroll-smooth w-full",
    snap: "snap-x",
  },
}

const leftControl = (
  <button className="outline-border hover:bg-muted dark:outline-muted-foreground rounded-full p-4 outline">
    <Icons.chevronLeft />
  </button>
)
const rightControl = (
  <button className="outline-border hover:bg-muted dark:outline-muted-foreground rounded-full p-4 outline">
    <Icons.chevronRight />
  </button>
)

export default function BlogHighlightCarousel({
  topPosts,
}: BlogHighlightCarouselProps) {
  return (
    <div className="flex h-full px-8">
      <Carousel
        leftControl={leftControl}
        rightControl={rightControl}
        pauseOnHover
        theme={customTheme}
      >
        {topPosts.map((post, index) => (
          <div
            key={index}
            // className="relative flex w-full flex-col items-center justify-center gap-8 px-8 py-4 md:flex-row"
            className="grid grid-rows-2 gap-12 md:grid-cols-2 md:grid-rows-1"
          >
            <div className="border-border flex h-full w-full flex-1 items-center overflow-hidden rounded-xl border-2 p-4">
              <Image
                src={post.feature_image}
                height={400}
                width={600}
                alt="..."
                className="rounded-xl"
              />
            </div>
            <div className="h-full w-full flex-1 flex-col items-start justify-start p-4">
              <div className="text-md text-muted-foreground">
                {formatDate(post.published_at)}
              </div>

              <div className="flex text-3xl font-extrabold xl:text-4xl">
                {post.title}
              </div>
              <div className="before:bg-gradient-to-gray before:to-gray flex h-full overflow-hidden py-4 before:absolute before:inset-0 before:from-transparent before:content-['']">
                <p className="z-10 flex">{post.excerpt}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
