// import mongoose from 'mongoose';

// const invoiceSchema = new mongoose.Schema({
//     invoiceNumber: { type: String, required: true, unique: true }, // Nouveau champ
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     daysCount: { type: Number, required: true },
//     eventType: { type: String, required: true },
//     numberOfPeople: { type: Number, required: true },
//     spaceRentalCost: { type: Number, required: true },
//     additionalServices: [
//         {
//             name: { type: String, required: true },
//             cost: { type: Number, required: true },
//         },
//     ],
//     totalCost: { type: Number, required: true },
//     amountPaid: { type: Number, required: true },
//     remainingAmount: { type: Number, required: true }, // Nouveau champ
// }, { timestamps: true });

// const Invoice = mongoose.model('Invoice', invoiceSchema);

// export default Invoice;
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    method: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    creationDate: { type: Date, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: String, required: true }, // Nouveau champ pour la location
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    daysCount: { type: Number, required: true },
    eventType: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    spaceRentalCost: { type: Number, required: true },
    additionalServices: [
        {
            name: { type: String, required: true },
            cost: { type: Number, required: true },
        },
    ],
    totalCost: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    remainingAmount: { type: Number, required: true },
    payments: [paymentSchema], // Nouveau champ pour stocker les paiements
    paymentStatus: { type: String, enum: ['Non payé', 'Partiellement payé', 'Payé'], default: 'Non payé' }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;