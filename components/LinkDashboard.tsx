"use client"

import * as React from "react"
import { useState } from "react"
import { dummyLinks, Link } from "@/data/links"
import { LinkList } from "@/components/LinkList"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconPlus } from "@tabler/icons-react"

export function LinkDashboard() {
  const [links, setLinks] = useState<Link[]>(dummyLinks)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 유효성 검사 (빈 값 체크)
    if (!title.trim()) {
      setError("링크 제목을 입력해주세요.")
      return
    }

    if (!url.trim()) {
      setError("링크 URL을 입력해주세요.")
      return
    }

    let formattedUrl = url.trim()
    // 프로토콜이 없는 경우 https:// 기본 추가
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`
    }

    // URL 유효성 최종 검증
    try {
      new URL(formattedUrl)
    } catch (err) {
      setError("올바른 형식의 URL을 입력해주세요. (예: example.com)")
      return
    }

    // 새 링크 객체 생성
    const newLink: Link = {
      id: Date.now().toString(),
      title: title.trim(),
      url: formattedUrl,
      clicks: 0,
    }

    setLinks((prev) => [...prev, newLink])

    // 상태 초기화 및 닫기
    setTitle("")
    setUrl("")
    setOpen(false)
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1.5 border-dashed border-primary/40 hover:border-primary transition-all duration-300 font-medium rounded-none"
              />
            }
          >
            <IconPlus className="h-4 w-4 text-primary" />
            링크 추가
          </DialogTrigger>
          <DialogContent className="border border-border bg-background p-6 shadow-xl dark:bg-zinc-950 max-w-sm rounded-none">
            <DialogHeader>
              <DialogTitle className="text-sm font-bold tracking-tight text-foreground">새 링크 추가</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-1">
                프로필에 표시할 새로운 링크 정보를 입력해주세요.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="link-title" className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  링크 제목
                </label>
                <input
                  id="link-title"
                  type="text"
                  placeholder="예: GitHub, Blog, YouTube 등"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-none border border-border bg-background px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 outline-none transition-all focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 dark:border-zinc-800 dark:bg-zinc-900/50"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="link-url" className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  링크 URL
                </label>
                <input
                  id="link-url"
                  type="text"
                  placeholder="example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-none border border-border bg-background px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 outline-none transition-all focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/40 dark:border-zinc-800 dark:bg-zinc-900/50"
                  required
                />
              </div>

              {error && (
                <p className="text-[11px] font-medium text-destructive text-left">
                  {error}
                </p>
              )}

              <div className="mt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setError(null)
                    setTitle("")
                    setUrl("")
                    setOpen(false)
                  }}
                  className="cursor-pointer rounded-none"
                >
                  취소
                </Button>
                <Button type="submit" size="sm" className="cursor-pointer rounded-none">
                  추가하기
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <LinkList links={links} />
    </div>
  )
}
