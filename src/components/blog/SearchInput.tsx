
'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export function SearchInput({ defaultValue }: { defaultValue?: string }) {
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('q', term)
        } else {
            params.delete('q')
        }
        replace(`/?${params.toString()}`)
    }, 300)

    return (
        <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Buscar artigos..."
                className="pl-9 bg-background/50 border-input focus:bg-background transition-colors"
                defaultValue={searchParams.get('q')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}
