// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
// import axios from "axios";
// import EditReservationModal from "../components/EditReservationModal";
// import AddReservation from "../components/AddReservation"; // Importer le composant AddReservation
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import CSS pour react-datepicker

// const Dashboard = () => {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [addModalOpen, setAddModalOpen] = useState(false); // État pour la modale d'ajout
//   const [selectedReservation, setSelectedReservation] = useState(null);
//   const [formData, setFormData] = useState({
//     start: new Date(),
//     end: null,
//     daysCount: 1,
//     eventType: "",
//     numberOfPeople: 1,
//     services: {
//       catering: false,
//       audiovisual: false,
//       furniture: false,
//       decoration: false,
//       eventCoordination: false,
//       entertainment: false,
//       transport: false,
//     },
//   });

//   // États pour les filtres de recherche
//   const [searchName, setSearchName] = useState("");
//   const [searchStartDate, setSearchStartDate] = useState(null);
//   const [searchEndDate, setSearchEndDate] = useState(null);
//   const [searchEventType, setSearchEventType] = useState("");

//   useEffect(() => {
//     const fetchReservations = async () => {
//       setLoading(true);
//       try {
//         const { data } = await axios.get("http://localhost:3030/api/v1/space-reservations");
//         setReservations(data);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Erreur lors de la récupération des réservations");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReservations();
//   }, []);

//   const handleDelete = async (reservationId) => {
//     if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
//       try {
//         const { data } = await axios.delete(`http://localhost:3030/api/v1/space-reservations/${reservationId}`);
//         setReservations((prev) => prev.filter((res) => res._id !== reservationId));
//         toast.success(data.message);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Erreur lors de la suppression de la réservation");
//       }
//     }
//   };

//   const handleEditClick = (reservation) => {
//     setSelectedReservation(reservation);
//     setFormData({
//       start: new Date(reservation.reservationDate.start),
//       end: reservation.reservationDate.end ? new Date(reservation.reservationDate.end) : null,
//       daysCount: reservation.daysCount,
//       eventType: reservation.eventType,
//       numberOfPeople: reservation.numberOfPeople,
//       services: { ...reservation.services },
//     });
//     setModalOpen(true);
//   };

//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prev) => ({ ...prev, services: { ...prev.services, [name]: checked } }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleDateChange = (dateType, date) => {
//     if (dateType === "start") {
//       setFormData((prev) => ({ ...prev, start: date }));
//     } else {
//       setFormData((prev) => ({ ...prev, end: date }));
//     }
//   };

//   const handleStatusChange = async (reservationId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:3030/api/v1/space-reservations/${reservationId}`, { status: newStatus });
//       setReservations((prev) =>
//         prev.map((res) => (res._id === reservationId ? { ...res, status: newStatus } : res))
//       );
//       toast.success("Statut de la réservation mis à jour avec succès");
//     } catch (error) {
//       toast.error("Erreur lors de la mise à jour du statut de la réservation");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.start || !formData.eventType || !formData.numberOfPeople) {
//       toast.error("Veuillez remplir tous les champs obligatoires.");
//       return;
//     }

//     const updatedData = {
//       ...formData,
//       reservationDate: {
//         start: formData.start.toISOString(),
//         end: formData.end ? formData.end.toISOString() : null,
//       },
//       status: selectedReservation?.status,
//     };

//     try {
//       const { data } = await axios.put(`http://localhost:3030/api/v1/space-reservations/${selectedReservation._id}`, updatedData);
//       setReservations((prev) =>
//         prev.map((reservation) =>
//           reservation._id === selectedReservation._id ? { ...reservation, ...updatedData } : reservation
//         )
//       );
//       toast.success(data.message);
//       setModalOpen(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Erreur lors de la mise à jour de la réservation");
//     }
//   };

//   const filteredReservations = reservations.filter((reservation) => {
//     const clientName = `${reservation.firstName} ${reservation.lastName}`.toLowerCase();
//     const startDate = new Date(reservation.reservationDate.start);
//     const endDate = reservation.reservationDate.end ? new Date(reservation.reservationDate.end) : null;

