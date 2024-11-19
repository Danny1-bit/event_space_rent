import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddNewAdmin from "./components/AddNewAdmin";
import AddNewHall from "./components/AddNewHall";
import AddNewSpace from "./components/AddNewSpace"; // Vérifiez ce chemin
import EditSpaceModal from "./components/EditSpaceModal";
import Messages from "./pages/Messages";
import SpacesList from "./pages/SpacesList";
import HallList from './components/HallList';
import ClientList from "./pages/ClientList";
import Transactions from "./pages/Transactions"; // Import Transactions
import ReservationManagement from "./pages/ReservationManagement";
import InvoiceForm from './components/InvoiceForm';
import PaymentForm from './components/PaymentForm';
import InvoiceReceipt from './components/InvoiceReceipt';
import Services from './components/Services'; // Importer AdminServices
import EquipmentsPage from './components/Equipments';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className="app-container flex">
      <Sidebar />
      <div className="content flex-1 p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-new/admin" element={<AddNewAdmin />} />
          <Route path="/add-new/hall" element={<AddNewHall />} />
          <Route path="/add-new/space" element={<AddNewSpace />} />
          <Route path="/edit-space/:id" element={<EditSpaceModal />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/spaces-list" element={<SpacesList />} />
          <Route path="/hall-list" element={<HallList />} />
          <Route path="/client-list" element={<ClientList />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reservation-management" element={<ReservationManagement />} />
          <Route path="/invoice-form" element={<InvoiceForm />} />
          <Route path="/payment-form" element={<PaymentForm />} />
          <Route path="/invoice-receipt" element={<InvoiceReceipt />} />
          <Route path="/admin-services/:spaceId" element={<Services />} /> {/* Nouvelle route */}
          <Route path="/admin-equipments/:spaceId" element={<EquipmentsPage />} /> {/* Nouvelle route pour Equipments */}
        </Routes>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
