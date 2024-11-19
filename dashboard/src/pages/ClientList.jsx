// import React, { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { Context } from "../main"; // Ensure context is properly set up
// import { Navigate } from "react-router-dom";
// import { MdDelete, MdEdit, MdInfo } from "react-icons/md"; // Import the Details icon
// import EditClientModal from "../components/EditClientModal";
// import ClientDetailsModal from "../components/ClientDetailsModal"; // Import the new modal
// import axios from "axios";

// const ClientList = () => {
//     const [clients, setClients] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedClient, setSelectedClient] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//     const [selectedClientId, setSelectedClientId] = useState(null);
//     const { isAuthenticated } = useContext(Context);

//     useEffect(() => {
//         const fetchClients = async () => {
//             try {
//                 const { data } = await axios.get('http://localhost:3030/api/v1/client/get-all-clients');
//                 setClients(data);
//             } catch (error) {
//                 console.error("Error fetching clients:", error);
//                 toast.error("Error loading clients.");
//             }
//         };
//         fetchClients();
//     }, []);

//     const handleDelete = async (clientId) => {
//         try {
//             const { data } = await axios.delete(
//                 `http://localhost:3030/api/v1/client/delete-client/${clientId}`,
//                 { withCredentials: true }
//             );
//             setClients((prevClients) => prevClients.filter((client) => client._id !== clientId));
//             toast.success(data?.message);
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     const openEditModal = (client) => {
//         setSelectedClient(client);
//         setIsModalOpen(true);
//     };

//     const openDetailsModal = (clientId) => {
//         setSelectedClientId(clientId);
//         setIsDetailsModalOpen(true);
//     };

//     const refreshClients = async () => {
//         const { data } = await axios.get('http://localhost:3030/api/v1/client/get-all-clients');
//         setClients(data);
//     };

//     if (!isAuthenticated) {
//         return <Navigate to={"/login"} />;
//     }

//     const filteredClients = clients.filter(client => {
//         const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
//         return fullName.includes(searchTerm.toLowerCase());
//     });

//     return (
//         <section className="page mx-20 bg-gray-200 p-10 h-screen rounded-l-3xl">
//             <h1 className="text-2xl font-bold text-center text-indigo-600 mb-8">Liste des Clients</h1>
//             <div className="mb-4 flex justify-center">
//                 <input
//                     type="text"
//                     placeholder="Rechercher par nom ou prénom"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-1/2 p-1 border border-gray-300 rounded-lg"
//                 />
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white shadow-md rounded-lg">
//                     <thead className="bg-gray-800 text-white">
//                         <tr>
//                             <th className="py-2 px-4">#</th>
//                             <th className="py-2 px-4">Nom</th>
//                             <th className="py-2 px-4">Prénom</th>
//                             <th className="py-2 px-4">Email</th>
//                             <th className="py-2 px-4">Téléphone</th>
//                             <th className="py-2 px-4">Réservations</th>
//                             <th className="py-2 px-4">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredClients.length > 0 ? (
//                             filteredClients.map((client, index) => (
//                                 <tr key={client._id} className="hover:bg-gray-300">
//                                     <td className="py-2 px-4 text-center">{index + 1}</td>
//                                     <td className="py-2 px-4 text-center">{client.lastName}</td>
//                                     <td className="py-2 px-4 text-center">{client.firstName}</td>
//                                     <td className="py-2 px-4 text-center">{client.email}</td>
//                                     <td className="py-2 px-4 text-center">{client.phone}</td>
//                                     <td className="py-2 px-4 text-center">
//                                         {client.reservationsCount || 0}
//                                     </td>
//                                     <td className="py-2 px-4 text-center flex justify-center">
//                                         <MdInfo 
//                                             size={25}
//                                             onClick={() => openDetailsModal(client._id)} // Open details modal
//                                             className="cursor-pointer text-green-500 mx-2"
//                                         />
//                                         <MdEdit 
//                                             size={25}
//                                             onClick={() => openEditModal(client)}
//                                             className="cursor-pointer text-blue-500 mx-2"
//                                         />
//                                         <MdDelete
//                                             size={25}
//                                             onClick={() => handleDelete(client._id)}
//                                             className="cursor-pointer text-red-500 mx-auto"
//                                         />
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="7" className="py-4 px-4 text-center">Aucun client trouvé!</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             <EditClientModal 
//                 isOpen={isModalOpen} 
//                 onRequestClose={() => setIsModalOpen(false)} 
//                 client={selectedClient} 
//                 refreshClients={refreshClients} 
//             />
//             <ClientDetailsModal 
//                 isOpen={isDetailsModalOpen} 
//                 onRequestClose={() => setIsDetailsModalOpen(false)} 
//                 clientId={selectedClientId} 
//             />
//         </section>
//     );
// };

// export default ClientList;
import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import ClientSpaceList from "../components/ClientSpaceList";
import ClientHallList from "../components/ClientHallList";
import ClientListHeader from "../components/ClientListHeader"; // Si vous avez un en-tête spécifique

const ClientList = () => {
  const { isAuthenticated } = useContext(Context);
  const [activeTab, setActiveTab] = useState("space");

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="flex flex-col h-full">
      <div className="flex justify-start mb-8">
        <ClientListHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="flex-grow">
        {activeTab === "space" ? <ClientSpaceList /> : <ClientHallList />}
      </div>
    </section>
  );
};

export default ClientList;