//     const matchesName = clientName.includes(searchName.toLowerCase());
//     const matchesStartDate = !searchStartDate || startDate >= new Date(searchStartDate);
//     const matchesEndDate = !searchEndDate || (endDate ? endDate <= new Date(searchEndDate) : false);
//     const matchesEventType = reservation.eventType.toLowerCase().includes(searchEventType.toLowerCase());

//     return matchesName && matchesStartDate && matchesEndDate && matchesEventType;
//   });

//   return (
//     <div className="flex flex-col gap-5 mx-4 md:mx-20 bg-gray-100 p-4 md:p-10 h-screen rounded-lg">
//       <h4 className="text-xl md:text-2xl text-center cursor-pointer font-semibold mb-5 text-gray-800">
//         Réservations d'Espace
//       </h4>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setAddModalOpen(true)}
//           className="flex items-center bg-blue-500 text-white rounded px-3 py-2"
//         >
//           <MdAdd className="mr-2" />
//           Ajouter une réservation
//         </button>
//       </div>

//       {/* Barre de recherche */}
//       <div className="flex gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Nom / Prénom"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           className="border rounded p-2"
//         />
//         <DatePicker
//           selected={searchStartDate}
//           onChange={(date) => setSearchStartDate(date)}
//           className="border rounded p-2"
//           placeholderText="Date de début"
//           dateFormat="dd/MM/yyyy"
//         />
//         <DatePicker
//           selected={searchEndDate}
//           onChange={(date) => setSearchEndDate(date)}
//           className="border rounded p-2"
//           placeholderText="Date de fin"
//           dateFormat="dd/MM/yyyy"
//         />
//         <input
//           type="text"
//           placeholder="Type d'événement"
//           value={searchEventType}
//           onChange={(e) => setSearchEventType(e.target.value)}
//           className="border rounded p-2"
//         />
//       </div>

//       {loading ? (
//         <p className="text-center">Chargement...</p>
//       ) : (
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="py-2 px-4">Client</th>
//               <th className="py-2 px-4">Date</th>
//               <th className="py-2 px-4">Jours</th> {/* Nouvelle colonne pour le nombre de jours */}
//               <th className="py-2 px-4">Type d'événement</th>
//               <th className="py-2 px-4">Nombre de personnes</th>
//               <th className="py-2 px-4">Services</th>
//               <th className="py-2 px-4">Statut</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReservations.length > 0 ? (
//               filteredReservations.map((reservation) => (
//                 <tr key={reservation._id} className="hover:bg-gray-300">
//                   <td className="py-2 text-center px-4">{`${reservation.firstName} ${reservation.lastName}`}</td>
//                   <td className="py-2 text-center px-4">
//                     {new Date(reservation.reservationDate.start).toLocaleDateString()} - 
//                     {reservation.reservationDate.end && new Date(reservation.reservationDate.end).toLocaleDateString()}
//                   </td>
//                   <td className="py-2 text-center px-4">{reservation.daysCount} jours</td> {/* Affichage du nombre de jours */}
//                   <td className="py-2 text-center px-4">{reservation.eventType}</td>
//                   <td className="py-2 text-center px-4">{reservation.numberOfPeople}</td>
//                   <td className="py-2 text-center px-4">
//                     <ul>
//                       {Object.entries(reservation.services).map(([service, isAvailable]) => 
//                         isAvailable && (
//                           <li key={service}>
//                             {service.charAt(0).toUpperCase() + service.slice(1)} 
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   </td>
//                   <td className="py-2 text-center px-4">
//                     <select
//                       value={reservation.status}
//                       onChange={(e) => handleStatusChange(reservation._id, e.target.value)}
//                       className="bg-gray-100 border rounded-md p-1"
//                     >
//                       <option value="Pending">En attente</option>
//                       <option value="Accepted">Acceptée</option>
//                       <option value="Rejected">Rejetée</option>
//                     </select>
//                   </td>
//                   <td className="py-2 text-center px-4">
//                     <MdEdit
//                       size={20}
//                       className="text-blue-600 cursor-pointer mx-2"
//                       onClick={() => handleEditClick(reservation)}
//                       aria-label="Modifier la réservation"
//                     />
//                     <MdDelete
//                       size={20}
//                       className="text-red-600 cursor-pointer"
//                       onClick={() => handleDelete(reservation._id)}
//                       aria-label="Supprimer la réservation"
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center">Aucune réservation trouvée</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}

