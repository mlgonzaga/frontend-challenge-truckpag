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
import type { MoviesResponse } from '@/interfaces/movies'
import { addMinutes, format } from 'date-fns'

interface FilmProps {
  film: MoviesResponse
}

export default function CardFilm({ film }: FilmProps) {
  const buttonVariants = [
    {
      id: 1,
      icon: <Eye />,
      text: 'Mark Watched',
    },
    {
      id: 2,
      icon: <Heart />,
      text: 'Add favorite',
    },
    {
      id: 3,
      icon: <StickyNote />,
      text: 'Add Notes',
    },
  ]

  const addNewMovieProp = (id: number, film: MoviesResponse) => {
    if (id === 1) {
      film.watched = !film.watched
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
            variant={'ghost'}
            onClick={() => addNewMovieProp(variant.id, film)}
          >
            {variant.icon} {!film.watched ? variant.text : "Watcherd"}
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}
