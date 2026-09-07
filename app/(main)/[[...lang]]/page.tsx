import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatButton } from "@/components/ui/chat-button";
import { InquiryForm } from "@/components/ui/inquiry-form";
import { isUsedInquiryDirectly } from "@/lib/features";
import axios from "axios";
import * as cheerio from "cheerio";
import {
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Code,
  ExternalLink,
  Github,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export const runtime = "edge";

interface BlogResponse {
  title: string;
  url: string;
  description: string;
}

interface SkillCategory {
  title: string;
  icon: ReactNode;
  items: string[];
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  isCurrent?: boolean;
}

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string | null;
  siteUrl: string;
  siteLabel: string;
}

const locales = {
  en: () => import("@/locale/en.json").then((module) => module.default),
  ja: () => import("@/locale/ja.json").then((module) => module.default),
};

async function fetchBlogData() {
  const { data } = await axios.get("https://blog.nekohack.me");
  const $ = cheerio.load(data);
  const list = $("#blogMain li article h3 a");
  const items: BlogResponse[] = [];
  list.each((index, element) => {
    const title = $(element).text();
    const url = $(element).attr("href") ?? "";
    const description = $(element).closest("article").find("p").text();
    items.push({ title, url, description });
  });
  return items;
}

const getSkillCategories = (dict: Record<string, any>): SkillCategory[] => [
  {
    title: dict.skills.frontend,
    icon: <Code className="h-6 w-6" />,
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "Svelte",
      "Objective-C",
      "Swift",
      "Java",
      "Kotlin",
      "Dart",
      "Flutter",
    ],
  },
  {
    title: dict.skills.backend,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M2 9h20M9 20h6M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      </svg>
    ),
    items: [
      "Node.js",
      "Express",
      "Java",
      "Scala",
      "Firebase",
      "Supabase",
      "REST API",
      "GraphQL API",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "GCP",
      "Azure",
      "Netlify",
      "Vercel",
      "Cloudflare",
    ],
  },
  {
    title: dict.skills.tools,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    items: [
      "OpenAI (ChatGPT)",
      "Anthropic (Claude)",
      "Google (Gemini)",
      "Git",
      "GitHub",
      "GitLab",
      "Docker",
      "CI/CD",
      "Jest",
      "Vitest",
      "Testing Library",
      "Vite",
      "Webpack",
      "Figma",
      "Miro",
      "Agile",
      "Scrum",
    ],
  },
];

const getExperiences = (dict: Record<string, any>): Experience[] => [
  {
    company: "wevnal inc.",
    role: dict.experience.roles.wevnal.title,
    period: `2023 - ${dict.experience.present}`,
    description: dict.experience.roles.wevnal.description,
    tags: [
      "Team Leadership",
      "Scenario Development",
      "Technical Architecture",
      "Code Reviews",
    ],
    isCurrent: true,
  },
  {
    company: "vcube inc.",
    role: dict.experience.roles.vcube.title,
    period: "2021 - 2023",
    description: dict.experience.roles.vcube.description,
    tags: ["AWS", "React", "TypeScript", "Frontend Architecture"],
  },
  {
    company: "smaregi inc.",
    role: dict.experience.roles.smaregi.title,
    period: "2019 - 2021",
    description: dict.experience.roles.smaregi.description,
    tags: ["AWS", "Vue", "React", "TypeScript", "API Architecture"],
  },
  {
    company: "ponos inc.",
    role: dict.experience.roles.ponos.title,
    period: "2016 - 2019",
    description: dict.experience.roles.ponos.description,
    tags: [
      "HTML/CSS",
      "JavaScript",
      "Vue",
      "Java/Scala",
      "PHP",
      "Responsive Design",
    ],
  },
];

