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

interface BlogResponse {
  title: string;
  url: string;
  description: string;
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

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "ja" | "en" }>;
}) {
  const { lang } = await params;
  const getLocale = locales[lang as keyof typeof locales] ?? locales.ja;
  const dict = await getLocale();
  const items = await fetchBlogData();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-400 selection:text-zinc-950">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
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
              href="https://bsky.app/profile/jiyuujin.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Bluesky"
                className="text-zinc-300 hover:text-amber-400 hover:bg-zinc-900"
              >
                <ExternalLink className="h-5 w-5" />
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
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/50">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {dict.skills.frontend}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
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
                  ].map((item) => (
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
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/50">
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
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {dict.skills.backend}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Node.js",
                    "Express",
                    "Java",
                    "Scala",
                    "Firebase",
                    "Supabase",
                    "GraphQL",
                    "REST API",
                    "MongoDB",
                    "PostgreSQL",
                    "AWS",
                    "GCP",
                    "Netlify",
                    "Vercel",
                    "Cloudflare",
                  ].map((item) => (
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
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-md bg-amber-950/80 text-amber-400 border border-amber-800/50">
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
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {dict.skills.tools}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
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
                  ].map((item) => (
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
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 border-t border-zinc-800">
          <h2 className="text-3xl font-bold mb-8 text-white">
            {dict.experience.title}
          </h2>
          <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-zinc-800 pb-8">
              <div className="absolute w-4 h-4 bg-amber-400 rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    {dict.experience.roles.wevnal.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-amber-500/50 text-amber-300"
                  >
                    wevnal inc.
                  </Badge>
                  <span className="text-sm text-zinc-400">
                    2023 - {dict.experience.present}
                  </span>
                </div>
                <p className="text-zinc-300">
                  {dict.experience.roles.wevnal.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge className="bg-zinc-800 text-zinc-300">
                    Team Leadership
                  </Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    Scenario Development
                  </Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    Technical Architecture
                  </Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    Code Reviews
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative pl-8 border-l-2 border-zinc-800 pb-8">
              <div className="absolute w-4 h-4 bg-amber-400 rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    {dict.experience.roles.vcube.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-300"
                  >
                    vcube inc.
                  </Badge>
                  <span className="text-sm text-zinc-400">2021 - 2023</span>
                </div>
                <p className="text-zinc-300">
                  {dict.experience.roles.vcube.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge className="bg-zinc-800 text-zinc-300">AWS</Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">React</Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    TypeScript
                  </Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    Frontend Architecture
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative pl-8 border-l-2 border-zinc-800 pb-8">
              <div className="absolute w-4 h-4 bg-amber-400 rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    {dict.experience.roles.smaregi.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-300"
                  >
                    smaregi inc.
                  </Badge>
                  <span className="text-sm text-zinc-400">2019 - 2021</span>
                </div>
                <p className="text-zinc-300">
                  {dict.experience.roles.smaregi.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge className="bg-zinc-800 text-zinc-300">AWS</Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">Vue</Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">React</Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    TypeScript
                  </Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    API Architecture
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative pl-8 border-l-2 border-zinc-800">
              <div className="absolute w-4 h-4 bg-amber-400 rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    {dict.experience.roles.ponos.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-300"
                  >
                    ponos inc.
                  </Badge>
                  <span className="text-sm text-zinc-400">2016 - 2019</span>
                </div>
                <p className="text-zinc-300">
                  {dict.experience.roles.ponos.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge className="bg-zinc-800 text-zinc-300">HTML/CSS</Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    JavaScript
                  </Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">Vue</Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    Java/Scala
                  </Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">PHP</Badge>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    Responsive Design
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 border-t border-zinc-800">
          <h2 className="text-3xl font-bold mb-8 text-white">
            {dict.projects.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Tracc */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/tracc.png?height=280&width=420"
                  alt="Tracc"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Tracc</h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.tracc.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.tracc.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Flutter",
                      "Dart",
                      "TypeScript",
                      "Node.js",
                      "Firebase",
                      "Cloudflare",
                      "AWS S3",
                      "React (partially)",
                      "Remix (partially)",
                    ].map((tag) => (
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
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-zinc-800 bg-zinc-900 text-zinc-500 disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://brand.tracc.jp/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.brandWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Luma Portal */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/luma-portal.png?height=280&width=420"
                  alt="Luma Portal"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Luma Portal
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.lumaPortal.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.lumaPortal.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Node.js", "Cloudflare", "D1"].map(
                      (tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-zinc-700 text-zinc-300"
                        >
                          {tag}
                        </Badge>
                      ),
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-zinc-800 bg-zinc-900 text-zinc-500 disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://luma-portal.nekohack.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.brandWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rocket Form */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/rocket-form.png?height=280&width=420"
                  alt="Rocket Form"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Rocket Form
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.rocketForm.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.rocketForm.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Node.js", "Cloudflare", "D1"].map(
                      (tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-zinc-700 text-zinc-300"
                        >
                          {tag}
                        </Badge>
                      ),
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-zinc-800 bg-zinc-900 text-zinc-500 disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://rocket-form.nekohack.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.brandWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commitment Board */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/commitment-board.png?height=280&width=420"
                  alt="Commitment Board"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Commitment Board
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.commitmentBoard.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.commitmentBoard.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Node.js", "Cloudflare", "D1"].map(
                      (tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-zinc-700 text-zinc-300"
                        >
                          {tag}
                        </Badge>
                      ),
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-zinc-800 bg-zinc-900 text-zinc-500 disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://commitment-board.nekohack.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.brandWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DL */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/deeplink-redirect.png?height=280&width=420"
                  alt="DL (DeepLink Redirect)"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      DL (DeepLink Redirect)
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.deeplinkRedirect.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.deeplinkRedirect.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Node.js", "Cloudflare", "D1"].map(
                      (tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-zinc-700 text-zinc-300"
                        >
                          {tag}
                        </Badge>
                      ),
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-zinc-800 bg-zinc-900 text-zinc-500 disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://dl.nekohack.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.productWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* IMGO */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/imgo.png?height=280&width=420"
                  alt="IMGO (Image Go)"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      IMGO (Image Go)
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.imgo.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.imgo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "TypeScript",
                      "Node.js",
                      "Rust",
                      "Cloudflare",
                      "Cloud Run",
                    ].map((tag) => (
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
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-zinc-800 bg-zinc-900 text-zinc-500 disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://imgo.nekohack.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.productWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newspaper */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/newspaper.png?height=280&width=420"
                  alt="nekohack Newspaper"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      nekohack Newspaper
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.newspaper.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.newspaper.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "TypeScript",
                      "Node.js",
                      "Cloudflare",
                      "Google Gemini",
                    ].map((tag) => (
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
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      <Link
                        href="https://github.com/nekohack/portal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://newspaper.nekohack.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.productWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portal */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/nekohack-portal.png?height=280&width=420"
                  alt="nekohack Portal"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      nekohack Portal
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.nekohackPortal.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.nekohackPortal.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "Tailwind CSS", "v0"].map((tag) => (
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
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      <Link
                        href="https://github.com/nekohack/portal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://nekohack.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.productWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multi Post Dash */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/multi-post-dash.png?height=280&width=420"
                  alt="Multi Post Dash"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Multi Post Dash
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.multiPostDash.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.multiPostDash.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Node.js", "Cloudflare"].map((tag) => (
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
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      <Link
                        href="https://github.com/jiyuujin/multi-post-dash"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://multi-post.nekohack.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.productWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sheer Community */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/sheer-community.png?height=280&width=420"
                  alt="Sheer Community"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Sheer Community
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.sheerCommunity.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.sheerCommunity.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Node.js", "Cloudflare"].map((tag) => (
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
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      <Link
                        href="https://github.com/nekohack/portal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://sheer-community.nekohack.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.productWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Karaoke Bingo */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/karaoke-bingo.png?height=280&width=420"
                  alt="KARAOKE BINGO"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      KARAOKE BINGO
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.karaokeBingo.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.karaokeBingo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Node.js", "Cloudflare", "D1"].map(
                      (tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-zinc-700 text-zinc-300"
                        >
                          {tag}
                        </Badge>
                      ),
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      <Link
                        href="https://github.com/nekohack/portal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://karaoke-bingo.nekohack.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.productWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* JetPhoto */}
            <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-amber-500/50 transition-colors">
              <div className="aspect-video relative">
                <Image
                  src="/projects/jetphoto-community-b747.jpg?height=280&width=420"
                  alt="JetPhoto Community"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      JetPhoto Community
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {dict.projects.items.jetPhotoCommunity.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">
                    {dict.projects.items.jetPhotoCommunity.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "TypeScript",
                      "Node.js",
                      "Cloudflare",
                      "D1",
                      "AWS S3",
                    ].map((tag) => (
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
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    >
                      <Link
                        href="https://github.com/nekohack/jetphoto-community"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:from-amber-300 hover:to-orange-400 font-semibold"
                    >
                      <Link
                        href="https://jetphoto-community.nekohack.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {dict.projects.productWebsite}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                        href="https://bsky.app/profile/jiyuujin.bsky.social"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Bluesky"
                      >
                        <ExternalLink className="h-5 w-5" />
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
