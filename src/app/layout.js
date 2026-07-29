import "./globals.css";
import ClientProvider from "./providers";
import Layout from "@/components/Layout";

export const metadata = {
  title: "NextShop",
  description: "E-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Layout>{children}</Layout>
        </ClientProvider>
      </body>
    </html>
  );
}
