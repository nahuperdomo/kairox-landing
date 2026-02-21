import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kairox — La tecnologia correcta, en el momento correcto",
  description:
    "Kairox es una empresa de software, inteligencia artificial y soluciones digitales con sede en Uruguay. Transformamos tu negocio con tecnologia de vanguardia.",
  keywords: [
    "software",
    "inteligencia artificial",
    "soluciones digitales",
    "desarrollo web",
    "IA",
    "Uruguay",
    "Kairox",
  ],
  authors: [{ name: "Kairox" }],
  openGraph: {
    title: "Kairox — La tecnologia correcta, en el momento correcto",
    description:
      "Software, inteligencia artificial y soluciones digitales para llevar tu negocio al siguiente nivel.",
    url: "https://kairox.tech",
    siteName: "Kairox",
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairox — La tecnologia correcta, en el momento correcto",
    description:
      "Software, inteligencia artificial y soluciones digitales para llevar tu negocio al siguiente nivel.",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kairox",
              url: "https://kairox.tech",
              email: "contacto@kairox.tech",
              description:
                "Software, inteligencia artificial y soluciones digitales.",
              founder: {
                "@type": "Person",
                name: "Nahuel Perdomo",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "UY",
              },
              sameAs: ["https://instagram.com/kairox.tech"],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
