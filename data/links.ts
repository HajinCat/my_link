export interface Link {
  id: string;
  title: string;
  url: string;
  clicks: number;
}

export const dummyLinks: Link[] = [
  {
    id: "1",
    title: "Instagram",
    url: "https://instagram.com",
    clicks: 12,
  },
  {
    id: "2",
    title: "YouTube",
    url: "https://youtube.com",
    clicks: 45,
  },
  {
    id: "3",
    title: "Blog",
    url: "https://example.com/blog",
    clicks: 140,
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com",
    clicks: 89,
  },
  {
    id: "5",
    title: "Portfolio",
    url: "https://example.com/portfolio",
    clicks: 23,
  },
];
