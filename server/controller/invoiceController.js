// import Invoice from '../model/invoiceModel.js';

// // Créer une nouvelle facture
// const createInvoice = async (req, res) => {
//   try {
//     const invoiceData = req.body;

//     // Vérification des données requises
//     if (!invoiceData.firstName || !invoiceData.lastName || !invoiceData.startDate || !invoiceData.spaceRentalCost || !invoiceData.paymentMethod) {
//       return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
//     }

//     // Déterminer le statut de paiement
//     let paymentStatus = 'Non payé';
//     if (invoiceData.amountPaid >= invoiceData.totalCost) {
//       paymentStatus = 'Payé';
//     } else if (invoiceData.amountPaid > 0) {
//       paymentStatus = 'Partiellement payé';
//     }

//     // Créer la facture avec le statut de paiement
//     const newInvoice = await Invoice.create({ ...invoiceData, paymentStatus });
//     res.status(201).json({ message: 'Facture créée avec succès!', invoice: newInvoice });
//   } catch (error) {
//     console.error("Erreur lors de la création de la facture:", error);
//     res.status(500).json({ message: 'Erreur lors de la création de la facture', error: error.message });
//   }
// };

// // Récupérer toutes les factures
// const getInvoices = async (req, res) => {
//   try {
//     const invoices = await Invoice.find();
//     res.status(200).json(invoices);
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de la récupération des factures' });
//   }
// };

// export const updateInvoice = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updatedInvoice = req.body;
  
//       // Vérifiez que les champs essentiels sont présents
//       if (updatedInvoice.remainingAmount === undefined || updatedInvoice.amountPaid === undefined) {
//         return res.status(400).json({ message: 'Veuillez fournir tous les champs nécessaires.' });
//       }
  
//       const invoice = await Invoice.findByIdAndUpdate(id, updatedInvoice, { new: true });
//       if (!invoice) {
//         return res.status(404).json({ message: 'Facture non trouvée' });
//       }
  
//       res.status(200).json(invoice);
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour de la facture:', error);
//       res.status(500).json({ message: 'Erreur lors de la mise à jour de la facture' });
//     }
//   };
    
//   export const deleteInvoice = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const invoice = await Invoice.findByIdAndDelete(id);
      
//       if (!invoice) {
//         return res.status(404).json({ message: 'Facture non trouvée' });
//       }
      
//       res.status(200).json({ message: 'Facture supprimée avec succès' });
//     } catch (error) {
//       console.error('Erreur lors de la suppression de la facture:', error);
//       res.status(500).json({ message: 'Erreur lors de la suppression de la facture' });
//     }
//   };
// export { createInvoice, getInvoices };
import Invoice from '../model/invoiceModel.js';

// Créer une nouvelle facture
const createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;

    // Vérification des données requises
    if (!invoiceData.firstName || !invoiceData.lastName || !invoiceData.location || !invoiceData.startDate || !invoiceData.totalCost || !invoiceData.paymentMethod) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
    }

    // Déterminer le statut de paiement
    let paymentStatus = 'Non payé';
    if (invoiceData.amountPaid >= invoiceData.totalCost) {
      paymentStatus = 'Payé';
    } else if (invoiceData.amountPaid > 0) {
      paymentStatus = 'Partiellement payé';
    }

    // Créer la facture avec le statut de paiement
    const newInvoice = await Invoice.create({ ...invoiceData, paymentStatus });
    res.status(201).json({ message: 'Facture créée avec succès!', invoice: newInvoice });
  } catch (error) {
    console.error("Erreur lors de la création de la facture:", error);
    res.status(500).json({ message: 'Erreur lors de la création de la facture', error: error.message });
  }
};

// Récupérer toutes les factures
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des factures' });
  }
};

// Mettre à jour une facture
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInvoice = req.body;

    // Vérifiez que les champs essentiels sont présents
    if (updatedInvoice.remainingAmount === undefined || updatedInvoice.amountPaid === undefined) {
      return res.status(400).json({ message: 'Veuillez fournir tous les champs nécessaires.' });
    }

    const invoice = await Invoice.findByIdAndUpdate(id, updatedInvoice, { new: true });
    if (!invoice) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la facture:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la facture' });
  }
};

// Supprimer une facture
export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByIdAndDelete(id);
    
    if (!invoice) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }
    
    res.status(200).json({ message: 'Facture supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la facture:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la facture' });
  }
};

export { createInvoice, getInvoices };