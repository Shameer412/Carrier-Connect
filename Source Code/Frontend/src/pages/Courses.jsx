import React from 'react'
import ImageTextCarousel from './Carasoul' // Make sure this path is correct

const Courses = () => {
  return (
    <div className='mx-12'>
      <div className='flex justify-center items-center'>
        <h1 className='text-4xl font-bold'>Make your dream career a reality</h1>
      </div>
      <div className="my-8">
        <h2 className='text-2xl font-semibold mb-4'>Top categories</h2>
        <div className="flex justify-between items-center mb-4">
          <div className='text-center'>
            <img src="https://s.udemycdn.com/home/top-categories/lohp-category-design-v2.jpg" alt="Design" />
            <p>Design</p>
          </div>
          <div className='text-center'>
            <img src="https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg" alt="Development" />
            <p>Development</p>
          </div>
          <div className='text-center'>
            <img src="https://s.udemycdn.com/home/top-categories/lohp-category-marketing-v2.jpg" alt="Marketing" />
            <p>Marketing</p>
          </div>
          <div className='text-center'>
            <img src="https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg" alt="IT and Software" />
            <p>IT and Software</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className='text-center'>
            <img src="https://s.udemycdn.com/home/top-categories/lohp-category-personal-development-v2.jpg" alt="Personal Development" />
            <p>Personal Development</p>
          </div>
          <div className='text-center'>
            <img src="https://s.udemycdn.com/home/top-categories/lohp-category-business-v2.jpg" alt="Business" />
            <p>Business</p>
          </div>
          <div className='text-center'>
            <img src="https://s.udemycdn.com/home/top-categories/lohp-category-photography-v2.jpg" alt="Photography" />
            <p>Photography</p>
          </div>
          <div className='text-center'>
            <img src="https://s.udemycdn.com/home/top-categories/lohp-category-music-v2.jpg" alt="Music" />
            <p>Music</p>
          </div>
        </div>
      </div>
      <div className='my-8'>
        <h2 className='text-2xl font-semibold mb-4'>Featured topics by category</h2>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='text-xl font-semibold mb-2'>Development</h3>
            <div className='mb-2'>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Python</h4></a>
              <p>36,354,994 learners</p>
            </div>
            <div className='mb-2'>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Web Development</h4></a>
              <p>11,415,615 learners</p>
            </div>
            <div>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Machine Learning</h4></a>
              <p>7,070,015 learners</p>
            </div>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-2'>Business</h3>
            <div className='mb-2'>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Financial Analysis</h4></a>
              <p>36,354,994 learners</p>
            </div>
            <div className='mb-2'>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>SQL</h4></a>
              <p>11,415,615 learners</p>
            </div>
            <div>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>PMP</h4></a>
              <p>7,070,015 learners</p>
            </div>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-2'>IT and Software</h3>
            <div className='mb-2'>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Amazon AWS</h4></a>
              <p>6,123,456 learners</p>
            </div>
            <div className='mb-2'>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Ethical Hacking</h4></a>
              <p>10,931,066 learners</p>
            </div>
            <div>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Cyber Security</h4></a>
              <p>3,998,037 learners</p>
            </div>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-2'>Design</h3>
            <div className='mb-2'>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Photoshop</h4></a>
              <p>36,354,994 learners</p>
            </div>
            <div className='mb-2'>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Graphic Design</h4></a>
              <p>11,415,615 learners</p>
            </div>
            <div>
              <a href="/" className='text-blue-500 hover:underline'><h4 className='text-lg'>Drawing</h4></a>
              <p>7,070,015 learners</p>
            </div>
          </div>
        </div>
      </div>
      <ImageTextCarousel />
    </div>
  )
}

export default Courses
