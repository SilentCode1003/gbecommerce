import React from 'react';
import jobs from './jobs.json';
import SampleImage from './assets/images/AVRG750LCD_F-1024x1024.jpg';


const CLT = () => {
  // Slice the jobs array to get only the first 4 items
  const cardsToShow = jobs.slice(0, 4);
//   const imageUrl = jobs.imageUrl;
  const jobTitle = jobs.title;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-20">
      {cardsToShow.map((card) => (
        <div
          key={card.id} // Use unique id from card
          className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
            
          <img
            className="w-64 h-64 rounded-lg"
            src={SampleImage}
            alt={jobTitle}
          />
          <div className="p-6">
            <h2 className="font-semibold text-2xl mb-2 text-gray-800">
              {card.title}
            </h2>
            {/* <p className="text-gray-600 text-base mb-4">
              {card.description}
            </p> */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">{card.type}</span>
              <span className="text-sm text-gray-500">{card.location}</span>
              <span className="text-sm text-gray-500">{card.salary}</span>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {card.company.name}
              </h3>
              {/* <p className="text-gray-600 text-sm">
                {card.company.description}
              </p> */}
              <p className="text-gray-500 text-sm">
                Email: {card.company.contactEmail}
              </p>
              <p className="text-gray-500 text-sm">
                Phone: {card.company.contactPhone}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CLT;
