import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

interface searchHistoryItem{
    id: string;
    query: string;
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    searchedAt: number;
}
export const useLocationHistory=()=>{
    const[history,setHistory]=useLocalStorage<searchHistoryItem[]>("search-history",[]);

    const QueryClient = useQueryClient() 

    const historyQuery=useQuery({
        queryKey:["search-history"],
        queryFn:()=> history,
        initialData:history,
    })
    const addToHistory=useMutation({
        mutationFn:async(search:Omit<searchHistoryItem,'id'|'searchedAt'>)=>{
            const newSearchHistory:searchHistoryItem={
                ...search,
                id: `${search.lat}-${search.lon}-${Date.now()}-${search.state}`,
                searchedAt: Date.now()
            };
            const filteredHistory= history.filter(
                (item) => !(item.lat === search.lat && item.lon === search.lon)
            );
            const updatedSearchHistory = [newSearchHistory, ...filteredHistory].slice(0,10);
            setHistory(updatedSearchHistory);
            return updatedSearchHistory;
        },
        onSuccess:(newHistory)=>{
            QueryClient.setQueryData(["search-history"],newHistory)
        }
        
    })
    const clearHistory=useMutation({
        mutationFn: async()=>{
            setHistory([])
            return []
        },
        onSuccess:()=>{
            QueryClient.setQueryData(["search-history"],[])
        }
    })

    return{
        history: historyQuery.data??[],
        addToHistory,
        clearHistory
    }
}