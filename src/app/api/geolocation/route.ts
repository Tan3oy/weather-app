import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const{searchParams}= new URL( request.url);
    const q = searchParams.get('q');
    if(!q){
        return NextResponse.json({error:"No query provided"}, {status:400});
    }
    const apiKey=process.env.OPENWEATHERMAP_API_KEY
    console.log(apiKey);
    console.log('new api key : ',process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY)
    
    try {
        const res= await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${apiKey}`)
        const data=await res.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({error:"Something went wrong"}, {status:500});
    }
}