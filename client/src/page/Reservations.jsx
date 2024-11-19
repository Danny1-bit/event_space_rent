import React, { useEffect, useState } from 'react';
import SpaceReservationTable from '../components/SpaceReservationTable';
import HallReservationTable from '../components/HallReservationTable';
import axios from 'axios';

const Reservations = () => {
    const [reservations, setReservations] = useState({ halls: [], spaces: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                console.log('Fetching reservations...');
                const { data } = await axios.get('http://localhost:3030/api/v1/reservations/client-reservations', {
                    withCredentials: true,
                });
                setReservations({
                    halls: data.hallReservations || [],
                    spaces: data.spaceReservations || [],
                });
            } catch (err) {
                setError('Error fetching reservations: ' + (err.response ? err.response.data.message : err.message));
                console.error('Error fetching reservations:', err);
            } finally {
                setLoading(false);
            }
        };
  
        fetchReservations();
    }, []);
  
    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg">Chargement des réservations...</p>
        </div>
    );
    if (error) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-red-500">{error}</p>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-2xl font-semibold mb-6">Mes Réservations</h1>
                <HallReservationTable title="Réservations de Salles" reservations={reservations.halls} />
                <SpaceReservationTable title="Réservations d'Espaces" reservations={reservations.spaces} />
            </div>
            <footer className="bg-transparent text-gray-800 py-4 mt-auto"> {/* Changement de bg-gray-800 à bg-transparent */}
                <div className="container mx-auto text-center">
                    {/* La ligne de droits d'auteur a été supprimée */}
                </div>
            </footer>
        </div>
    );
};

export default Reservations;