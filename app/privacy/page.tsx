import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy | YUMA Kitamura",
  description: "Privacy Policy for YUMA Kitamura's portfolio website.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          This website uses Google Analytics and Google AdSense to analyze traffic and show advertisements.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">1. Information Collection</h2>
        <p>
          We may collect cookies and usage data through third-party services such as Google Analytics to help us understand how the site is being used.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">2. Use of Cookies</h2>
        <p>
          Cookies are small data files stored on your device. You can choose to disable cookies through your browser settings.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">3. Contact</h2>
        <p>
          If you have any questions regarding this Privacy Policy, please contact jiyuujin@nekohack.me.
        </p>
      </div>
      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
