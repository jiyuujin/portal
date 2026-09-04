import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service | YUMA Kitamura",
  description: "Terms of Service for YUMA Kitamura's portfolio website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Welcome to the personal portfolio website of YUMA Kitamura. By
          accessing or using this website, you agree to comply with these terms.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">
          1. Intellectual Property
        </h2>
        <p>
          All content, including text, graphics, and code on this site, is the
          property of YUMA Kitamura unless otherwise stated.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">
          2. Disclaimer
        </h2>
        <p>
          The information on this website is provided "as is" without warranties
          of any kind. We are not responsible for any issues or damages arising
          from the use of this website.
        </p>
        <h2 className="text-xl font-semibold text-foreground pt-4">
          3. Changes to Terms
        </h2>
        <p>
          We reserve the right to modify these terms at any time without prior
          notice.
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
