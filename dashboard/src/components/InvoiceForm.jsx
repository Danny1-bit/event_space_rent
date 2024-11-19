// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Utiliser useNavigate à la place de useHistory
// import { ArrowLeftIcon } from '@heroicons/react/solid'; // Assurez-vous d'installer heroicons via npm
// import "./InvoiceForm.css";

// const InvoiceForm = () => {
//   const navigate = useNavigate(); // Utiliser useNavigate pour la navigation
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [eventType, setEventType] = useState("");
//   const [numberOfPeople, setNumberOfPeople] = useState("");
//   const [spaceRentalCost, setSpaceRentalCost] = useState("");
//   const [additionalServices, setAdditionalServices] = useState([]);
//   const [additionalServiceName, setAdditionalServiceName] = useState("");
//   const [additionalServiceCost, setAdditionalServiceCost] = useState("");
//   const [totalCost, setTotalCost] = useState(0);
//   const [amountPaid, setAmountPaid] = useState("");
//   const [remainingAmount, setRemainingAmount] = useState("");

//   // Calculer le nombre de jours de location
//   const calculateDaysCount = (start, end) => {
//     if (!start) return 0;
//     if (!end) return 1;
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const diffTime = endDate - startDate;
//     return Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
//   };

//   const handleAddService = () => {
//     if (additionalServiceName && additionalServiceCost > 0) {
//       setAdditionalServices([
//         ...additionalServices,
//         { name: additionalServiceName, cost: parseFloat(additionalServiceCost) },
//       ]);
//       setAdditionalServiceName("");
//       setAdditionalServiceCost("");
//     }
//   };

//   const calculateTotalCost = () => {
//     const daysCount = calculateDaysCount(startDate, endDate);
//     const rentalCost = parseFloat(spaceRentalCost) || 0;
//     const servicesCost = additionalServices.reduce((total, service) => total + service.cost, 0);
//     const totalCost = (daysCount * rentalCost) + servicesCost;

//     setTotalCost(totalCost.toFixed(2));
//     setRemainingAmount((totalCost - (parseFloat(amountPaid) || 0)).toFixed(2));
//   };

//   useEffect(() => {
//     calculateTotalCost();
//   }, [spaceRentalCost, additionalServices, startDate, endDate, amountPaid]);

//   const handleDateChange = (start, end) => {
//     if (end && new Date(end) < new Date(start)) {
//       alert("La date de fin doit être après la date de début.");
//       return;
//     }
//     setStartDate(start);
//     setEndDate(end);
//   };

//   const handleSubmit = async () => {
//     const invoiceData = {
//         firstName,
//         lastName,
//         startDate,
//         endDate,
//         daysCount: calculateDaysCount(startDate, endDate),
//         eventType,
//         numberOfPeople,
//         spaceRentalCost,
//         additionalServices,
//         totalCost,
//         amountPaid,
//     };

//     try {
//         const response = await fetch("http://localhost:3030/api/v1/invoices", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(invoiceData),
//         });

//         const responseData = await response.json();  // Parse the response to get details
//         if (response.ok) {
//             alert("Facture enregistrée avec succès!");
//         } else {
//             console.error("Erreur lors de la création de la facture:", responseData);
//             alert(`Erreur lors de l'enregistrement de la facture: ${responseData.message}`);
//         }
      
//     } catch (err) {
//         console.error("Error:", err);
//         alert("Erreur lors de la connexion au serveur.");
//     }
// };
//   return (
//     <div className="invoice-form-container">
//       <div className="invoice-form">
//       <button
//           onClick={() => navigate("/transactions")}
//           className="flex items-center mb-2 text-blue-500 hover:text-blue-700"
//         >
//           <ArrowLeftIcon className="h-4 w-4 mr-1" aria-hidden="true" />
//           Retour
//         </button>
//         <h2>Facture de Paiement</h2>

//         <div className="form-group">
//           <label>Prénom :</label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder="Entrer le prénom"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Nom :</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="Entrer le nom"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Date de début :</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => handleDateChange(e.target.value, endDate)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Date de fin (optionnel) :</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => handleDateChange(startDate, e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Nombre de jours :</label>
//           <input
//             type="number"
//             value={calculateDaysCount(startDate, endDate)}
//             readOnly
//           />
//         </div>

