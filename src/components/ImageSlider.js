import { Container } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ImageSlider({ data }) {
  return (
    <Carousel
      autoPlay
      interval={3000}
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      stopOnHover={false}
    >
      {data.map((slide, index) => (
        <img key={index} src={slide.src} alt={slide.alt} />
      ))}
    </Carousel>
  );
}

export default ImageSlider;
