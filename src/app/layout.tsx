import "@/styles/globals.css";

export const metadata = {
  title: "Recipes",
  description: "App where user can explore recipes, and upload new recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
