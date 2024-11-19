import React from 'react';

const SpaceRow = ({ space, handleDelete, handleEditClick }) => {
  return (
    <tr>
      <td className="py-3 px-5 border-b">{space.name}</td>
      <td className="py-3 px-5 border-b">{space.location}</td>
      <td className="py-3 px-5 border-b">{space.capacity}</td>
      <td className="py-3 px-5 border-b">
        {space.photos.map((photo, index) => (
          <img
            key={index}
            src={`http://localhost:3030/uploads/${photo}`}
            alt="space"
            className="w-12 h-12 object-cover inline-block mr-2"
          />
        ))}
      </td>
      <td className="py-3 px-5 border-b">
        <button onClick={() => handleEditClick(space)} className="text-blue-600 hover:underline mr-4">Modifier</button>
        <button onClick={() => handleDelete(space._id)} className="text-red-600 hover:underline">Supprimer</button>
      </td>
    </tr>
  );
};

export default SpaceRow;
