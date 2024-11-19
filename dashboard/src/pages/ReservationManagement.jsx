import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import axios from "axios";
import EditReservation from "../components/EditReservation";
import ReservationModal from "../components/ReservationModal";

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [formData, setFormData] = useState({
    hallId: "",
    firstName: "",
    lastName: "",
    eventType: "",
    startDate: new Date(),
    endDate: null,
    guests: 1,
    notes: "",
    status: "Pending",
  });

  const [searchHall, setSearchHall] = useState("");
  const [searchClientName, setSearchClientName] = useState(""); 
  const [searchEventType, setSearchEventType] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3030/api/v1/hall-reservations");
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
        const { data } = await axios.delete(`http://localhost:3030/api/v1/hall-reservations/${reservationId}`);
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
      hallId: reservation.hallId,
      firstName: reservation.firstName,
      lastName: reservation.lastName,
      eventType: reservation.eventType,
      startDate: new Date(reservation.startDate),
      endDate: new Date(reservation.endDate),
      guests: reservation.guests,
      notes: reservation.notes,
      status: reservation.status,
    });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dateType, date) => {
    if (dateType === "start") {
      setFormData((prev) => ({ ...prev, startDate: date }));
    } else {
      setFormData((prev) => ({ ...prev, endDate: date }));
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await axios.put(`http://localhost:3030/api/v1/hall-reservations/${reservationId}/status`, { status: newStatus });
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation._id === reservationId ? { ...reservation, status: newStatus } : reservation
        )
      );
      toast.success("Statut mis à jour avec succès!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la mise à jour du statut");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.hallId || !formData.firstName || !formData.lastName || !formData.eventType || !formData.guests) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const updatedData = {
      ...formData,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
    };

    try {
      const { data } = await axios.put(`http://localhost:3030/api/v1/hall-reservations/${selectedReservation._id}`, updatedData);
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
    const hallMatches = reservation.hallId?.name.toLowerCase().includes(searchHall.toLowerCase());
    const clientNameMatches = `${reservation.firstName} ${reservation.lastName}`.toLowerCase().includes(searchClientName.toLowerCase());
    const eventTypeMatches = reservation.eventType.toLowerCase().includes(searchEventType.toLowerCase());
    const startDateMatches = searchStartDate ? new Date(reservation.startDate) >= new Date(searchStartDate) : true;
    const endDateMatches = searchEndDate ? new Date(reservation.endDate) <= new Date(searchEndDate) : true;

    return hallMatches && clientNameMatches && eventTypeMatches && startDateMatches && endDateMatches;
  });

  return (
    <div className="flex flex-col gap-5 mx-4 md:mx-20 bg-gray-100 p-4 md:p-10 h-screen rounded-lg">
      <h4 className="text-xl md:text-2xl text-center cursor-pointer font-semibold mb-5 text-gray-800">
        Gestion des Réservations de Salles
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
          placeholder="Nom de la salle"
          value={searchHall}
          onChange={(e) => setSearchHall(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Nom du client (Prénom Nom)"
          value={searchClientName}
          onChange={(e) => setSearchClientName(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Type d'événement"
          value={searchEventType}
          onChange={(e) => setSearchEventType(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="date"
          placeholder="Date de début"
          value={searchStartDate}
          onChange={(e) => setSearchStartDate(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="date"
          placeholder="Date de fin"
          value={searchEndDate}
          onChange={(e) => setSearchEndDate(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Salle</th>
              <th className="py-2 px-4">Client</th>
              <th className="py-2 px-4">Type d'événement</th>
              <th className="py-2 px-4">Dates</th>
              <th className="py-2 px-4">Invités</th>
              <th className="py-2 px-4">Notes</th>
              <th className="py-2 px-4">Statut</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => (
                <tr key={reservation._id} className="hover:bg-gray-300">
                  <td className="py-2 text-center px-4">{reservation.hallId?.name}</td>
                  <td className="py-2 text-center px-4">{`${reservation.firstName} ${reservation.lastName}`}</td>
                  <td className="py-2 text-center px-4">{reservation.eventType}</td>
                  <td className="py-2 text-center px-4">
                    {new Date(reservation.startDate).toLocaleDateString()} - 
                    {new Date(reservation.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 text-center px-4">{reservation.guests}</td>
                  <td className="py-2 text-center px-4">{reservation.notes}</td>
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
                <td colSpan="8" className="py-4 text-center">
                  Aucune réservation trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {addModalOpen && (
        <ReservationModal onClose={() => setAddModalOpen(false)} />
      )}
      {modalOpen && (
        <EditReservation
          reservation={selectedReservation}
          formData={formData}
          onClose={() => setModalOpen(false)}
          onChange={handleFormChange}
          onDateChange={handleDateChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ReservationManagement;