// This TypeScript file is a React component for a root layout in a Next.js project.
// It imports necessary modules and components, defines a custom font, and sets up global metadata.

// Import statements for required modules and components
import type { Metadata } from "next"; // Importing type Metadata from Next.js for type checking
import { Inter } from "next/font/google"; // Importing the Inter font from Google Fonts through Next.js optimization
import GlobalState from "../context/index"; // Importing a context for global state management
import Cookies from "js-cookie"; // Importing js-cookie for cookie management

// Importing global CSS styles
import "./globals.css";

// Importing the NavBar component from a path alias
import NavBar from "@/components/navbar";

// Initializing the Inter font with specific subsets
const inter = Inter({ subsets: ["latin"] });

// Defining global metadata for the application
export const metadata: Metadata = {
  title: "MedFix", // Application title
};

// Defining the RootLayout component with React children as props
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Retrieving a cookie named 'token'

  // Returning the layout structure
  return (
    <html lang="en">
      {/* Setting the language of the document */}
      <body className={inter.className}>
        {/* Applying the Inter font class */}
        <GlobalState>
          {/* const token = Cookies.get("token"); console.log("token", token); */}

          {/* {token && <NavBar />} */}

          <main className="flex min-h-screen flex-col mt-[80px]">
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
