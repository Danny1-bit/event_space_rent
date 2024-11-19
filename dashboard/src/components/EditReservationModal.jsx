import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditReservationModal = ({ modalOpen, setModalOpen, formData, handleFormChange, handleDateChange, handleSubmit, selectedReservation }) => {
  return (
    modalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded shadow-lg w-full max-w-lg overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <h2 className="text-lg font-semibold mb-4">Modifier la réservation</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1">Nom:</label>
              <input type="text" value={`${selectedReservation?.firstName} ${selectedReservation?.lastName}`} readOnly className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Date de début:</label>
              <DatePicker selected={formData.start} onChange={(date) => handleDateChange("start", date)} className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Date de fin:</label>
              <DatePicker selected={formData.end} onChange={(date) => handleDateChange("end", date)} className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Type d'événement:</label>
              <input type="text" name="eventType" value={formData.eventType} onChange={handleFormChange} className="border p-2 rounded w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Nombre de personnes:</label>
              <input type="number" name="numberOfPeople" value={formData.numberOfPeople} onChange={handleFormChange} min="1" className="border p-2 rounded w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Services:</label>
              {Object.keys(formData.services).map((service) => (
                <div key={service}>
                  <input
                    type="checkbox"
                    name={service}
                    checked={formData.services[service]}
                    onChange={handleFormChange}
                  />
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => setModalOpen(false)} className="bg-gray-300 text-black rounded px-4 py-2 mr-2">Annuler</button>
              <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">Sauvegarder</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditReservationModal;