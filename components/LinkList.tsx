"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@/data/links"
import {
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandGithub,
  IconBook,
  IconBriefcase,
  IconLink,
  IconArrowUpRight,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { db } from "@/lib/firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const linkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "링크 제목을 입력해주세요."),
  url: z
    .string()
    .trim()
    .min(1, "링크 URL을 입력해주세요.")
    .transform((val) => {
      if (!/^https?:\/\//i.test(val)) {
        return `https://${val}`
      }
      return val
    })
    .refine((val) => {
      try {
        new URL(val)
        return true
      } catch (err) {
        return false
      }
    }, "올바른 형식의 URL을 입력해주세요. (예: example.com)"),
})

type LinkFormValues = z.infer<typeof linkSchema>

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

function LinkItem({ link, onRefresh }: { link: Link; onRefresh?: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const Icon = getLinkIcon(link.title)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
    },
    mode: "onChange",
  })

  const onEditSubmit = async (data: LinkFormValues) => {
    try {
      const linkRef = doc(db, "users", "anonymous", "links", link.id)
      await updateDoc(linkRef, {
        title: data.title,
        url: data.url,
      })
      setIsEditing(false)
      if (onRefresh) onRefresh()
    } catch (error) {
      console.error("Error updating link", error)
      alert("링크 수정 중 오류가 발생했습니다.")
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const linkRef = doc(db, "users", "anonymous", "links", link.id)
      await deleteDoc(linkRef)
      setIsDeleteDialogOpen(false)
      if (onRefresh) onRefresh()
    } catch (error) {
      console.error("Error deleting link", error)
      alert("링크 삭제 중 오류가 발생했습니다.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isEditing) {
      e.preventDefault()
      return
    }
    console.log(
      `[MyLink Analytics] Link clicked: ${link.title} | URL: ${link.url} | Current Clicks: ${link.clicks}`
    )
    window.open(link.url, "_blank", "noopener,noreferrer")
  }

  if (isEditing) {
    return (
      <Card className="border-primary/45 bg-accent/40 shadow-md dark:bg-zinc-900/50 transition-all duration-300">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit(onEditSubmit)} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex flex-col gap-1.5 text-left">
                <input
                  type="text"
                  placeholder="링크 제목"
                  {...register("title")}
                  className={`w-full rounded-none border bg-background px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 outline-none transition-all focus-visible:ring-1 ${
                    errors.title
                      ? "border-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20 dark:border-destructive/50 dark:focus-visible:ring-destructive/40"
                      : "border-border focus-visible:border-primary focus-visible:ring-primary/40 dark:border-zinc-800 dark:bg-zinc-900/50"
                  }`}
                />
                {errors.title && (
                  <p className="text-[10.5px] font-medium text-destructive mt-0.5">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1.5 text-left">
                <input
                  type="text"
                  placeholder="example.com"
                  {...register("url")}
                  className={`w-full rounded-none border bg-background px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 outline-none transition-all focus-visible:ring-1 ${
                    errors.url
                      ? "border-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20 dark:border-destructive/50 dark:focus-visible:ring-destructive/40"
                      : "border-border focus-visible:border-primary focus-visible:ring-primary/40 dark:border-zinc-800 dark:bg-zinc-900/50"
                  }`}
                />
                {errors.url && (
                  <p className="text-[10.5px] font-medium text-destructive mt-0.5">
                    {errors.url.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  reset({ title: link.title, url: link.url })
                  setIsEditing(false)
                }}
                className="cursor-pointer h-8 rounded-none"
              >
                취소
              </Button>
              <Button type="submit" size="sm" disabled={isSubmitting} className="cursor-pointer h-8 rounded-none">
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="group relative block w-full transition-all duration-300 hover:-translate-y-0.5">
        <Card className="border-border/40 bg-background/50 backdrop-blur-md transition-all duration-300 group-hover:border-primary/45 group-hover:bg-accent/40 group-hover:shadow-md dark:bg-zinc-950/40 dark:group-hover:bg-zinc-900/50 relative overflow-hidden">
          <CardContent className="flex items-center justify-between p-4 relative z-10">
            {/* Clickable Area */}
            <div 
              className="flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer"
              onClick={handleLinkClick}
            >
              {/* 아이콘 컨테이너 */}
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
            
            <div className="flex items-center gap-2 shrink-0 ml-4">
              {/* 클릭 수 배지 */}
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground/90 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary dark:bg-zinc-800/80 cursor-default mr-1">
                <IconEye className="h-3 w-3" />
                {link.clicks}
              </span>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-md px-1 py-1 sm:bg-transparent sm:backdrop-blur-none">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  title="수정"
                >
                  <IconEdit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteDialogOpen(true);
                  }}
                  title="삭제"
                >
                  <IconTrash className="h-4 w-4" />
                </Button>
              </div>
              
              {/* 화살표 아이콘 */}
              <IconArrowUpRight className="h-4.5 w-4.5 text-muted-foreground/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary ml-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="border border-border bg-background p-6 shadow-xl dark:bg-zinc-950 max-w-xs rounded-none">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold tracking-tight text-foreground text-center">정말 삭제하시겠습니까?</DialogTitle>
            <DialogDescription className="text-xs text-center mt-2 flex flex-col gap-1.5">
              <span className="font-medium text-foreground">"{link.title}"</span>
              <span className="text-destructive font-medium">이 작업은 되돌릴 수 없습니다.</span>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="cursor-pointer rounded-none flex-1"
              disabled={isDeleting}
            >
              취소
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm" 
              onClick={handleDelete}
              disabled={isDeleting} 
              className="cursor-pointer rounded-none flex-1"
            >
              {isDeleting ? "삭제 중..." : "삭제하기"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface LinkListProps {
  links: Link[]
  onRefresh?: () => void
}

export function LinkList({ links, onRefresh }: LinkListProps) {
  return (
    <div className="flex w-full flex-col gap-3.5">
      {links.map((link) => (
        <LinkItem key={link.id} link={link} onRefresh={onRefresh} />
      ))}
    </div>
  )
}
