const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
];

const GalleryPage = () => {
    return (
        <div className='container'>
            <h2>Галерея</h2>
            <div className='gallery-grid'>
                {images.map((image, index) => (
                    <img
                        key={image + index.toString()}
                        src={image}
                        className='image-1-1'
                        alt={`Изображение: ${image.split('/')[image.length - 1]}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;
