import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3030/api/v1/message",
        {
          firstName,
          lastName,
          email,
          phone,
          message,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      // Réinitialisation des champs
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  return (
    <div className="max-w-[1540px] mx-auto py-12 mb-2 px-4 bg-blue-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Envoyez-nous un message
      </h2>
      <form className="space-y-6" onSubmit={handleMessage}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Prénom"
            className="w-full md:w-1/2 p-3 text-xl border-blue-400 bg-white rounded-md outline-none shadow-lg"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nom"
            className="w-full md:w-1/2 p-3 text-xl border-blue-400 bg-white rounded-md outline-none shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full md:w-1/2 p-3 text-xl border-blue-400 bg-white rounded-md outline-none shadow-lg"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Téléphone"
            className="w-full md:w-1/2 p-3 text-xl border-blue-400 bg-white rounded-md outline-none shadow-lg"
          />
        </div>
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message..."
            rows="4"
            className="w-full p-3 text-xl border-blue-400 bg-white rounded-md outline-none shadow-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Envoyer le message
        </button>
      </form>
    </div>
  );
};

export default MessageForm;