import "./globals.css";
import Providers from "./providers";
import { Albert_Sans } from 'next/font/google';

const albertsans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: 'Moodify',
  description: 'Your playlist generator',
  icons: {
    icon: '/images/sparkles.png', 
    shortcut: '/images/sparkles.png',
    apple: '/images/sparkles.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={albertsans.className}>
         <Providers>{children}</Providers>
      </body>
    </html>
  );
}
