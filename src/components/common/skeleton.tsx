"use client"

import { Card, Skeleton as SkeletonHeroui} from "@heroui/react"

const Skeleton = () => {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <SkeletonHeroui className="rounded-lg">
        <div className="h-60 md:h-40 rounded-lg bg-default-300" />
      </SkeletonHeroui>
      <div className="space-y-3">
        <SkeletonHeroui className="w-3/5 rounded-lg">
          <div className="h-15 w-3/5 rounded-lg bg-default-200" />
        </SkeletonHeroui>
        <SkeletonHeroui className="w-4/5 rounded-lg">
          <div className="h-15 w-4/5 rounded-lg bg-default-200" />
        </SkeletonHeroui>
        <SkeletonHeroui className="w-2/5 rounded-lg">
          <div className="h-15 w-2/5 rounded-lg bg-default-300" />
        </SkeletonHeroui>
      </div>
    </Card>
  )
}

export default Skeleton
