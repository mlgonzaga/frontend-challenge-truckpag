import { useGetAllMoviesQuery } from '@/store/services/list-movies-service'
import type { MoviesResponse } from '@/interfaces/movies'
import CardFilm from './CardFilm'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from './ui/label'


export default function CardsSection() {

 



  const { getAllFilms, isLoading } = useGetAllMoviesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      getAllFilms: data || [],
      isLoading,
    }),
  })

 

  return (
    <div className='flex w-full flex-col p-8'>
      <Input placeholder='Search movies...' className='border-2 pl-10' />
      <Search className='text-muted-foreground relative bottom-4 left-2 -translate-y-1/2' />
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <Checkbox />
          <Label>Include synopsis in search</Label>
        </div>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Default' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>Title (A-Z)</SelectItem>
            <SelectItem value='dark'>Title (Z-A)</SelectItem>
            <SelectItem value='system'>Duration (Shortest)</SelectItem>
            <SelectItem value='system'>Duration (Longest)</SelectItem>
            <SelectItem value='system'>Your Rating (Highest)</SelectItem>
            <SelectItem value='system'>Your Rating (Lowest)</SelectItem>
            <SelectItem value='system'>Score (Highest)</SelectItem>
            <SelectItem value='system'>Score (Lowest)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        className={`m-auto grid gap-8 ${getAllFilms.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}
      >
        {isLoading ? (
          <p>Carregando...</p>
        ) : getAllFilms.length === 0 ? (
          <p>Nenhum filme encontrado</p>
        ) : (
          getAllFilms.map((film: MoviesResponse) => (
            <div key={film.id}>
              <CardFilm film = {film}/>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