//       {/* Utilisation du composant EditReservationModal */}
//       <EditReservationModal
//         modalOpen={modalOpen}
//         setModalOpen={setModalOpen}
//         formData={formData}
//         handleFormChange={handleFormChange}
//         handleDateChange={handleDateChange}
//         handleSubmit={handleSubmit}
//         selectedReservation={selectedReservation}
//       />

//       {/* Modale d'ajout de réservation */}
//       {addModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <AddReservation onSuccess={() => setAddModalOpen(false)} />
//             <button
//               onClick={() => setAddModalOpen(false)}
//               className="mt-4 bg-red-500 text-white rounded px-4 py-2"
//             >
//               Annuler
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import axios from "axios";
import EditReservationModal from "../components/EditReservationModal";
import AddReservation from "../components/AddReservation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [formData, setFormData] = useState({
    start: new Date(),
    end: null,
    daysCount: 1,
    eventType: "",
    numberOfPeople: 1,
    services: {
      catering: false,
      audiovisual: false,
      furniture: false,
      decoration: false,
      eventCoordination: false,
      entertainment: false,
      transport: false,
    },
  });

  const [searchName, setSearchName] = useState("");
  const [searchStartDate, setSearchStartDate] = useState(null);
  const [searchEndDate, setSearchEndDate] = useState(null);
  const [searchEventType, setSearchEventType] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3030/api/v1/space-reservations");
        setReservations(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Erreur lors de la récupération des réservations");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleDelete = async (reservationId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      try {
        const { data } = await axios.delete(`http://localhost:3030/api/v1/space-reservations/${reservationId}`);
        setReservations((prev) => prev.filter((res) => res._id !== reservationId));
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Erreur lors de la suppression de la réservation");
      }
    }
  };

  const handleEditClick = (reservation) => {
    setSelectedReservation(reservation);
    setFormData({
      start: new Date(reservation.reservationDate.start),
      end: reservation.reservationDate.end ? new Date(reservation.reservationDate.end) : null,
      daysCount: reservation.daysCount,
      eventType: reservation.eventType,
      numberOfPeople: reservation.numberOfPeople,
      services: { ...reservation.services },
    });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, services: { ...prev.services, [name]: checked } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (dateType, date) => {
    if (dateType === "start") {
      setFormData((prev) => ({ ...prev, start: date }));
    } else {
      setFormData((prev) => ({ ...prev, end: date }));
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await axios.put(`http://localhost:3030/api/v1/space-reservations/${reservationId}`, { status: newStatus });
      setReservations((prev) =>
        prev.map((res) => (res._id === reservationId ? { ...res, status: newStatus } : res))
      );
      toast.success("Statut de la réservation mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut de la réservation");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.start || !formData.eventType || !formData.numberOfPeople) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const updatedData = {
      ...formData,
      reservationDate: {
        start: formData.start.toISOString(),
        end: formData.end ? formData.end.toISOString() : null,
      },
      status: selectedReservation?.status,
    };

    try {
      const { data } = await axios.put(`http://localhost:3030/api/v1/space-reservations/${selectedReservation._id}`, updatedData);
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation._id === selectedReservation._id ? { ...reservation, ...updatedData } : reservation
        )
      );
      toast.success(data.message);
      setModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la mise à jour de la réservation");
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    const clientName = `${reservation.firstName} ${reservation.lastName}`.toLowerCase();
    const startDate = new Date(reservation.reservationDate.start);
    const endDate = reservation.reservationDate.end ? new Date(reservation.reservationDate.end) : null;

    const matchesName = clientName.includes(searchName.toLowerCase());
    const matchesStartDate = !searchStartDate || startDate >= new Date(searchStartDate);
    const matchesEndDate = !searchEndDate || (endDate ? endDate <= new Date(searchEndDate) : false);
    const matchesEventType = reservation.eventType.toLowerCase().includes(searchEventType.toLowerCase());

    return matchesName && matchesStartDate && matchesEndDate && matchesEventType;
  });

  return (
    <div className="flex flex-col gap-5 mx-4 md:mx-20 bg-gray-100 p-4 md:p-10 h-screen rounded-lg">
      <h4 className="text-xl md:text-2xl text-center cursor-pointer font-semibold mb-5 text-gray-800">
        Réservations d'Espace
      </h4>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center bg-blue-500 text-white rounded px-3 py-2"
        >
          <MdAdd className="mr-2" />
          Ajouter une réservation
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Nom / Prénom"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border rounded p-2"
        />
        <DatePicker
          selected={searchStartDate}
          onChange={(date) => setSearchStartDate(date)}
          className="border rounded p-2"
          placeholderText="Date de début"
          dateFormat="dd/MM/yyyy"
        />
        <DatePicker
          selected={searchEndDate}
          onChange={(date) => setSearchEndDate(date)}
          className="border rounded p-2"
          placeholderText="Date de fin"
          dateFormat="dd/MM/yyyy"
        />
        <input
          type="text"
          placeholder="Type d'événement"
          value={searchEventType}
          onChange={(e) => setSearchEventType(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Client</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Jours</th>
              <th className="py-2 px-4">Type d'événement</th>
              <th className="py-2 px-4">Nombre de personnes</th>
              <th className="py-2 px-4">Services</th>
              <th className="py-2 px-4">Statut</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => (
                <tr key={reservation._id} className="hover:bg-gray-300">
                  <td className="py-2 text-center px-4">{`${reservation.firstName} ${reservation.lastName}`}</td>
                  <td className="py-2 text-center px-4">
                    {new Date(reservation.reservationDate.start).toLocaleDateString()} - 
                    {reservation.reservationDate.end && new Date(reservation.reservationDate.end).toLocaleDateString()}
                  </td>
                  <td className="py-2 text-center px-4">{reservation.daysCount} jours</td>
                  <td className="py-2 text-center px-4">{reservation.eventType}</td>
                  <td className="py-2 text-center px-4">{reservation.numberOfPeople}</td>
                  <td className="py-2 text-center px-4">
  <span className="text-blue-800">
    {reservation.services
      .filter(service => service.selected) // Filtrer uniquement les services sélectionnés
      .map((service, index) => (
        <span key={service.name}>
          {service.name.charAt(0).toUpperCase() + service.name.slice(1)}{/* Capitaliser le nom */}
          {index < reservation.services.filter(s => s.selected).length - 1 && ', '} {/* Ajouter une virgule sauf pour le dernier élément */}
        </span>
      ))}
  </span>
</td>
                  <td className="py-2 text-center px-4">
                  <select
                      value={reservation.status}
                      onChange={(e) => handleStatusChange(reservation._id, e.target.value)}
                      className="border rounded p-1"
                    >
                      <option value="Pending">En attente</option>
                      <option value="Accepted">Accepté</option>
                      <option value="Rejected">Rejeté</option>
                    </select>
                  </td>
                  <td className="py-2 text-center px-4">
                    <MdEdit
                      size={20}
                      className="text-blue-600 cursor-pointer mx-2"
                      onClick={() => handleEditClick(reservation)}
                      aria-label="Modifier la réservation"
                    />
                    <MdDelete
                      size={20}
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(reservation._id)}
                      aria-label="Supprimer la réservation"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">Aucune réservation trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <EditReservationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        formData={formData}
        handleFormChange={handleFormChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        selectedReservation={selectedReservation}
      />

      {addModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <AddReservation onSuccess={() => setAddModalOpen(false)} />
            <button
              onClick={() => setAddModalOpen(false)}
              className="mt-4 bg-red-500 text-white rounded px-4 py-2"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;