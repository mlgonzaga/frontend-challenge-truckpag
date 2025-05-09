import { useGetAllMoviesQuery } from '@/store/services/list-movies-service'
import type { MoviesResponse } from '@/interfaces/movies'
import CardFilm from './CardFilm'
import { Input } from './ui/input'
import { Search, Loader2, Eye, Heart, StickyNote, Star, ChevronDown } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from './ui/label'
import { useState, useMemo } from 'react'
import { useAppSelector } from '@/store'
import { Button } from './ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default function CardsSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [includeSynopsis, setIncludeSynopsis] = useState(false)
  const [sortOption, setSortOption] = useState('default')
  const [showWatched, setShowWatched] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showWithNotes, setShowWithNotes] = useState(false)
  const [ratingFilter, setRatingFilter] = useState('all')

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

    // Aplica filtros adicionais
    filteredFilms = filteredFilms.filter((film: MoviesResponse) => {
      const movieData = movieRatings[film.id]

      if (showWatched && !movieData?.watched) return false
      if (showFavorites && !movieData?.favorite) return false
      if (showWithNotes && !movieData?.note) return false

      if (ratingFilter !== 'all') {
        const rating = movieData?.rating || 0
        if (ratingFilter === 'unrated' && rating !== 0) return false
        if (ratingFilter !== 'unrated' && rating !== parseInt(ratingFilter)) return false
      }

      return true
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
  }, [getAllFilms, searchTerm, includeSynopsis, sortOption, movieRatings, showWatched, showFavorites, showWithNotes, ratingFilter])

  return (
    <div className='flex w-full flex-col bg-slate-900 sm:px-8 md:px-12 lg:px-24 py-8 px-2'>
      <div className='relative'>
        <Input
          placeholder='Search movies...'
          className='border-2 bg-white pl-10'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
        />
        {isLoading ? (
          <Loader2
            className='text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2 animate-spin'
            size={20}
          />
        ) : (
          <Search
            className='text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2'
            size={20}
          />
        )}
      </div>
      <div className='mt-4 flex justify-between'>
        <div className='flex items-center gap-3'>
          <Checkbox
            id='includeSynopsis'
            checked={includeSynopsis}
            onCheckedChange={(checked) => setIncludeSynopsis(checked === true)}
            disabled={isLoading}
          />
          <Label
            htmlFor='includeSynopsis'
            className={isLoading ? 'opacity-70' : 'font-normal text-white'}
          >
            Include synopsis in search
          </Label>
        </div>
        <Select
          value={sortOption}
          onValueChange={setSortOption}
          disabled={isLoading}
        >
          <SelectTrigger className='w-[240px] bg-white text-shadow-zinc-400'>
            <SelectValue placeholder='Default' />
          </SelectTrigger>
          <SelectContent className='bg-slate-400 text-white'>
            <SelectItem
              className='text-white hover:bg-zinc-700'
              value='default'
            >
              Default
            </SelectItem>
            <SelectItem
              className='text-white hover:bg-zinc-700'
              value='title-asc'
            >
              Title (A-Z)
            </SelectItem>
            <SelectItem
              className='text-white hover:bg-zinc-700'
              value='title-desc'
            >
              Title (Z-A)
            </SelectItem>
            <SelectItem
              className='text-white hover:bg-zinc-700'
              value='duration-shortest'
            >
              Duration (Shortest)
            </SelectItem>
            <SelectItem
              className='text-white hover:bg-zinc-700'
              value='duration-longest'
            >
              Duration (Longest)
            </SelectItem>
            <SelectItem
              className='text-white hover:bg-zinc-700'
              value='rating-highest'
            >
              Your Rating (Highest)
            </SelectItem>
            <SelectItem
              className='text-white hover:bg-zinc-700'
              value='rating-lowest'
            >
              Your Rating (Lowest)
            </SelectItem>
            <SelectItem
              className='text-white hover:bg-zinc-700'
              value='score-highest'
            >
              Score (Highest)
            </SelectItem>
            <SelectItem
              className='text-white hover:bg-zinc-700'
              value='score-lowest'
            >
              Score (Lowest)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center px-2">
        <p className='text-white'>Filters: </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={showWatched ? "destructive" : "outline"}
            onClick={() => setShowWatched(!showWatched)}
            className={`cursor-pointer ${showWatched ? "text-black" : " border-white hover:text-white hover:bg-white/10"}`}
          >
            <Eye className="mr-2 h-4 w-4" />
            Watched
          </Button>
          <Button
            variant={showFavorites ? "destructive" : "outline"}
            onClick={() => setShowFavorites(!showFavorites)}
            className={`cursor-pointer ${showFavorites ? "text-black cursor-pointer" : " border-white hover:text-white hover:bg-white/10"}`}
          >
            <Heart className="mr-2 h-4 w-4" />
            Favorites
          </Button>
          <Button
            variant={showWithNotes ? "destructive" : "outline"}
            onClick={() => setShowWithNotes(!showWithNotes)}
            className={`cursor-pointer ${showWithNotes ? "text-black cursor-pointer" : " border-white hover:text-white hover:bg-white/10"}`}
          >
            <StickyNote className="mr-2 h-4 w-4" />
            With Notes
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className={ratingFilter === 'all' ? "cursor-pointer border-white hover:text-white hover:bg-white/10" : "text-black"}>
              {ratingFilter === 'all' ? 'Any Rating' :
                ratingFilter === 'unrated' ? 'Unrated' :
                  `${ratingFilter} Stars`}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-400 text-black">
            <DropdownMenuItem
              onClick={() => setRatingFilter('all')}
              className="text-white hover:bg-zinc-700"
            >
              All Movies
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRatingFilter('all')}
              className="text-white hover:bg-zinc-700"
            >
              Any Rating
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRatingFilter('unrated')}
              className="text-white hover:bg-zinc-700"
            >
              Unrated
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRatingFilter('5')}
              className="text-white hover:bg-zinc-700"
            >
              5 Stars {Array(5).fill(0).map((_, index) => (
                <Star key={index} className="w-3 h-3 ml-1 text-yellow-400 fill-yellow-400" />
              ))}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRatingFilter('4')}
              className="text-white hover:bg-zinc-700"
            >
              4 Stars {Array(4).fill(0).map((_, index) => (
                <Star key={index} className="w-3 h-3 ml-1 text-yellow-400 fill-yellow-400" />
              ))}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRatingFilter('3')}
              className="text-white hover:bg-zinc-700"
            >
              3 Stars {Array(3).fill(0).map((_, index) => (
                <Star key={index} className="w-3 h-3 ml-1 text-yellow-400 fill-yellow-400" />
              ))}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRatingFilter('2')}
              className="text-white hover:bg-zinc-700"
            >
              2 Stars {Array(2).fill(0).map((_, index) => (
                <Star key={index} className="w-3 h-3 ml-1 text-yellow-400 fill-yellow-400" />
              ))}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRatingFilter('1')}
              className="text-white hover:bg-zinc-700"
            >
              1 Star {Array(1).fill(0).map((_, index) => (
                <Star key={index} className="w-3 h-3 ml-1 text-yellow-400 fill-yellow-400" />
              ))}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {(showWatched || showFavorites || showWithNotes || ratingFilter !== 'all') && (
          <Button
            variant="outline"
            onClick={() => {
              setShowWatched(false)
              setShowFavorites(false)
              setShowWithNotes(false)
              setRatingFilter('all')
            }}
            className="text-black hover:text-white hover:bg-white/10 cursor-pointer"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div
        className={`m-auto mt-6 grid gap-4 sm:gap-6 md:gap-6 lg:gap-8 grid-cols-1 ${filteredAndSortedFilms.length > 1
          ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
          : ''
          }`}
      >
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center min-h-[calc(100vh-200px)]">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : filteredAndSortedFilms.length === 0 ? (
          <div className='col-span-full text-center min-h-[calc(100vh-450px)] overflow-none'>
            <p className='text-xl text-white'>Nenhum filme encontrado</p>
            <p className='text-muted-foreground'>
              Tente alterar os filtros de busca
            </p>
          </div>
        ) : (
          filteredAndSortedFilms.map((film: MoviesResponse) => (
            <div key={film.id}>
              <CardFilm film={film} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}