import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Liam T. Nguyen — Full-Stack Developer & AI/LLM Specialist",
  description:
    "Portfolio of Liam T. Nguyen — building production AI systems, voice agents, and multi-tenant SaaS. Cal Poly Pomona CS, graduating June 2026.",
  keywords: ["Full-Stack Developer", "AI", "LLM", "Voice AI", "Next.js", "TypeScript"],
  authors: [{ name: "Liam T. Nguyen" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Liam T. Nguyen — Full-Stack Developer & AI/LLM Specialist",
    description: "Building production AI systems, voice agents, and multi-tenant SaaS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${jetbrainsMono.variable} bg-base text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
