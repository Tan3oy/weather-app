"use client";
import {format} from 'date-fns'
import { useSearchLocation } from "@/hooks/useSearchLocation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Clock, Loader2, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocationHistory } from "@/hooks/useLocationHistory";

const LocationSerach = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data:cities, isLoading, error } = useSearchLocation(query);
  const {history,addToHistory,clearHistory} = useLocationHistory()
  // console.log('data: ',data);
  useEffect(() => {
    console.log("query : ", query);
    console.log("history : ", history);
  }, [query,history]);
  const handleSelect=(value:string)=>{
    const [lat,lon,name,country] = value.split('|')
    addToHistory.mutate({
      query,
      name,
      lat:parseFloat(lat),
      lon:parseFloat(lon),
      country,
    })
    setOpen(false)
    router.push(`/weather/city/${name}?lat=${lat}&lon=${lon}`)
  }
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {(error as Error).message}</p>;
  return (
    <div className="">
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="relative text-sm text-muted-foreground cursor-pointer"
      >
        <Search className="mr-2 h-4 w-4" /> Search Cities ...
      </Button>
      <CommandDialog 
      open={open} 
      onOpenChange={(closeState)=>setOpen(closeState)}>
        <Command>
          <CommandInput
            placeholder="Type a command or search..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.length > 2 && !isLoading && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {/* Search History */}
            {
              history && history.length >0 && (
                <CommandGroup >
                  <div className="flex w-full justify-between items-center gap-2 mb-2">
                      <p className='text-xs text-muted-foreground'>Recent Searches</p>
                      <Button
                      className='text-xs text-muted-foreground cursor-pointer'
                      variant="ghost"
                      onClick={()=>clearHistory.mutate()}>
                        <span className=''>Clear History</span><Trash2 className='!h-[14px] !w-[14px]'/>
                      </Button>
                  </div>
                  <div className="">
                      {
                        history.map((hist,i)=>(
                          <CommandItem
                          key={`${hist.lat}-${hist.lon}`}
                          value={`${hist.lat}|${hist.lon}|${hist.name}|${hist.country}`}
                          onSelect={(value)=>handleSelect(value)}>
                            <div className="flex w-full justify-between cursor-pointer">
                              <div className="inline-flex items-center">
                                  <Clock className="mr-4 h-4 w-4"/>
                                  <span>{hist.name}</span>
                                  { hist.state && 
                                    <span className="text-sm text-muted-foreground">, {hist.state}</span>
                                  }
                                  <span className="text-sm text-muted-foreground">, {hist.country}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {format(hist.searchedAt, 'MMM do, h:mm a')}
                              </div>
                            </div>
                          </CommandItem>
                        ))
                      }
                  </div>
                </CommandGroup>
              )
            }
            {/* City Suggestions */}
            {query && query.length > 0 && (
              <CommandGroup heading="Suggestions">
                {
                  isLoading && (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </div>
                  )
                }
                <div className="flex flex-col gap-2 justify-center">
                  {                 
                  cities && cities.map((loc, i) => (
                      <CommandItem
                      key={`${loc.lat}-${loc.lon}`}
                      value={`${loc.lat}|${loc.lon}|${loc.name}|${loc.country}`}
                      onSelect={(value)=>handleSelect(value)}
                      >
                        <Search className="mr-2 h-4 w-4"/>
                        <span>{loc.name}</span>
                        { loc.state && 
                          <span className="text-sm text-muted-foreground">, {loc.state}</span>
                        }
                        <span className="text-sm text-muted-foreground">, {loc.country}</span>
                      </CommandItem>
                    ))}                 
                </div>
              </CommandGroup>
            )}
            <CommandSeparator />
            <CommandGroup heading="Favorites">
              <CommandItem>Search</CommandItem>
              <CommandItem>Weather</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="history"/>
            <CommandSeparator />
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
    // <div>
    //   <h1 className="font-bold text-xl uppercase">Location Serach : </h1>
    //   <div className="flex flex-col gap-4">
    //     {
    //       data && data.map((el,i)=>(
    //         <div className="pb-4 border-b border-white" key={i}>
    //           <p className="font-semibold text-lg">Name: {el.name}</p>
    //           <p ><span className="mr-3">Latitude: {el.lat}</span><span>Longitude: {el.lon}</span></p>
    //           <p>State: {el.state}</p>
    //           <p>Country: {el.country}</p>
    //         </div>
    //       ))
    //     }
    //   </div>
    // </div>
  );
};

export default LocationSerach;
