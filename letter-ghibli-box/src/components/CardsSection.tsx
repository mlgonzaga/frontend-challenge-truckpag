import { useGetAllMoviesQuery } from '@/store/services/list-movies-service'
import type { MoviesResponse } from '@/interfaces/movies'
import CardFilm from './CardFilm'
import { Input } from './ui/input'
import { Search, Loader2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from './ui/label'
import { useState, useMemo } from 'react'
import { useAppSelector } from '@/store'
import { Skeleton } from './ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'


export default function CardsSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [includeSynopsis, setIncludeSynopsis] = useState(false)
  const [sortOption, setSortOption] = useState('default')

  const movieRatings = useAppSelector((state) => state.movies.movieData)

  const { getAllFilms, isLoading } = useGetAllMoviesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      getAllFilms: data || [],
      isLoading,
    }),
  })

  const filteredAndSortedFilms = useMemo(() => {
    if (!getAllFilms) return []

    // Primeiro filtra os filmes
    let filteredFilms = getAllFilms.filter((film: MoviesResponse) => {
      const titleMatch = film.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      
      if (!includeSynopsis) return titleMatch
      
      const synopsisMatch = film.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      
      return titleMatch || synopsisMatch
    })

    // Depois ordena os filmes filtrados
    return filteredFilms.sort((a: MoviesResponse, b: MoviesResponse) => {
      switch (sortOption) {
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        case 'duration-shortest':
          return parseInt(a.running_time) - parseInt(b.running_time)
        case 'duration-longest':
          return parseInt(b.running_time) - parseInt(a.running_time)
        case 'rating-highest':
          const ratingA = movieRatings[a.id]?.rating || 0
          const ratingB = movieRatings[b.id]?.rating || 0
          return ratingB - ratingA
        case 'rating-lowest':
          const ratingALow = movieRatings[a.id]?.rating || 0
          const ratingBLow = movieRatings[b.id]?.rating || 0
          return ratingALow - ratingBLow
        case 'score-highest':
          return parseInt(b.rt_score) - parseInt(a.rt_score)
        case 'score-lowest':
          return parseInt(a.rt_score) - parseInt(b.rt_score)
        default:
          return 0
      }
    })
  }, [getAllFilms, searchTerm, includeSynopsis, sortOption, movieRatings])

  const renderSkeletons = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => (
        <div key={`skeleton-${index}`}>
          <Card className='w-80 rounded-2xl'>
            <Skeleton className='h-[300px] w-full rounded-t-2xl' />
            <CardHeader>
              <Skeleton className='h-6 w-3/4 mb-2' />
              <Skeleton className='h-4 w-1/2 mb-2' />
              <div className='flex justify-between mb-2'>
                <div className='flex gap-2'>
                  <Skeleton className='h-5 w-5 rounded-full' />
                  <Skeleton className='h-4 w-10' />
                </div>
                <div className='flex items-center'>
                  <div className='flex gap-1'>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className='h-4 w-4 rounded-full' />
                    ))}
                  </div>
                  <Skeleton className='h-4 w-16 ml-2' />
                </div>
              </div>
              <Skeleton className='h-16 w-full' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-4 w-3/4 mb-2' />
              <Skeleton className='h-4 w-3/4' />
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className='h-9 w-full' />
              ))}
            </CardFooter>
          </Card>
        </div>
      ))
  }

  return (
    <div className='flex w-full flex-col py-8 px-40 '>
      <div className="relative">
        <Input 
          placeholder='Buscar filmes...' 
          className='border-2 pl-10'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
        />
        {isLoading ? (
          <Loader2 className='text-muted-foreground animate-spin absolute left-2 top-1/2 -translate-y-1/2' size={20} />
        ) : (
          <Search className='text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2' size={20} />
        )}
      </div>
      <div className='flex justify-between mt-4'>
        <div className='flex items-center gap-3'>
          <Checkbox 
            id="includeSynopsis" 
            checked={includeSynopsis}
            onCheckedChange={(checked) => setIncludeSynopsis(checked === true)}
            disabled={isLoading}
          />
          <Label htmlFor="includeSynopsis" className={isLoading ? 'opacity-70' : ''}>
            Incluir sinopse na busca
          </Label>
        </div>
        <Select value={sortOption} onValueChange={setSortOption} disabled={isLoading}>
          <SelectTrigger className='w-[240px]'>
            <SelectValue placeholder='Ordenar por (Padrão)' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='default'>Padrão</SelectItem>
            <SelectItem value='title-asc'>Título (A-Z)</SelectItem>
            <SelectItem value='title-desc'>Título (Z-A)</SelectItem>
            <SelectItem value='duration-shortest'>Duração (Mais curta)</SelectItem>
            <SelectItem value='duration-longest'>Duração (Mais longa)</SelectItem>
            <SelectItem value='rating-highest'>Sua Avaliação (Maior)</SelectItem>
            <SelectItem value='rating-lowest'>Sua Avaliação (Menor)</SelectItem>
            <SelectItem value='score-highest'>Pontuação (Maior)</SelectItem>
            <SelectItem value='score-lowest'>Pontuação (Menor)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        className={`m-auto mt-6 grid gap-8 ${
          (isLoading || filteredAndSortedFilms.length > 1) ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
        }`}
      >
        {isLoading ? (
          renderSkeletons()
        ) : filteredAndSortedFilms.length === 0 ? (
          <div className="col-span-full text-center">
            <p className="text-xl">Nenhum filme encontrado</p>
            <p className="text-muted-foreground">Tente alterar os filtros de busca</p>
          </div>
        ) : (
          filteredAndSortedFilms.map((film: MoviesResponse) => (
            <div key={film.id}>
              <CardFilm film={film}/>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
