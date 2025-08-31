import type { Metadata } from "next";
import { cn } from "@/libs/utils";
import { Work_Sans } from "next/font/google";
import { MainLayout, SplashScreenWrapper } from "@/components/Layouts";
import "./globals.css";

const workSansFont = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--work-sans-font",
  display: "swap",
});
export const metadata: Metadata = {
  title: "TenTwenty Task",
  description: "Custom task for frontend development role at TenTwenty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(workSansFont.variable, "antialiased")}>
        <SplashScreenWrapper>
          <MainLayout>{children}</MainLayout>
        </SplashScreenWrapper>
      </body>
    </html>
  );
}
