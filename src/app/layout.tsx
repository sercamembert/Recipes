import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import "@/styles/globals.css";

export const metadata = {
  title: "Recipes",
  description: "App where user can explore recipes, and upload new recipes",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white text-dark font-primary h-full ">
      <body className="min-h-screen flex flex-col">
        <Providers>
          {/* @ts-expect-error server component*/}
          <Navbar />
          {authModal}
          <div className="pt-16 lg:pt-20 h-full w-full px-[15px] lg:px-[5vw] 2xl:px-[9vw]">
            {children}
          </div>
          <Toaster />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
