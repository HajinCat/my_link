"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link } from "@/data/links"
import { LinkList } from "@/components/LinkList"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconPlus, IconLoader2 } from "@tabler/icons-react"

// Zod 유효성 검사 스키마 정의
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
      // 프로토콜(http/https)이 포함되지 않은 경우 기본적으로 https:// 추가
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

export function LinkDashboard() {
  const [links, setLinks] = useState<Link[]>([])
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "users", "anonymous", "links"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedLinks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        url: doc.data().url,
        clicks: doc.data().clicks || 0,
      })) as Link[];
      setLinks(fetchedLinks);
    } catch (error) {
      console.error("Error fetching links: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
    mode: "onChange", // 입력 값 변경 시 실시간 검증을 진행해 에러 상태를 즉각 업데이트합니다.
  })

  // 다이얼로그 열림/닫힘 상태 핸들러
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      reset() // 닫힐 때 폼 초기화
    }
  }

  // 취소 버튼 핸들러
  const handleCancel = () => {
    reset()
    setOpen(false)
  }

  // 폼 제출 완료 핸들러
  const onSubmit = async (data: LinkFormValues) => {
    try {
      const linkData = {
        title: data.title,
        url: data.url, // Zod transform에 의해 포맷팅 완료된 URL
        clicks: 0,
        createdAt: new Date().toISOString(),
      };

      // Firestore의 users/anonymous/links 경로에 문서 추가
      await addDoc(collection(db, "users", "anonymous", "links"), linkData);

      // 데이터 갱신 (로딩 표시 활성화)
      await fetchLinks();

      reset()
      setOpen(false)
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("링크를 추가하는 중 오류가 발생했습니다.");
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={handleOpenChange}>
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

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
              {/* 링크 제목 입력 필드 */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="link-title" className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  링크 제목
                </label>
                <input
                  id="link-title"
                  type="text"
                  placeholder="예: GitHub, Blog, YouTube 등"
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

              {/* 링크 URL 입력 필드 */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="link-url" className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  링크 URL
                </label>
                <input
                  id="link-url"
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

              {/* 폼 하단 작업 버튼 */}
              <div className="mt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="cursor-pointer rounded-none"
                >
                  취소
                </Button>
                <Button type="submit" size="sm" disabled={isSubmitting} className="cursor-pointer rounded-none">
                  {isSubmitting ? "추가 중..." : "추가하기"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex h-32 w-full flex-col items-center justify-center gap-3">
          <IconLoader2 className="h-5 w-5 animate-spin text-primary/60" />
          <p className="text-xs font-medium text-muted-foreground animate-pulse">링크를 불러오는 중입니다...</p>
        </div>
      ) : (
        <LinkList links={links} onRefresh={fetchLinks} />
      )}
    </div>
  )
}
