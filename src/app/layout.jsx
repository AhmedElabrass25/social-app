import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import ParentComponent from "./ParentComponent";
import { Toaster } from "react-hot-toast";

const getMontserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Social App",
  icons: {
    icon: "/social-media.png", // ✅ This will use the favicon from the `public/` folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${getMontserrat.variable}`}>
        <ParentComponent>
          <Navbar />
          {children}
          <Toaster />
        </ParentComponent>
      </body>
    </html>
  );
}
