import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/Toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/logo.svg' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
    shortcut: ['/shortcut-icon.png'],
  },
  title: 'FH Resolve - Soluções em Manutenção',
  description: 'Soluções completas em manutenção predial, elétrica, hidráulica e muito mais.',
  keywords: 'marido de aluguel Florianópolis, manutenção residencial Ratones, reparos elétricos Jurerê, serviços hidráulicos Ingleses, FH Resolve',
  openGraph: {
    title: 'FH Resolve - Manutenção Residencial em Florianópolis',
    description: 'Reparos rápidos e confiáveis em Florianópolis. Atendemos Ratones, Jurerê e mais. Contate-nos hoje!',
    url: 'https://fhresolve.com.br',
    type: 'website',
    images: [
      {
        url: 'https://fhresolve.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FH Resolve - Serviços Residenciais em Florianópolis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FH Resolve - Marido de Aluguel em Florianópolis',
    description: 'Reparos residenciais rápidos em Ratones, Jurerê e região. Solicite seu orçamento!',
    images: 'https://fhresolve.com.br/og-image.jpg',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "FH Resolve",
              "description": "FH Resolve - Especialista em Manutenção Residencial em Florianópolis",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Florianópolis",
                "addressRegion": "SC",
                "addressCountry": "BR",
                "streetAddress": "Ratones"
              },
              "telephone": "+5548991919791",
              "url": "https://fhresolve.com.br",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-27.5369",
                "longitude": "-48.5044"
              },
              "priceRange": "$$",
              "openingHours": "Mo-Sa 08:00-18:00"
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const isDashboard = window.location.pathname.startsWith('/dashboard');
                  const themeKey = isDashboard ? 'dashboard-theme' : 'site-theme';
                  
                  const savedTheme = localStorage.getItem(themeKey);
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                  
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  console.error('Error accessing localStorage', e);
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}