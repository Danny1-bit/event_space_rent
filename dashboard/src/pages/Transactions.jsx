import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, ReceiptRefundIcon, TrashIcon } from '@heroicons/react/solid';

function Transactions() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('http://localhost:3030/api/v1/invoices');
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, []);

  const goToInvoiceForm = () => {
    navigate('/invoice-form');
  };

  const handleViewInvoice = (invoice) => {
    navigate('/payment-form', { state: { invoice } });
  };

  const handleDeleteInvoice = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      try {
        await fetch(`http://localhost:3030/api/v1/invoices/${id}`, {
          method: 'DELETE',
        });
        setInvoices(invoices.filter(invoice => invoice._id !== id));
        alert('Facture supprimée avec succès.');
      } catch (error) {
        console.error('Erreur lors de la suppression de la facture:', error);
        alert('Une erreur s\'est produite lors de la suppression de la facture.');
      }
    }
  };

  const handleViewReceipt = (invoice) => {
    navigate('/invoice-receipt', { state: { invoice } });
  };

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(invoice => {
    const fullName = `${invoice.firstName || ''} ${invoice.lastName || ''}`.toLowerCase();
    const location = (invoice.location || '').toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || location.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button
          onClick={goToInvoiceForm}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvelle Facture
        </button>
      </div>

      {/* Dynamic Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 w-full max-w-xs transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro de Facture</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de Création</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant Payé</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant Restant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut de Paiement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(invoice.creationDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.firstName} {invoice.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.totalCost} €</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.amountPaid} €</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.remainingAmount} €</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.paymentStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <button
                    onClick={() => handleViewReceipt(invoice)}
                    className="inline-flex items-center justify-center p-2 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    Détails de la Facture
                  </button>
                  <button
                    onClick={() => handleViewInvoice(invoice)}
                    className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    <ReceiptRefundIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteInvoice(invoice._id)}
                    className="inline-flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;