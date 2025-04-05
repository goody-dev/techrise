"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <div className="w-[100vw] max-w-[100%] h-[100vh] flex flex-col items-center justify-center gap-2 p-1 bg-background text-foreground">
      <p className="text-2xl font-bold text-center">Techrise Mentorship Tasks</p>
      <div className="w-[100%] max-w-[350px] flex flex-col items-center justify-center gap-2">
        <button className="w-[100%] p-2 rounded-md bg-[--foreground] text-[--background]" onClick={()=> router.push('/faq')}>FAQ Component</button>
        <button className="w-[100%] p-2 rounded-md bg-[--foreground] text-[--background]" onClick={()=> router.push('/random-post')}>Random Post Card</button>
        <button className="w-[100%] p-2 rounded-md bg-[--foreground] text-[--background]" onClick={()=> router.push('/browser-extension-manager')}>Browser Extension Manager</button>
      </div>
    </div>
  );
}
