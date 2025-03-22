"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

export type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
}

export default function RandomPost() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const [randomPost, setRandomPost] = useState<Post | null>(null);

  const url = usePathname();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const endpoint = "https://jsonplaceholder.typicode.com/posts";

  const generateRandomNumber = (range: number) => {
    return Math.floor(Math.random() * (range + 1));
  }

  const getPosts = async() => {
    setIsLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setPosts(data);
      console.log(data);
    } catch(error) {
      console.log("Something went wrong!", error);
    } finally {
      setIsLoading(false);
    }
  }

  const getRandomPost = () => {
    if(!posts?.length) {
      return
    }
    const randomId = generateRandomNumber(posts?.length);
    setRandomPost(posts[randomId]);
  }

  useEffect(() => {
    if(posts) {
      getRandomPost();
    } else {
      getPosts();
    }
  }, [posts])


  return (
    <div className="w-[100vw] max-w-[100%] h-[100vh] flex flex-col items-center justify-center p-2 bg-[--background]">
      <header className="fixed w-[100vw] max-w-[100%] p-1 sm:p-2 md:p-3 top-0 left-0 flex flex-row items-center justify-start">
        {url.endsWith("faq") || url.endsWith("random-post")? <button onClick={() => router.back()} className="text-white text-2xl"><BiArrowBack /></button>: null}
      </header>
      {      
        isLoading? <p>Loading...</p>:
        !randomPost? <div className="flex flex-col items-center gap-2">
          <p>Error fetching post, don't fret!</p>
          <button onClick={() => getPosts()} className="w-[16rem] max-w-[100%] p-2 rounded-md bg-[--foreground] text-[--vibrant]">Reload</button>
        </div>:
        <div className="w-[100%] max-w-[450px] rounded-md flex flex-col items-center justify-center gap-3 p-3 bg-[--dominant] dark:bg-[--vibrant-dark] shadow-md">
          <div className="w-[100%] flex flex-row items-center justify-start gap-2">
            <p className="text-black font-semibold text-xl text-[--vibrant-dark] dark:text-[--vibrant-light]"><span className="text-[--vibrant]">{randomPost?.id}</span> {randomPost?.title}</p>
          </div>
          <div className="w-[100%] text-start text-[--muted] dark:text-[--dominant]">
            <p>{randomPost?.body}</p>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-end">
            <button onClick={() => getRandomPost()} className="w-[100px] p-1 rounded-md border-[1px] border-[--vibrant] dark:border-[--vibrant-light] text-[--vibrant] dark:text-[--vibrant-light]">
              New Post
            </button>
          </div>
        </div>
      }
    </div>
  );
}
