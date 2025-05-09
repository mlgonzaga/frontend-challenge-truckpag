import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'
import { Eye, Heart, Star, StickyNote } from 'lucide-react'
import { addMinutes, format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { updateMovie } from '@/store/slices/movieSlice'
import { toast } from 'sonner'
import type { MoviesResponse } from '@/interfaces/movies'
import { useAppSelector } from '@/store'

interface FilmProps {
  film: MoviesResponse
}

export default function CardFilm({ film }: FilmProps) {
  const dispatch = useDispatch()

  // Buscar os dados do filme do estado global
  const movieData = useAppSelector((state) => state.movies.movieData[film.id])

  const isWatched = movieData?.watched || false
  const isFavorite = movieData?.favorite || false

  const buttonVariants = [
    {
      id: 1,
      icon: <Eye className={isWatched ? 'fill-gray' : ''} />,
      text: isWatched ? 'Watched' : 'Mark Watched',
      variant: isWatched ? 'default' : 'outline',
    },
    {
      id: 2,
      icon: <Heart className={isFavorite ? 'fill-red-500 text-red-500' : ''} />,
      text: isFavorite ? 'Favorite' : 'Add favorite',
      variant: isFavorite ? 'default' : 'outline',
    },
    {
      id: 3,
      icon: <StickyNote />,
      text: 'Add Notes',
      variant: 'outline',
    },
  ]

  const addNewMovieProp = (id: number) => {
    switch (id) {
      case 1: {
        dispatch(
          updateMovie({
            id: film.id,
            watched: !isWatched,
          })
        )
        !isWatched
          ? toast.success('Movie marked as watched')
          : toast.success('Movie removed from watched')
        break
      }
      case 2: {
        dispatch(
          updateMovie({
            id: film.id,
            favorite: !isFavorite,
          })
        )
        !isFavorite
          ? toast.success('Movie added to favorites')
          : toast.success('Movie removed from favorites')
        break
      }
      case 3: {
        // Adicionar funcionalidade de notas
        toast.info('Note feature coming soon')
        break
      }
    }
  }

  return (
    <Card className='w-80 rounded-2xl'>
      <img src={film.image} alt='' className='rounded-t-2xl' />
      <CardHeader>
        <CardTitle>{film.title}</CardTitle>
        <p>
          <span>{film.release_date}</span> •{' '}
          <span>
            {format(
              addMinutes(
                new Date().setHours(0, 0, 0, 0),
                Number(film.running_time)
              ),
              "H'h' mm'min'"
            )}
          </span>
        </p>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Star className='fill-yellow-400 text-yellow-400' />
            <span> {film.rt_score}%</span>
          </div>
          <span>Not rated</span>
        </div>

        <CardDescription className='max-h-56 truncate text-nowrap'>
          {film.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Director: {film.director}</p>
        <p>Producer: {film.producer}</p>
      </CardContent>
      <CardFooter className='flex flex-col gap-2'>
        {buttonVariants.map((variant, index) => (
          <Button
            key={index}
            className='my-auto flex w-full cursor-pointer gap-2 border-2'
            variant={
              variant.variant as
                | 'default'
                | 'destructive'
                | 'outline'
                | 'secondary'
                | 'ghost'
                | 'link'
                | null
                | undefined
            }
            onClick={() => addNewMovieProp(variant.id)}
          >
            {variant.icon} {variant.text}
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}
