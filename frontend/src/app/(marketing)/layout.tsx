import type { Metadata } from "next";
import "./marketing.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "AI Marketer | Practical AI products, plainly explained",
  description: "Four practical AI products. One place to find the right one.",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing-body">
      <div id="app">
        <Header />
        <main className="view">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
