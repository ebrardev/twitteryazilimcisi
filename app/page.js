import Link from "next/link"
import Navbar from "./components/Navbar/Navbar"
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <main>

   <div className="container">
    <Navbar/>
    <div className="main-container">
    <h1 className="text"> Twitter Yazılımcı testi </h1>
    <p> 
       Nextjs öğreniyorum
    </p>

    <Link href="/quiz">
      <button className="main-btn"> Başla </button>
    </Link>
    </div>
    </div>
    <Analytics />
    </main>
  )
}
