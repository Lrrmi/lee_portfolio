type GalleryImage = {
  src: string
  alt: string
}

const Gallery = ({ images }: { images: GalleryImage[] }) => {
  return (
    <section className='sm:py-46 lg:py-24'>
        <div className='flex flex-wrap justify-center gap-6'>
              {images.map((image) => (
                <img key={image.alt} src={image.src} alt={image.alt} className='h-64 w-auto object-cover' />
              ))}
        </div>
    </section>
  )
}

export default Gallery
