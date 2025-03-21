"use client"
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Faq() {
  const [openedQuestion, setOpenedQuestion] = useState<number | null>(1);

  const url = usePathname();
  const router = useRouter();

  const handleExpand = (id: number) => {
    if(openedQuestion === id) {
      setOpenedQuestion(null);
      return;
    }
    setOpenedQuestion(id);
  }
  const faqs = [
    {
      id: 1,
      question: "What is ATC Africa?",
      answer: "Amazing Tech community Africa"
    },
    {
      id: 2,
      question: "What is ATC Africa?",
      answer: "Amazing Tech community Africa"
    },
    {
      id: 3,
      question: "What is ATC Africa?",
      answer: "Amazing Tech community Africa"
    },
    {
      id: 4,
      question: "What is ATC Africa?",
      answer: "Amazing Tech community Africa"
    },
  ]

  return (
    <div className="w-100vw max-w-[100%] h-[100vh] flex flex-row items-center justify-center p-2 bg-gradient-to-b from-[--vibrant-dark] from-10% to-[--vibrant-light]">
      <header className="fixed w-[100vw] max-w-[100%] p-1 sm:p-2 md:p-3 top-0 left-0 flex flex-row items-center justify-start">
          {url.endsWith("faq") || url.endsWith("random-post")? <button onClick={() => router.back()} className="text-white text-2xl">{"<"}</button>: null}
      </header>
      <div className="w-[100%] max-w-[450px] flex flex-col items-center justify-center gap-2 p-4 rounded-md shadow-md text-black bg-[--dominant]">
        <div className="w-[100%] flex flex-row items-center justify-start gap-1">
          <span></span>
          <h1 className="text-2xl font-bold text-[--vibrant-dark]">FAQs</h1>
        </div>
        <ul className="w-[100%] flex flex-col items-center justify-center gap-2">
          {faqs.map((faq) => 
            <li key={faq.id} className="w-[100%] flex flex-col p-1">
              <div className="w-[100%] flex flex-row items-start justify-between gap-1">
                <p className="text-[--muted-dark] font-semibold">{faq.question}</p>
                <span onClick={() => handleExpand(faq.id)} className={`cursor-pointer ${openedQuestion === faq.id? "text-[--vibrant-dark]": "text-[--vibrant]"} font-semibold text-center`}>{openedQuestion === faq.id? "-": "+"}</span>
              </div>
              {faq.id === openedQuestion && <p className="text-[--muted]">{faq.answer}</p>}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
