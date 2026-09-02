import type { Metadata } from "next";
<<<<<<< HEAD

export const metadata: Metadata = {
  title: "Akademia | AI Marketing System",
=======
import "./marketing.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "AI Marketer | Practical AI products, plainly explained",
  description: "Four practical AI products. One place to find the right one.",
>>>>>>> frontend-setup
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< HEAD
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 px-8 py-4">
        {/* TODO: port nav from AI_end_user_side.html */}
        <nav>Akademia</nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-gray-200 px-8 py-6 text-sm text-gray-500">
        {/* TODO: port footer from AI_end_user_side.html */}
        © 2026 Akademia
      </footer>
=======
    <div className="marketing-body">
      <div id="app">
        <Header />
        <main className="view">{children}</main>
        <Footer />
      </div>
>>>>>>> frontend-setup
    </div>
  );
}
