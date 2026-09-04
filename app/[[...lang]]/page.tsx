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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <span className="font-bold text-xl">YUMA Kitamura</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {dict.nav.about}
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {dict.nav.skills}
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {dict.nav.experience}
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {dict.nav.projects}
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://bsky.app/profile/jiyuujin.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" aria-label="Bluesky">
                <ExternalLink className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://times.nekohack.me/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" aria-label="Mastodon">
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
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  YUMA Kitamura
                </h1>
                <p className="mt-2 text-xl text-muted-foreground">
                  {dict.hero.role}
                </p>
              </div>
              <p className="text-lg text-muted-foreground">
                {dict.hero.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  React
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  Flutter
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  TypeScript
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  JavaScript
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  Scala
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  Java
                </Badge>
              </div>
              <div className="flex gap-4">
                <ChatButton />
                <Button variant="outline" asChild>
                  <Link href="#projects">{dict.hero.viewProjects}</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-primary/20">
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
        <section id="about" className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8">{dict.about.title}</h2>
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <p className="text-lg">{dict.about.p1}</p>
              <p>{dict.about.p2}</p>
              <p>{dict.about.p3}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{dict.about.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{dict.about.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{dict.about.freelance}</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <span>{dict.about.currentRole}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8">{dict.skills.title}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {dict.skills.frontend}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>HTML</Badge>
                  <Badge>CSS</Badge>
                  <Badge>JavaScript</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Vue</Badge>
                  <Badge>Svelte</Badge>
                  <Badge>Objective-C</Badge>
                  <Badge>Swift</Badge>
                  <Badge>Java</Badge>
                  <Badge>Kotlin</Badge>
                  <Badge>Dart</Badge>
                  <Badge>Flutter</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-md bg-primary/10">
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
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M2 9h20M9 20h6M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">
                    {dict.skills.backend}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Node.js</Badge>
                  <Badge>Express</Badge>
                  <Badge>Java</Badge>
                  <Badge>Scala</Badge>
                  <Badge>Firebase</Badge>
                  <Badge>Supabase</Badge>
                  <Badge>GraphQL</Badge>
                  <Badge>REST API</Badge>
                  <Badge>MongoDB</Badge>
                  <Badge>PostgreSQL</Badge>
                  <Badge>AWS</Badge>
                  <Badge>GCP</Badge>
                  <Badge>Netlify</Badge>
                  <Badge>Vercel</Badge>
                  <Badge>Cloudflare</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-md bg-primary/10">
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
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">{dict.skills.tools}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>OpenAI (ChatGPT)</Badge>
                  <Badge>Anthropic (Claude)</Badge>
                  <Badge>Google (Gemini)</Badge>
                  <Badge>Git</Badge>
                  <Badge>GitHub</Badge>
                  <Badge>GitLab</Badge>
                  <Badge>Docker</Badge>
                  <Badge>CI/CD</Badge>
                  <Badge>Jest</Badge>
                  <Badge>Vitest</Badge>
                  <Badge>Testing Library</Badge>
                  <Badge>Vite</Badge>
                  <Badge>Webpack</Badge>
                  <Badge>Figma</Badge>
                  <Badge>Miro</Badge>
                  <Badge>Agile</Badge>
                  <Badge>Scrum</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8">{dict.experience.title}</h2>
          <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-muted pb-8">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"></div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold">
                    {dict.experience.roles.wevnal.title}
                  </h3>
                  <Badge variant="outline">wevnal inc.</Badge>
                  <span className="text-sm text-muted-foreground">
                    2023 - {dict.experience.present}
                  </span>
                </div>
                <p>{dict.experience.roles.wevnal.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">Team Leadership</Badge>
                  <Badge variant="secondary">Scenario Development</Badge>
                  <Badge variant="secondary">Technical Architecture</Badge>
                  <Badge variant="secondary">Code Reviews</Badge>
                </div>
              </div>
            </div>
            <div className="relative pl-8 border-l-2 border-muted pb-8">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"></div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold">
                    {dict.experience.roles.vcube.title}
                  </h3>
                  <Badge variant="outline">vcube inc.</Badge>
                  <span className="text-sm text-muted-foreground">
                    2021 - 2023
                  </span>
                </div>
                <p>{dict.experience.roles.vcube.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Frontend Architecture</Badge>
                </div>
              </div>
            </div>
            <div className="relative pl-8 border-l-2 border-muted pb-8">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"></div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold">
                    {dict.experience.roles.smaregi.title}
                  </h3>
                  <Badge variant="outline">smaregi inc.</Badge>
                  <span className="text-sm text-muted-foreground">
                    2019 - 2021
                  </span>
                </div>
                <p>{dict.experience.roles.smaregi.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Vue</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">API Architecture</Badge>
                </div>
              </div>
            </div>
            <div className="relative pl-8 border-l-2 border-muted">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"></div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold">
                    {dict.experience.roles.ponos.title}
                  </h3>
                  <Badge variant="outline">ponos inc.</Badge>
                  <span className="text-sm text-muted-foreground">
                    2016 - 2019
                  </span>
                </div>
                <p>{dict.experience.roles.ponos.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">HTML/CSS</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">Vue</Badge>
                  <Badge variant="secondary">Java/Scala</Badge>
                  <Badge variant="secondary">PHP</Badge>
                  <Badge variant="secondary">Responsive Design</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8">{dict.projects.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">Tracc</h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.tracc.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.tracc.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Flutter</Badge>
                    <Badge variant="outline">Dart</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Firebase</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                    <Badge variant="outline">AWS S3</Badge>
                    <Badge variant="outline">React (partially)</Badge>
                    <Badge variant="outline">Remix (partially)</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">Luma Portal</h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.lumaPortal.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.lumaPortal.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                    <Badge variant="outline">D1</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">Rocket Form</h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.rocketForm.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.rocketForm.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                    <Badge variant="outline">D1</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">Commitment Board</h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.commitmentBoard.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.commitmentBoard.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                    <Badge variant="outline">D1</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">
                      DL (DeepLink Redirect)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.deeplinkRedirect.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.deeplinkRedirect.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                    <Badge variant="outline">D1</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">IMGO (Image Go)</h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.imgo.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.imgo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Rust</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                    <Badge variant="outline">Cloud Run</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="disabled:pointer-events-none disabled:opacity-70"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      🔒 {dict.projects.code}
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">
                      nekohack Newspaper
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.newspaper.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.newspaper.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                    <Badge variant="outline">Google Gemini</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="https://github.com/nekohack/portal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">nekohack Portal</h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.nekohackPortal.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.nekohackPortal.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Next.js</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                    <Badge variant="outline">v0</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="https://github.com/nekohack/portal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">Multi Post Dash</h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.multiPostDash.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.multiPostDash.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="https://github.com/jiyuujin/multi-post-dash"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">Sheer Community</h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.sheerCommunity.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.sheerCommunity.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="https://github.com/nekohack/portal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">KARAOKE BINGO</h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.karaokeBingo.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.karaokeBingo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                    <Badge variant="outline">D1</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="https://github.com/nekohack/portal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
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
            <Card className="overflow-hidden">
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
                    <h3 className="text-xl font-semibold">
                      JetPhoto Community
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {dict.projects.items.jetPhotoCommunity.subtitle}
                    </p>
                  </div>
                  <p className="text-sm">
                    {dict.projects.items.jetPhotoCommunity.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Cloudflare</Badge>
                    <Badge variant="outline">D1</Badge>
                    <Badge variant="outline">AWS S3</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="https://github.com/nekohack/jetphoto-community"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {dict.projects.code}
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
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
            <Button variant="outline" asChild>
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
        <section id="blog" className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8">{dict.blog.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.slice(1, 4).map((item, key) => (
              <Card key={key}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge>{dict.blog.tag}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <Button variant="link" className="p-0" asChild>
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
            <Button variant="outline" asChild>
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
          <section id="contact" className="py-12 border-t">
            <h2 className="text-3xl font-bold mb-8">{dict.contact.title}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <InquiryForm />
                </CardContent>
              </Card>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {dict.contact.infoTitle}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                          jiyuujin@nekohack.me
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {dict.contact.locationLabel}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {dict.about.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {dict.contact.connectTitle}
                  </h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href="https://github.com/jiyuujin"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href="https://bsky.app/profile/jiyuujin.bsky.social"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Bluesky"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
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
                  <h3 className="text-xl font-semibold mb-4">
                    {dict.contact.availabilityTitle}
                  </h3>
                  <p>{dict.contact.availabilityDesc}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} nekohack. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
