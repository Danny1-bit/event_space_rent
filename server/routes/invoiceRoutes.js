// import express from 'express';
// import { createInvoice, getInvoices, updateInvoice, deleteInvoice } from '../controller/invoiceController.js';

// const router = express.Router();

// // Route pour créer une nouvelle facture
// router.post('/', createInvoice);

// // Route pour obtenir toutes les factures
// router.get('/', getInvoices);

// // Route pour mettre à jour une facture
// router.put('/:id', updateInvoice);

// router.delete('/:id', deleteInvoice); 

// export default router;
import express from 'express';
import { createInvoice, getInvoices, updateInvoice, deleteInvoice } from '../controller/invoiceController.js';

const router = express.Router();

// Route pour créer une nouvelle facture
router.post('/', createInvoice);

// Route pour obtenir toutes les factures
router.get('/', getInvoices);

// Route pour mettre à jour une facture
router.put('/:id', updateInvoice);

// Route pour supprimer une facture
router.delete('/:id', deleteInvoice); 

export default router;