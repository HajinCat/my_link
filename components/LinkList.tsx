"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { dummyLinks, Link } from "@/data/links"
import {
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandGithub,
  IconBook,
  IconBriefcase,
  IconLink,
  IconArrowUpRight,
  IconEye,
} from "@tabler/icons-react"

// 타이틀에 따른 Tabler Icon 동적 매핑 함수
const getLinkIcon = (title: string) => {
  const t = title.toLowerCase()
  if (t.includes("instagram")) return IconBrandInstagram
  if (t.includes("youtube")) return IconBrandYoutube
  if (t.includes("github")) return IconBrandGithub
  if (t.includes("blog")) return IconBook
  if (t.includes("portfolio")) return IconBriefcase
  return IconLink
}

export function LinkList() {
  const handleLinkClick = (link: Link) => {
    // 로드맵의 클릭 분석(Click Analytics)을 대비한 로깅 시스템
    console.log(
      `[MyLink Analytics] Link clicked: ${link.title} | URL: ${link.url} | Current Clicks: ${link.clicks}`
    )
  }

  return (
    <div className="flex w-full flex-col gap-3.5">
      {dummyLinks.map((link) => {
        const Icon = getLinkIcon(link.title)
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick(link)}
            className="group block w-full transition-all duration-300 hover:-translate-y-0.5"
          >
            <Card className="border-border/40 bg-background/50 backdrop-blur-md transition-all duration-300 group-hover:border-primary/45 group-hover:bg-accent/40 group-hover:shadow-md dark:bg-zinc-950/40 dark:group-hover:bg-zinc-900/50">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* 아이콘 컨테이너: 호버 시 브랜드 테마로 변화하는 듯한 효과 */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="font-semibold text-foreground tracking-wide text-sm transition-colors duration-200 group-hover:text-primary">
                      {link.title}
                    </span>
                    <span className="text-xs text-muted-foreground/80 truncate max-w-[180px] sm:max-w-[260px]">
                      {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                  {/* 클릭 수 배지 */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground/90 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary dark:bg-zinc-800/80">
                    <IconEye className="h-3 w-3" />
                    {link.clicks}
                  </span>
                  
                  {/* 화살표 아이콘 */}
                  <IconArrowUpRight className="h-4.5 w-4.5 text-muted-foreground/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
              </CardContent>
            </Card>
          </a>
        )
      })}
    </div>
  )
}
