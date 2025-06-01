"use client"
import React from 'react'
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import LocationSerach from './LocationSerach';

const Header = () => {
  const {theme, setTheme}=useTheme()
  const isDark=theme==='dark'
  return (
    <header>
      <div className="border-b flex justify-between items-center px-4 py-8">
        <h1 className="text-2xl font-bold underline cursor-pointer">Weather4U</h1>
        <div className="flex gap-6 items-center justify-evenly">
          <LocationSerach/>
          <div className={`cursor-pointer transition-transform duration-500 ease-in-out ${isDark?"rotate-180":"rotate-0"}` } onClick={()=>setTheme(isDark?"light":"dark")}>
            
              {
              isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-400" />
              }                              
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header