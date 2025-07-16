import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import TooltipProvider from "@/providers/tooltip-provider";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { BillingProvider } from "@/providers/billing-provider";

const font = DM_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Autoflow",
  description: "Automate your workflow with Autoflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider afterSignOutUrl="/">
            <ModalProvider>
              <TooltipProvider>
                <BillingProvider>{children}</BillingProvider>
                <Toaster />
              </TooltipProvider>
            </ModalProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
