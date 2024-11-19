import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/outline';

const SpaceTableHeader = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold">Liste des Espaces</h1>
      <Link to="/add-new/space" className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
        <PlusCircleIcon className="h-5 w-5 mr-2" />
      </Link>
    </div>
  );
};

export default SpaceTableHeader;