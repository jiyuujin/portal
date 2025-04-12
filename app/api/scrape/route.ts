import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

interface BlogResponse {
  title: string;
  link?: string;
  date: string;
  image?: string;
  description: string;
}

export async function GET() {
  try {
    const { data } = await axios.get("https://blog.nekohack.me");
    const $ = cheerio.load(data);
    const list = $("body > main > div:nth-child(3) > ul > li");
    const items: BlogResponse[] = [];
    list.each((index, element) => {
      const title = $(element).find("div > h3 > a").text();
      const link = $(element).find("div > h3 > a").attr("href");
      const date = $(element).find("div > div > span").text();
      const image = $(element).find("div > a > img").attr("src");
      const description = $(element).find("div > p").text();
      items.push({ title, link, date, image, description });
    });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed scraping" }, { status: 500 });
  }
}