//         <div className="form-group">
//           <label>Type d'évènement :</label>
//           <input
//             type="text"
//             value={eventType}
//             onChange={(e) => setEventType(e.target.value)}
//             placeholder="Entrer le type d'évènement"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Nombre de personnes :</label>
//           <input
//             type="number"
//             value={numberOfPeople}
//             onChange={(e) => setNumberOfPeople(e.target.value)}
//             min="0"
//           />
//         </div>

//         <div className="form-group">
//           <label>Coût de location d'espace (par jour) :</label>
//           <input
//             type="number"
//             value={spaceRentalCost}
//             onChange={(e) => setSpaceRentalCost(e.target.value)}
//             min="0"
//             placeholder="Entrer le coût par jour"
//             required
//           />
//         </div>

//         <h3>Services supplémentaires</h3>
//         <div className="form-group">
//           <input
//             type="text"
//             placeholder="Nom du service"
//             value={additionalServiceName}
//             onChange={(e) => setAdditionalServiceName(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Coût du service"
//             value={additionalServiceCost}
//             onChange={(e) => setAdditionalServiceCost(e.target.value)}
//           />
//           <button
//             onClick={handleAddService}
//             className="inline-flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//           >
//             Ajouter
//           </button>
//         </div>

//         <div>
//           <h4>Services ajoutés :</h4>
//           {additionalServices.map((service, index) => (
//             <p key={index}>
//               {service.name}: {service.cost} €
//             </p>
//           ))}
//         </div>

//         <div className="form-group">
//           <label>Coût total :</label>
//           <input type="number" value={totalCost} readOnly />
//         </div>

//         <div className="form-group">
//           <label>Montant payé :</label>
//           <input
//             type="number"
//             value={amountPaid}
//             onChange={(e) => {
//               setAmountPaid(e.target.value);
//               setRemainingAmount((totalCost - (parseFloat(e.target.value) || 0)).toFixed(2));
//             }}
//             placeholder="Entrer le montant payé"
//           />
//         </div>

//         <div className="form-group">
//           <label>Montant restant :</label>
//           <input type="number" value={remainingAmount} readOnly />
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-700"
//         >
//           Enregistrer la facture
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InvoiceForm;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/solid';

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [creationDate, setCreationDate] = useState(new Date().toISOString().split('T')[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [locationType, setLocationType] = useState(""); // New state for location type
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [spaceRentalCost, setSpaceRentalCost] = useState("");
  const [additionalServices, setAdditionalServices] = useState([]);
  const [additionalServiceName, setAdditionalServiceName] = useState("");
  const [additionalServiceCost, setAdditionalServiceCost] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [amountPaid, setAmountPaid] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Non payé");

  useEffect(() => {
    const generateInvoiceNumber = () => {
      const number = `INV-${Math.floor(Math.random() * 1000000)}`;
      setInvoiceNumber(number);
    };
    generateInvoiceNumber();
  }, []);

  const calculateDaysCount = (start, end) => {
    if (!start) return 0;
    if (!end) return 1;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    return Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
  };

  const handleAddService = () => {
    if (additionalServiceName && additionalServiceCost > 0) {
      setAdditionalServices((prevServices) => [
        ...prevServices,
        { name: additionalServiceName, cost: parseFloat(additionalServiceCost) },
      ]);
      setAdditionalServiceName("");
      setAdditionalServiceCost("");
    }
  };

  const calculateTotalCost = () => {
    const daysCount = calculateDaysCount(startDate, endDate);
    const rentalCost = parseFloat(spaceRentalCost) || 0;
    const servicesCost = additionalServices.reduce((total, service) => total + service.cost, 0);
    const totalCost = (daysCount * rentalCost) + servicesCost;

    setTotalCost(totalCost.toFixed(2));
  };

  useEffect(() => {
    calculateTotalCost();
  }, [spaceRentalCost, additionalServices, startDate, endDate]);

  useEffect(() => {
    const valuePaid = parseFloat(amountPaid) || 0;
    const total = parseFloat(totalCost) || 0;
    setRemainingAmount((total - valuePaid).toFixed(2));
    setPaymentStatus(calculatePaymentStatus(valuePaid, total));
  }, [amountPaid, totalCost]);

  const calculatePaymentStatus = (amountPaid, totalCost) => {
    if (amountPaid >= totalCost) {
      return "Payé";
    } else if (amountPaid > 0) {
      return "Partiellement payé";
    } else {
      return "Non payé";
    }
  };

  const handleDateChange = (start, end) => {
    if (end && new Date(end) < new Date(start)) {
      alert("La date de fin doit être après la date de début.");
      return;
    }
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = async () => {
    if (!paymentMethod) {
      alert("Veuillez sélectionner une méthode de paiement.");
      return;
    }

    const invoiceData = {
      invoiceNumber,
      creationDate,
      firstName,
      lastName,
      location: locationType, // Include the location type
      startDate,
      endDate,
      daysCount: calculateDaysCount(startDate, endDate),
      eventType,
      numberOfPeople,
      spaceRentalCost: parseFloat(spaceRentalCost),
      additionalServices,
      totalCost: parseFloat(totalCost),
      amountPaid: parseFloat(amountPaid),
      remainingAmount: parseFloat(remainingAmount),
      paymentMethod,
      paymentStatus,
    };

    try {
      const response = await fetch("http://localhost:3030/api/v1/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      const responseData = await response.json();
      if (response.ok) {
        alert("Facture enregistrée avec succès!");
      } else {
        console.error("Erreur lors de la création de la facture:", responseData);
        alert(`Erreur lors de l'enregistrement de la facture: ${responseData.message}`);
      }

    } catch (err) {
      console.error("Error:", err);
      alert("Erreur lors de la connexion au serveur.");
    }
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <button
          onClick={() => navigate("/transactions")}
          className="flex items-center mb-4 text-blue-500 hover:text-blue-700"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Retour
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Facture de Paiement</h2>

        <div className="mb-4">
          <label className="block mb-1">Numéro de Facture :</label>
          <input type="text" value={invoiceNumber} readOnly className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Date de Création :</label>
          <input type="date" value={creationDate} readOnly className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Prénom :</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Entrer le prénom"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Nom :</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Entrer le nom"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* New Location Type Dropdown */}
        <div className="mb-4">
          <label className="block mb-1">Location :</label>
          <select
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Sélectionnez un type de location</option>
            <option value="Espace">Espace</option>
            <option value="Salle">Salle</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Date de début :</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e.target.value, endDate)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Date de fin (optionnel) :</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(startDate, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Nombre de jours :</label>
          <input
            type="number"
            value={calculateDaysCount(startDate, endDate)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Type d'évènement :</label>
          <input
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            placeholder="Entrer le type d'évènement"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Nombre de personnes :</label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            min="0"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Coût de location d'espace (par jour) :</label>
          <input
            type="number"
            value={spaceRentalCost}
            onChange={(e) => setSpaceRentalCost(e.target.value)}
            min="0"
            placeholder="Entrer le coût par jour"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Méthode de Paiement :</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Sélectionnez une méthode</option>
            <option value="Espèces">Espèces</option>
            <option value="Chèques">Chèques</option>
            <option value="Carte bancaire">Carte bancaire</option>
            <option value="Mobile Money">Mobile Money</option>
          </select>
        </div>

        <h3 className="text-lg font-semibold mt-4">Services supplémentaires</h3>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Nom du service"
            value={additionalServiceName}
            onChange={(e) => setAdditionalServiceName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="number"
            placeholder="Coût du service"
            value={additionalServiceCost}
            onChange={(e) => setAdditionalServiceCost(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={handleAddService}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold">Services ajoutés :</h4>
          {additionalServices.map((service, index) => (
            <p key={index}>
              {service.name}: {service.cost} €
            </p>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Coût total :</label>
          <input type="number" value={totalCost} readOnly className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Montant payé :</label>
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            placeholder="Entrer le montant payé"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Montant restant :</label>
          <input type="number" value={remainingAmount} readOnly className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Statut de Paiement :</label>
          <input type="text" value={paymentStatus} readOnly className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full p-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Enregistrer la facture
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;