"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
}

export default function RandomPost() {
  const [posts, setPosts] = useState<Post[] | null>([]);

  const [randomPost, setRandomPost] = useState<Post | null>(null);

  // {
  //   id: 1,
  //   userId: 1,
  //   title: "Zustand for data management",
  //   body: "Zustand has been a go to library for managing data in medium sized react applications, it's light weight, fast, and easy to use. However, setting it up for NEXTjs can be a thorn a in the flesh."
  // }

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
      const response = await fetch(endpoint)
      const data = await response.json()
      setPosts(data)
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
    <div className="w-[100vw] max-w-[100%] h-[100vh] flex flex-col items-center justify-center p-2">
      <header className="fixed w-[100vw] max-w-[100%] p-1 sm:p-2 md:p-3 top-0 left-0 flex flex-row items-center justify-start">
        {url.endsWith("faq") || url.endsWith("random-post")? <button onClick={() => router.back()} className="text-white text-2xl">{"<"}</button>: null}
      </header>
      {      
        isLoading? <p>Loading...</p>:
        !isLoading && !randomPost? <div className="flex flex-col items-center gap-2">
          <p>Error fetching post</p>
          <button onClick={() => getPosts()} className="w-[100%] p-2 rounded-md bg-white text-black">Reload</button>
          <button onClick={() => getPosts()} className="w-[100%] p-2 rounded-md bg-white text-black">Reload</button>
        </div>:
        <div className="w-[100%] max-w-[450px] rounded-md flex flex-col items-center justify-center gap-3 p-3 bg-white text-black">
          <div className="w-[100%] flex flex-row items-center justify-start gap-2">
            <p className="text-nowrap">{randomPost?.id + " |"}</p>
            <p className="text-nowrap">{randomPost?.id + " |"}</p>
            <p className="text-black font-semibold text-xl">{randomPost?.title}</p>
          </div>
          <div className="w-[100%] text-start">
            <p>{randomPost?.body}</p>
            <p>{randomPost?.body}</p>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-end">
            <button onClick={() => getRandomPost()} className="w-[100px] p-2 rounded-md border-[1px] border-black">
              New Post
            </button>
          </div>
        </div>
      }
    </div>
  );
}
