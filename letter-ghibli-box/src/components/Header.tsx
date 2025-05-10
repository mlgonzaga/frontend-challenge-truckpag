export default function Header() {
  return (
    <div className='flex w-full flex-col gap-3 bg-slate-700 text-center text-white pb-3 px-2'>
      <div className='mx-auto flex items-center gap-15'>
        <div className='relative h-5 w-5'>
          <div className='absolute left-0 h-5 w-5 rounded-full bg-orange-500 mix-blend-screen'></div>

          <div className='absolute left-3 h-5 w-5 rounded-full bg-green-500 mix-blend-screen'></div>

          <div className='absolute left-6 h-5 w-5 rounded-full bg-cyan-500 mix-blend-screen'></div>
        </div>
        <h2 className='font-bold text-base sm:text-lg'>Letter Ghibli Boxd</h2>
      </div>

      <h1 className='text-3xl sm:text-5xl font-bold'>Studio Ghibli Collection</h1>

      <p className='text-sm sm:text-lg'>
        Explore the magical world of Studio Ghibli films. Mark your favorites
        and keep track of what you've watched.
      </p>
    </div>
  )
}
