import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ImageTextCarousel.css'; // Import your custom CSS file

const ImageTextCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    }
  };

  const items = [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtdRsbNblY-trvVBgVFHyP_g2Lrz9dLP3k7Q&s',
      text: 'Python Course'
    },
    {
      image: 'https://repository-images.githubusercontent.com/124365799/7d888300-6a39-11ea-9025-fd5574f062c7',
      text: 'C++ Course'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZq_FDxj8jleGCeDXaWUdeuD1XGtvc2wG0Vg&s',
      text: 'Javascript Course'
    },
    {
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*fO8PgmEQO52-IbPAeUzj0w.gif',
      text: 'Java Course'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSR4sWGfuHCmHvYGFZVQvgRWI1CGQMSVVN2g&s',
      text: 'Aws Course'
    }
    // Add more items as needed
  ];

  return (
    <div className="carousel-container">
      <h2>Basic Courses</h2>
      <Carousel 
        responsive={responsive} 
        infinite={true} 
        autoPlay={true} 
        autoPlaySpeed={3000}
        itemClass="carousel-item-padding-40-px"
      >
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <div className="image-container">
              <img src={item.image} alt={`Slide ${index + 1}`} />
              <div className="button-container">
                
              </div>
            </div>
            <div className="text-container">
              <h4>{item.text}</h4>
              <button className="enroll-button">Enroll</button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageTextCarousel;
