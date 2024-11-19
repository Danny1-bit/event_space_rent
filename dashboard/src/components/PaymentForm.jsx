import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { invoice } = location.state || {};

  if (!invoice) {
    return <div className="text-red-500">Erreur : Aucune facture trouvée.</div>;
  }

  const [paymentAmount, setPaymentAmount] = useState(''); // Champ vide par défaut
  const [paymentMethod, setPaymentMethod] = useState('Espèces');

  const handleUpdate = async () => {
    try {
      const newPaymentAmount = parseFloat(paymentAmount) || 0;
  
      // Préparez le nouvel objet de paiement
      const newPayment = {
        amount: newPaymentAmount,
        method: paymentMethod,
      };
  
      const updatedInvoice = {
        ...invoice,
        amountPaid: invoice.amountPaid + newPayment.amount,
        remainingAmount: invoice.remainingAmount - newPayment.amount,
        payments: [...(invoice.payments || []), newPayment],
        paymentStatus: (invoice.remainingAmount - newPayment.amount <= 0) ? 'Payé' : 'Partiellement payé',
      };
  
      // Vérifiez que tous les champs requis sont présents
      if (updatedInvoice.remainingAmount === undefined || updatedInvoice.amountPaid === undefined) {
        alert('Veuillez fournir tous les champs nécessaires.');
        return;
      }
  
      await axios.put(`http://localhost:3030/api/v1/invoices/${invoice._id}`, updatedInvoice);
      alert('Facture mise à jour avec succès !');
      navigate('/transactions');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la facture:', error.response.data);
      alert('Une erreur s\'est produite lors de la mise à jour de la facture. Détails: ' + error.response.data.message);
    }
  };
  
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Détails de la Facture</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Nom du client:</label>
        <div>{`${invoice.firstName} ${invoice.lastName}`}</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Coût total:</label>
        <div>{invoice.totalCost} €</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Montant déjà payé:</label>
        <div>{invoice.amountPaid} €</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Montant restant:</label>
        <div>{invoice.remainingAmount} €</div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Mode de paiement:</label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Espèces">Espèces</option>
          <option value="Chèques">Chèques</option>
          <option value="Carte bancaire">Carte bancaire</option>
          <option value="Mobile money">Mobile money</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Montant payé:</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="Montant à payer"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)} // Gardez la valeur en tant que chaîne
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleUpdate}
        >
          Enregistrer
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => navigate('/transactions')}
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;