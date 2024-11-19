import mongoose from 'mongoose';

const hallReservationSchema = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Hall',
  },
  userId: { // Ajoutez ce champ pour lier la réservation à l'utilisateur
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: '{VALUE} n\'est pas un email valide!'
    }
  },
  phone: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'La date de fin doit être après la date de début!'
    }
  },
  guests: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  daysCount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('HallReservation', hallReservationSchema);


// const hallReservationSchema = new mongoose.Schema({
//   hallId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Hall', // Assurez-vous que le modèle Hall est défini
//     required: true,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     validate: {
//     validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v), // Validation regex pour l'email
//     message: (props) => `${props.value} n'est pas un email valide!`
//     }
//   },
//   phone: {
//         type: String,
//         required: true,
//       },
//   eventType: {
//     type: String,
//     required: true,
//   },
//   startDate: {
//     type: Date,
//     required: true,
//   },
//   endDate: {
//     type: Date,
//     required: true,
//     validate: {
//       validator: function(value) {
//         return value > this.startDate; // Validation pour que endDate soit après startDate
//       },
//       message: 'La date de fin doit être après la date de début!',
//     },
//   },
//   guests: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   notes: {
//     type: String,
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Accepted', 'Rejected'],
//     default: 'Pending',
//   },
//   daysCount: {
//     type: Number,
//     required: true,
//   },
// }, {
//   timestamps: true, // Ajoute createdAt et updatedAt
// });

// // Middleware pour calculer daysCount avant de sauvegarder
// hallReservationSchema.pre('save', function(next) {
//   if (this.startDate && this.endDate) {
//     const diffTime = Math.abs(this.endDate - this.startDate);
//     this.daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Calcul des jours
//   }
//   next();
// });

// export default mongoose.model('HallReservation', hallReservationSchema);