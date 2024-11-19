import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ErrorBoundary component to catch rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Une erreur est survenue. Veuillez réessayer plus tard.</h1>;
    }

    return this.props.children; 
  }
}

const InvoiceReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { invoice } = location.state || {};

  if (!invoice) {
    return <div className="text-red-500">Aucune facture trouvée.</div>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Facture", 14, 16);
    
    // Add customer information
    doc.setFontSize(12);
    doc.text(`Nom: ${invoice.firstName || 'N/A'} ${invoice.lastName || 'N/A'}`, 14, 30);
    doc.text(`Numéro de Facture: ${invoice.invoiceNumber || 'N/A'}`, 14, 36);
    doc.text(`Date de Création: ${new Date(invoice.creationDate).toLocaleDateString() || 'N/A'}`, 14, 42);
    
    // Add invoice details
    doc.text(`Coût Total: ${invoice.totalCost !== undefined ? invoice.totalCost : 0} €`, 14, 50);
    doc.text(`Montant Payé: ${invoice.amountPaid !== undefined ? invoice.amountPaid : 0} €`, 14, 56);
    doc.text(`Montant Restant: ${invoice.remainingAmount !== undefined ? invoice.remainingAmount : 0} €`, 14, 62);
    doc.text(`Statut de Paiement: ${invoice.paymentStatus || 'N/A'}`, 14, 68);
    
    // Add event details
    doc.text(`Type d'Événement: ${invoice.eventType || 'N/A'}`, 14, 76);
    doc.text(`Nombre de Personnes: ${invoice.numberOfPeople || 0}`, 14, 82);
    doc.text(`Date de Début: ${new Date(invoice.startDate).toLocaleDateString() || 'N/A'}`, 14, 88);
    doc.text(`Date de Fin: ${new Date(invoice.endDate).toLocaleDateString() || 'N/A'}`, 14, 94);
    
    // Add additional services
    doc.text("Services Supplémentaires:", 14, 102);
    invoice.additionalServices.forEach((service, index) => {
      const serviceText = `${service.name || 'N/A'}: ${service.cost || 0} €`;
      doc.text(serviceText, 14, 108 + (index * 6));
    });

    // Prepare payment data for table
    const payments = invoice.payments.map(payment => [
      `${payment.amount || 0} €`,
      payment.method || 'N/A',
      new Date(payment.date).toLocaleDateString() || 'N/A'
    ]);

    // Add payment history table
    if (payments.length > 0) {
      autoTable(doc, {
        head: [['Montant', 'Mode de Paiement', 'Date']],
        body: payments,
        startY: doc.autoTable.previous.finalY + 10 || 120, // Fallback if previous finalY is invalid
      });
    } else {
      const finalY = doc.autoTable.previous.finalY || 120; // Default to 120 if previous finalY is undefined
      doc.text("Aucun paiement effectué.", 14, finalY + 10);
    }
    
    doc.save(`facture_${invoice.invoiceNumber || 'unknown'}.pdf`);
  };

  const exportToCSV = () => {
    const csvRows = [
      ['Nom', 'Numéro de Facture', 'Date de Création', 'Coût Total', 'Montant Payé', 'Montant Restant', 'Statut de Paiement', 'Type d\'Événement', 'Nombre de Personnes', 'Date de Début', 'Date de Fin', 'Services'],
      [
        `${invoice.firstName || 'N/A'} ${invoice.lastName || 'N/A'}`,
        invoice.invoiceNumber || 'N/A',
        new Date(invoice.creationDate).toLocaleDateString() || 'N/A',
        invoice.totalCost !== undefined ? invoice.totalCost : 0,
        invoice.amountPaid !== undefined ? invoice.amountPaid : 0,
        invoice.remainingAmount !== undefined ? invoice.remainingAmount : 0,
        invoice.paymentStatus || 'N/A',
        invoice.eventType || 'N/A',
        invoice.numberOfPeople || 0,
        new Date(invoice.startDate).toLocaleDateString() || 'N/A',
        new Date(invoice.endDate).toLocaleDateString() || 'N/A',
        invoice.additionalServices.map(service => `${service.name || 'N/A'}: ${service.cost || 0} €`).join('; ')
      ]
    ];
    
    const csvString = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `facture_${invoice.invoiceNumber || 'unknown'}.csv`);
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Facture</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Informations sur le Client</h3>
        <p><strong>Nom:</strong> {invoice.firstName} {invoice.lastName}</p>
        <p><strong>Numéro de Facture:</strong> {invoice.invoiceNumber}</p>
        <p><strong>Date de Création:</strong> {new Date(invoice.creationDate).toLocaleDateString()}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Détails de la Facture</h3>
        <p><strong>Coût Total:</strong> {invoice.totalCost} €</p>
        <p><strong>Montant Payé:</strong> {invoice.amountPaid} €</p>
        <p><strong>Montant Restant:</strong> {invoice.remainingAmount} €</p>
        <p><strong>Statut de Paiement:</strong> {invoice.paymentStatus}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Détails de l'Événement</h3>
        <p><strong>Type d'Événement:</strong> {invoice.eventType}</p>
        <p><strong>Nombre de Personnes:</strong> {invoice.numberOfPeople}</p>
        <p><strong>Date de Début:</strong> {new Date(invoice.startDate).toLocaleDateString()}</p>
        <p><strong>Date de Fin:</strong> {new Date(invoice.endDate).toLocaleDateString()}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Services Supplémentaires</h3>
        <ul>
          {invoice.additionalServices.map((service, index) => (
            <li key={index}>
              {service.name}: {service.cost} €
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Historique des Paiements</h3>
        <table id="invoice-table" className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode de Paiement</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoice.payments.map((payment, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap">{payment.amount} €</td>
                <td className="px-4 py-2 whitespace-nowrap">{payment.method}</td>
                <td className="px-4 py-2 whitespace-nowrap">{new Date(payment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate('/transactions')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Retour
        </button>
        <div className="flex space-x-2">
          <button
            onClick={generatePDF}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Générer PDF
          </button>
          <button
            onClick={exportToCSV}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Exporter CSV
          </button>
          <button
            onClick={handlePrint}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Imprimer
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the component wrapped in the ErrorBoundary
const InvoiceReceiptWithErrorBoundary = () => (
  <ErrorBoundary>
    <InvoiceReceipt />
  </ErrorBoundary>
);

export default InvoiceReceiptWithErrorBoundary;