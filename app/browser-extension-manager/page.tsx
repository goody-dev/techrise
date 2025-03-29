'use client'
import React, { useState } from 'react'
import Logo from './assets/images/logo.svg'
import IconSun from './assets/images/icon-sun.svg'
import IconMoon from './assets/images/icon-moon.svg'
import data from './data.json'

import Image from 'next/image'
import { BsToggleOn } from 'react-icons/bs'

export type extension = {
    id: number,
    name: string,
    description: string,
    logo: string,
    isActive: boolean,
}

function BrowserExtensionManager() {
  const [extensions, setExtensions] = useState<extension[]>(data);
  const [filterBy, setFilterBy] = useState<"all" | "active" | "inactive">("all");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    theme === "dark"? setTheme("light"): setTheme("dark");
  }

  const getActiveExtensions = () => {
    return extensions.filter((extension) => extension.isActive === true);
  }

  const getInactiveExtensions = () => {
    return extensions.filter((extension) => extension.isActive === false);
  }

  const activateExtension = (id: number) => {
    let extension = extensions.filter(extension => extension.id === id)[0]
    extension = {...extension, isActive:true};
    console.log(extension)

    setExtensions([...extensions.filter(extension => extension.id !== id), extension].sort((a, b) => a.id - b.id))
  }

  const deactivateExtension = (id: number) => {
    let extension = extensions.filter(extension => extension.id === id)[0]
    extension = {...extension, isActive:false};
    console.log(extension)
    setExtensions([...extensions.filter(extension => extension.id !== id), extension].sort((a, b) => a.id - b.id))
  }

  const activeExtensions = getActiveExtensions();
  const inactiveExtensions = getInactiveExtensions();

  return (
      <div className={`w-[100vw] max-w-[100%] h-[100%] min-h-[100vh] flex flex-col items-center gap-4 p-4 py-8 md:p-12 bg-no-repeat ${theme === "dark"? "bg--gradient-to-b from-[#040918] to-[#091540]": "bg-gradient-to-b from-[#EBF2FC] to-[#EEF8F9]"}`}>
            <div className={`${theme === "dark"? "bg-[--dark-card-bg]": "bg-[--card-bg]"} w-[100%] flex flex-row items-center p-2 justify-between rounded-lg shadow-md`}>
              <Image src={Logo} alt="logo" className={`${theme === "dark"? "text-[--dark-foreground]": "text-[--foreground]"}`}></Image>
              <button onClick={()=> toggleTheme()} className={`h-[100%] ${theme === "dark"? "bg-[--neutral-600]": "bg-neutral-200"}  p-2 rounded-lg`}>
                {theme === "dark"? <Image src={IconSun} alt="light"></Image>: <Image src={IconMoon} alt="dark mode"></Image>}
              </button>
            </div>
            <div className='w-[100%] flex flex-col justify-center gap-4'>
              <div className='w-[100%] flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:items-between gap-3'>
                <div>
                  <p className={`${theme === "dark"? "text-[--dark-foreground]": "text-[--foreground]"} font-[--weight-700] text-[32px]`}>Extensions List</p>
                </div>
                <div className='flex flex-row items-center justify-center gap-2'>
                  <button onClick={() => setFilterBy("all")} className={`${theme === "dark"? filterBy === "all"? "bg-[--red-500] text-[--neutral-900]": "bg-[--dark-card-bg] text-[--neutral-100]": filterBy === "all"? "bg-[--red-500] text-[--neutral-0]": "bg-[--card-bg] text-[--neutral-900]"} py-[6px] px-4 rounded-3xl shadow-md`}>All</button>
                  <button onClick={() => setFilterBy("active")} className={`${theme === "dark"? filterBy === "active"? "bg-[--red-500] text-[--neutral-900]": "bg-[--dark-card-bg] text-[--neutral-100]": filterBy === "active"? "bg-[--red-500] text-[--neutral-0]": "bg-[--card-bg] text-[--neutral-900]"} py-[6px] px-4 rounded-3xl shadow-md`}>Active</button>
                  <button onClick={() => setFilterBy("inactive")} className={`${theme === "dark"? filterBy === "inactive"? "bg-[--red-500] text-[--neutral-900]": "bg-[--dark-card-bg] text-[--neutral-100]": filterBy === "inactive"? "bg-[--red-500] text-[--neutral-0]": "bg-[--card-bg] text-[--neutral-900]"} py-[6px] px-4 rounded-3xl shadow-md`}>Inactive</button>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center gap-2 py-2 sm:grid sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3'>
                  {(filterBy === "all"? extensions: filterBy === "active"? activeExtensions: filterBy ==="inactive"? inactiveExtensions: extensions).map((extension) => 
                      <div key={extension.id} className={`w-[100%] h-[100%] flex flex-col justify-between ${theme === "dark"? "bg-[--dark-card-bg] text-[--neutral-100]": "bg-[--card-bg] text-[--neutral-900]"} p-3 rounded-lg gap-4 shadow-md`}>
                          <div className='w-[100%] flex flex-row items-start justify-start gap-4'>
                            <Image width={48} height={48} src={extension.logo} alt={`${extension.name}'s logo`}></Image>
                            <div className='flex flex-col justify-start items-start'>
                              <p className='font-[--weight-700] text-[16px]'>{extension.name}</p>
                              <p>{extension.description}</p>
                            </div>
                          </div>
                          <div className='w-[100%] flex flex-row items-center justify-between'>
                            <button className='border py-1 px-4 rounded-3xl'>
                              Remove
                            </button>
                            <button onClick={() => extension.isActive? deactivateExtension(extension.id): activateExtension(extension.id)}>
                              {extension.isActive? <BsToggleOn className='text-[32px] text-[--red-500] bg-[--foreground] bg-clip-text' />: <BsToggleOn className='text-[32px] text-[--neutral-600] rotate-180 bg-[--foreground] bg-clip-text' />}
                            </button>
                          </div>
                      </div>
                  )}
              </div>
            </div>
          </div>

  )
}

export default BrowserExtensionManager
