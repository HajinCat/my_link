import { Metadata } from "next"
import { LinkList } from "@/components/LinkList"
import { IconDeviceLaptop } from "@tabler/icons-react"

export const metadata: Metadata = {
  title: "MyLink - Hajin's Link Profile",
  description: "Explore all portfolios, social channels, and project links of Hajin in one place.",
}

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-radial from-background via-muted/30 to-background px-4 py-16 md:px-8">
      {/* 백그라운드 블러 오너먼트 (프리미엄 디자인 디테일) */}
      <div className="absolute top-[-20%] left-[-20%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="z-10 flex w-full max-w-md flex-col items-center gap-8 text-center">
        {/* 프로필 섹션 */}
        <header className="flex flex-col items-center">
          {/* 아바타 데코레이션 */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-primary via-violet-500 to-indigo-500 p-[3px] shadow-xl shadow-primary/10 transition-transform duration-500 hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background font-bold text-2xl text-foreground select-none">
              H
            </div>
            {/* 배지 형태의 데코레이션 */}
            <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground border-2 border-background shadow-md">
              <IconDeviceLaptop className="h-3.5 w-3.5" />
            </span>
          </div>

          <h1 id="profile-title" className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Hajin
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-[280px]">
            Frontend Developer & Creator. Crafting beautiful web experiences.
          </p>
        </header>

        {/* 링크 목록 섹션 */}
        <section id="links-container" className="w-full">
          <LinkList />
        </section>

        {/* 안내 힌트 (다크 모드) */}
        <div id="theme-tip" className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/50 px-3 py-1 text-[11px] font-mono text-muted-foreground/80 shadow-xs backdrop-blur-xs select-none">
          <kbd className="pointer-events-none h-4.5 inline-flex items-center justify-center rounded border border-border bg-muted px-1.5 font-sans text-[10px] font-medium text-muted-foreground">
            D
          </kbd>
          <span>키를 눌러 테마를 전환할 수 있습니다.</span>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="z-10 mt-16 text-center text-xs text-muted-foreground/60 select-none">
        <p>© 2026 MyLink. All rights reserved.</p>
      </footer>
    </main>
  )
}