const getProjects = (dict: any): Project[] => [
  {
    title: "Tracc",
    subtitle: dict.projects.items.tracc.subtitle,
    description: dict.projects.items.tracc.description,
    image: "/projects/tracc.png?height=280&width=420",
    tags: [
      "Flutter",
      "Dart",
      "TypeScript",
      "Node.js",
      "Firebase",
      "Cloudflare",
      "AWS S3",
      "React (partially)",
      "Remix (partially)",
    ],
    githubUrl: null,
    siteUrl: "https://brand.tracc.jp/",
    siteLabel: dict.projects.brandWebsite,
  },
  {
    title: "Luma Portal",
    subtitle: dict.projects.items.lumaPortal.subtitle,
    description: dict.projects.items.lumaPortal.description,
    image: "/projects/luma-portal.png?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Cloudflare", "D1"],
    githubUrl: null,
    siteUrl: "https://luma-portal.nekohack.me/",
    siteLabel: dict.projects.brandWebsite,
  },
  {
    title: "Rocket Form",
    subtitle: dict.projects.items.rocketForm.subtitle,
    description: dict.projects.items.rocketForm.description,
    image: "/projects/rocket-form.png?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Cloudflare", "D1"],
    githubUrl: null,
    siteUrl: "https://rocket-form.nekohack.me/",
    siteLabel: dict.projects.brandWebsite,
  },
  {
    title: "Commitment Board",
    subtitle: dict.projects.items.commitmentBoard.subtitle,
    description: dict.projects.items.commitmentBoard.description,
    image: "/projects/commitment-board.png?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Cloudflare", "D1"],
    githubUrl: null,
    siteUrl: "https://commitment-board.nekohack.me",
    siteLabel: dict.projects.brandWebsite,
  },
  {
    title: "DL (DeepLink Redirect)",
    subtitle: dict.projects.items.deeplinkRedirect.subtitle,
    description: dict.projects.items.deeplinkRedirect.description,
    image: "/projects/deeplink-redirect.png?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Cloudflare", "D1"],
    githubUrl: null,
    siteUrl: "https://dl.nekohack.me",
    siteLabel: dict.projects.productWebsite,
  },
  {
    title: "IMGO (Image Go)",
    subtitle: dict.projects.items.imgo.subtitle,
    description: dict.projects.items.imgo.description,
    image: "/projects/imgo.png?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Rust", "Cloudflare", "Cloud Run"],
    githubUrl: null,
    siteUrl: "https://imgo.nekohack.me",
    siteLabel: dict.projects.productWebsite,
  },
  {
    title: "Newspaper",
    subtitle: dict.projects.items.newspaper.subtitle,
    description: dict.projects.items.newspaper.description,
    image: "/projects/newspaper.png?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Cloudflare", "Google Gemini"],
    githubUrl: "https://github.com/nekohack/portal",
    siteUrl: "https://newspaper.nekohack.me",
    siteLabel: dict.projects.productWebsite,
  },
  {
    title: "nekohack Portal",
    subtitle: dict.projects.items.nekohackPortal.subtitle,
    description: dict.projects.items.nekohackPortal.description,
    image: "/projects/nekohack-portal.png?height=280&width=420",
    tags: ["Next.js", "React", "Tailwind CSS", "v0"],
    githubUrl: "https://github.com/nekohack/portal",
    siteUrl: "https://nekohack.me",
    siteLabel: dict.projects.productWebsite,
  },
  {
    title: "Multi Post Dash",
    subtitle: dict.projects.items.multiPostDash.subtitle,
    description: dict.projects.items.multiPostDash.description,
    image: "/projects/multi-post-dash.png?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Cloudflare"],
    githubUrl: "https://github.com/jiyuujin/multi-post-dash",
    siteUrl: "https://multi-post.nekohack.me",
    siteLabel: dict.projects.productWebsite,
  },
  {
    title: "Sheer Community",
    subtitle: dict.projects.items.sheerCommunity.subtitle,
    description: dict.projects.items.sheerCommunity.description,
    image: "/projects/sheer-community.png?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Cloudflare"],
    githubUrl: "https://github.com/nekohack/portal",
    siteUrl: "https://sheer-community.nekohack.me",
    siteLabel: dict.projects.productWebsite,
  },
  {
    title: "KARAOKE BINGO",
    subtitle: dict.projects.items.karaokeBingo.subtitle,
    description: dict.projects.items.karaokeBingo.description,
    image: "/projects/karaoke-bingo.png?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Cloudflare", "D1"],
    githubUrl: "https://github.com/nekohack/portal",
    siteUrl: "https://karaoke-bingo.nekohack.me",
    siteLabel: dict.projects.productWebsite,
  },
  {
    title: "JetPhoto Community",
    subtitle: dict.projects.items.jetPhotoCommunity.subtitle,
    description: dict.projects.items.jetPhotoCommunity.description,
    image: "/projects/jetphoto-community-b747.jpg?height=280&width=420",
    tags: ["TypeScript", "Node.js", "Cloudflare", "D1", "AWS S3"],
    githubUrl: "https://github.com/nekohack/jetphoto-community",
    siteUrl: "https://jetphoto-community.nekohack.me",
    siteLabel: dict.projects.productWebsite,
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ lang?: string[] }>;
}) {
  const resolvedParams = await params;
  const rawLang = resolvedParams.lang?.[0];
  const lang = (rawLang === "en" ? "en" : "ja") as "ja" | "en";

  const getLocale = locales[lang] ?? locales.ja;
  const dict = await getLocale();
  const items = await fetchBlogData();

  const langPath = resolvedParams.lang?.[0] ? `/${lang}` : "";
  const skillCategories = getSkillCategories(dict);
  const experiences = getExperiences(dict);
  const projects = getProjects(dict);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-400 selection:text-zinc-950">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href={langPath || "/"} className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight text-white hover:text-amber-400 transition-colors">
              YUMA Kitamura
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400"
            >
              {dict.nav.about}
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400"
            >
              {dict.nav.skills}
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400"
            >
              {dict.nav.experience}
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400"
            >
              {dict.nav.projects}
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400"
            >
              {dict.nav.contact}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/jiyuujin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="GitHub"
                className="text-zinc-300 hover:text-amber-400 hover:bg-zinc-900"
              >
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://times.nekohack.me/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Mastodon"
                className="text-zinc-300 hover:text-amber-400 hover:bg-zinc-900"
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                  YUMA Kitamura
                </h1>
                <p className="mt-2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 font-semibold">
                  {dict.hero.role}
                </p>
              </div>
              <p className="text-lg text-zinc-400">{dict.hero.description}</p>
              <div className="flex flex-wrap gap-3">
                <Badge className="px-3 py-1 text-sm bg-amber-950/80 text-amber-300 border border-amber-800 hover:bg-amber-900">
                  React
                </Badge>
                <Badge className="px-3 py-1 text-sm bg-amber-950/80 text-amber-300 border border-amber-800 hover:bg-amber-900">
                  Flutter
                </Badge>
                <Badge className="px-3 py-1 text-sm bg-amber-950/80 text-amber-300 border border-amber-800 hover:bg-amber-900">
                  TypeScript
                </Badge>
                <Badge className="px-3 py-1 text-sm bg-amber-950/80 text-amber-300 border border-amber-800 hover:bg-amber-900">
                  JavaScript
                </Badge>
                <Badge className="px-3 py-1 text-sm bg-amber-950/80 text-amber-300 border border-amber-800 hover:bg-amber-900">
                  Scala
                </Badge>
                <Badge className="px-3 py-1 text-sm bg-amber-950/80 text-amber-300 border border-amber-800 hover:bg-amber-900">
                  Java
                </Badge>
              </div>
              <div className="flex gap-4">
                <ChatButton />
                <Button
                  variant="outline"
                  asChild
                  className="border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white hover:border-amber-500"
                >
                  <Link href="#projects">{dict.hero.viewProjects}</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                <Image
                  src="/jiyuujin.jpg?height=320&width=320"
                  alt="YUMA Kitamura"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 border-t border-zinc-800">
          <h2 className="text-3xl font-bold mb-8 text-white">
            {dict.about.title}
          </h2>
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4 text-zinc-300">
              <p className="text-lg">{dict.about.p1}</p>
              <p>{dict.about.p2}</p>
              <p>{dict.about.p3}</p>
            </div>
            <div className="space-y-4 text-zinc-300">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span>{dict.about.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-400" />
                <span>{dict.about.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-amber-400" />
                <span>{dict.about.freelance}</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-amber-400" />
                <span>{dict.about.currentRole}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 border-t border-zinc-800">
          <h2 className="text-3xl font-bold mb-8 text-white">
            {dict.skills.title}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <Card
                key={category.title}
                className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/50">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <Badge
                        key={item}
                        className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 border-t border-zinc-800">
          <h2 className="text-3xl font-bold mb-8 text-white">
            {dict.experience.title}
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative pl-8 border-l-2 border-zinc-800 ${
                  index !== experiences.length - 1 ? "pb-8" : ""
                }`}
              >
                <div className="absolute w-4 h-4 bg-amber-400 rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold text-white">
                      {exp.role}
                    </h3>
                    <Badge
                      variant="outline"
                      className={
                        exp.isCurrent
                          ? "border-amber-500/50 text-amber-300"
                          : "border-zinc-700 text-zinc-300"
                      }
                    >
                      {exp.company}
                    </Badge>
                    <span className="text-sm text-zinc-400">{exp.period}</span>
                  </div>
                  <p className="text-zinc-300">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} className="bg-zinc-800 text-zinc-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 border-t border-zinc-800">
          <h2 className="text-3xl font-bold mb-8 text-white">
            {dict.projects.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors"
              >
                <div className="aspect-video relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-400">
                        {project.subtitle}
                      </p>
                    </div>
                    <p className="text-sm text-zinc-300">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-zinc-700 text-zinc-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl ? (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        >
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            {dict.projects.code}
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="border-zinc-800 bg-zinc-900 text-zinc-500 disabled:pointer-events-none disabled:opacity-70"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          🔒 {dict.projects.code}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        asChild
                        className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                      >
                        <Link
                          href={project.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {project.siteLabel}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              asChild
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-amber-500"
            >
              <Link
                href="https://github.com/jiyuujin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                {dict.projects.viewMore}
              </Link>
            </Button>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-12 border-t border-zinc-800">
          <h2 className="text-3xl font-bold mb-8 text-white">
            {dict.blog.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.slice(1, 4).map((item, key) => (
              <Card
                key={key}
                className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-950/80 text-amber-300 border border-amber-800">
                        {dict.blog.tag}
                      </Badge>
                      <span className="text-sm text-zinc-400">
                        {item.description}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <Button
                      variant="link"
                      className="p-0 text-amber-400 hover:text-amber-300"
                      asChild
                    >
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {dict.blog.readArticle}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              asChild
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-amber-500"
            >
              <Link
                href="https://blog.nekohack.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {dict.blog.viewAll}
              </Link>
            </Button>
          </div>
        </section>

        {/* Contact Section */}
        {isUsedInquiryDirectly && (
          <section id="contact" className="py-12 border-t border-zinc-800">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {dict.contact.title}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <InquiryForm />
                </CardContent>
              </Card>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {dict.contact.infoTitle}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/50">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          Email
                        </p>
                        <p className="text-sm text-zinc-400">
                          jiyuujin@nekohack.me
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/50">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          {dict.contact.locationLabel}
                        </p>
                        <p className="text-sm text-zinc-400">
                          {dict.about.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {dict.contact.connectTitle}
                  </h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-amber-400 hover:border-amber-500"
                    >
                      <Link
                        href="https://github.com/jiyuujin"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-amber-400 hover:border-amber-500"
                    >
                      <Link
                        href="https://times.nekohack.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Mastodon"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {dict.contact.availabilityTitle}
                  </h3>
                  <p className="text-zinc-300">
                    {dict.contact.availabilityDesc}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-zinc-800 py-6 md:py-8 bg-zinc-950">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-zinc-400">
            &copy; {new Date().getFullYear()} nekohack. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-zinc-400 transition-colors hover:text-amber-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-zinc-400 transition-colors hover:text-amber-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
