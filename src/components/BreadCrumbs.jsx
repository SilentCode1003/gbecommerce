import React from 'react';
import { NavLink } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="bg--200 px-10 pt-10 pb-4 text-sm text-gray-400" aria-label="breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index !== paths.length - 1 ? (
              <NavLink to={path.link} className="hover:text-gray-600">
                {path.name}
              </NavLink>
            ) : (
              <span className="text-black font-bold hover:text-gray-400">{path.name}</span>
            )}
            {index < paths.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
