"use client";
import {useEffect,useState} from "react";
export default function ReadingProgress(){const [p,setP]=useState(0); useEffect(()=>{const f=()=>{const h=document.documentElement.scrollHeight-window.innerHeight; setP(h>0?(window.scrollY/h)*100:0)}; window.addEventListener("scroll",f,{passive:true}); f(); return()=>window.removeEventListener("scroll",f)},[]); return <div className="fixed left-0 top-0 z-[60] h-1 bg-blue-600 transition-[width]" style={{width:`${p}%`}}/>}
