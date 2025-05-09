import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from './ui/button'
import { Eye, Heart, Star, StickyNote, ChevronDown, ChevronUp } from 'lucide-react'
import { addMinutes, format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { updateMovie } from '@/store/slices/movieSlice'
import { toast } from 'sonner'
import type { MoviesResponse } from '@/interfaces/movies'
import { useAppSelector } from '@/store'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FilmProps {
  film: MoviesResponse
}

export default function CardFilm({ film }: FilmProps) {
  const dispatch = useDispatch()
  const [noteText, setNoteText] = useState('')
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const movieData = useAppSelector((state) => state.movies.movieData[film.id])

  const isWatched = movieData?.watched || false
  const isFavorite = movieData?.favorite || false
  const notes = movieData?.note || "" 
  const rating = movieData?.rating || 0

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
      icon: <StickyNote className={notes ? 'fill-yellow-100' : ''} />,
      text: notes ? 'See Notes' : 'Add Notes',
      variant: notes ? 'default' : 'outline',
    },
  ]

  const handleNoteSubmit = () => {
    dispatch(
      updateMovie({
        id: film.id,
        note: noteText,
      })
    )
    setIsNoteDialogOpen(false)
    toast.success('Nota adicionada com sucesso!')
  }

  const openNoteDialog = () => {
    setNoteText(notes || '')
    setIsNoteDialogOpen(true)
  }

  const handleRatingChange = (newRating: number) => {
    dispatch(
      updateMovie({
        id: film.id,
        rating: newRating,
      })
    )
    toast.success(`Avaliação definida: ${newRating}/5 estrelas`)
  }

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
        openNoteDialog()
        break
      }
    }
  }

  return (
    <>
      <Card className='min-w-[280px] sm:w-full w-full rounded-2xl'>
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
            <div className='flex items-center'>
              <div className='flex'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`cursor-pointer transition-colors ${
                      (hoverRating > 0 ? hoverRating >= star : rating >= star)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    size={18}
                    onClick={() => handleRatingChange(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
              <span className='ml-2 text-sm'>
                {rating > 0 ? `${rating}/5` : 'Not rated'}
              </span>
            </div>
          </div>

          <div>
            <CardDescription className={`${isDescriptionExpanded ? '' : 'max-h-12 overflow-hidden'} transition-all duration-300`}>
              {film.description}
            </CardDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-1 p-0 h-auto text-xs flex items-center" 
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? (
                <>Mostrar menos <ChevronUp className="ml-1 h-3 w-3" /></>
              ) : (
                <>Ler mais <ChevronDown className="ml-1 h-3 w-3" /></>
              )}
            </Button>
          </div>
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

      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Nota</DialogTitle>
            <DialogDescription>
              Adicione suas anotações sobre "{film.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="note" className="text-right">
                Nota
              </Label>
              <Input
                id="note"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="col-span-3"
                placeholder="Escreva sua nota aqui..."
              />
            </div>
            {notes && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Nota Atual</Label>
                <div className="col-span-3 rounded-md border p-2">{notes}</div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleNoteSubmit}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
