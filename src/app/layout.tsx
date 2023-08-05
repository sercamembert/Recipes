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
    <html
      lang="en"
      className="bg-white text-dark px-[15px] lg:px-[5vw] 2xl:px-[9vw] font-primary"
    >
      <body className="min-h-screen">
        <Providers>
          {/* @ts-expect-error server component*/}
          <Navbar />
          {authModal}
          <div className="pt-16 lg:pt-20 h-full w-full">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
