// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { TiHome } from "react-icons/ti";
// import { MdAddBusiness, MdAdminPanelSettings } from "react-icons/md";
// import { AiFillMessage } from "react-icons/ai";
// import { RiLogoutBoxFill } from "react-icons/ri";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FaDoorOpen, FaUsers, FaMoneyCheckAlt } from "react-icons/fa"; // FaMoneyCheckAlt pour Transactions
// import { FaCalendarAlt } from 'react-icons/fa'; // Adjust the path as necessary

// const Sidebar = () => {
//   const [show, setShow] = useState(false);
//   const navigate = useNavigate();

//   const gotoHome = () => {
//     navigate("/");
//     setShow(false);
//   };

//   const gotoAddAdmin = () => {
//     navigate("/add-new/admin");
//     setShow(false);
//   };

//   const gotoSpacesList = () => {
//     navigate("/spaces-list");
//     setShow(false);
//   };

//   const gotoMessages = () => {
//     navigate("/messages");
//     setShow(false);
//   };

//   const gotoHallList = () => {
//     navigate("/hall-list");
//     setShow(false);
//   };

//   const gotoClientList = () => {
//     navigate("/client-list");
//     setShow(false);
//   };

//   const gotoTransactions = () => {
//     navigate("/transactions");
//     setShow(false);
//   };
//   const gotoReservationManagement = () => {
//     navigate("/reservation-management"); // Ajout de la fonction pour la gestion des réservations
//     setShow(false);
//   };

//   return (
//     <>
//       <div
//         className={`fixed top-1/2 left-[10px] rounded-t-[5px] rounded-b-[7px] h-[350px] w-[60px] lg:w-[80px] 
//           bg-gray-900 p-4 transition-all duration-300 ease-in-out transform ${
//             show ? "translate-x-0" : "-translate-x-full"
//           } lg:translate-x-0 -translate-y-1/2 flex flex-col items-center justify-between z-50 overflow-y-auto`}
//       >
//         <div className="flex flex-col items-center w-full text-white space-y-6">
//           <TiHome
//             className="text-3xl lg:text-4xl cursor-pointer text-blue-400 hover:text-blue-600"
//             onClick={gotoHome}
//           />
//           <MdAdminPanelSettings
//             className="text-3xl lg:text-4xl cursor-pointer text-purple-400 hover:text-purple-600"
//             onClick={gotoAddAdmin}
//           />
//           <MdAddBusiness
//             className="text-3xl lg:text-4xl cursor-pointer text-green-400 hover:text-green-600"
//             onClick={gotoSpacesList}
//           />
//           <AiFillMessage
//             className="text-3xl lg:text-4xl cursor-pointer text-pink-400 hover:text-pink-600"
//             onClick={gotoMessages}
//           />
//           <FaDoorOpen
//             className="text-3xl lg:text-4xl cursor-pointer text-yellow-400 hover:text-yellow-600"
//             onClick={gotoHallList}
//           />
//           <FaUsers
//             className="text-3xl lg:text-4xl cursor-pointer text-cyan-400 hover:text-cyan-600"
//             onClick={gotoClientList}
//           />
//           <FaMoneyCheckAlt
//             className="text-3xl lg:text-4xl cursor-pointer text-orange-400 hover:text-orange-600"
//             onClick={gotoTransactions}
//           />
//            <FaCalendarAlt // Nouveau bouton pour la gestion des réservations
//             className="text-3xl lg:text-4xl cursor-pointer text-teal-400 hover:text-teal-600"
//             onClick={gotoReservationManagement}
//           />
//           <RiLogoutBoxFill
//             className="text-3xl lg:text-4xl cursor-pointer text-red-400 hover:text-red-600"
//           />
//         </div>
//       </div>
//       <div className="fixed top-0 left-0 p-4 z-50">
//         <GiHamburgerMenu
//           className="cursor-pointer text-gray-900 text-3xl lg:text-4xl"
//           onClick={() => setShow(!show)}
//         />
//       </div>
//     </>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { MdAddBusiness, MdAdminPanelSettings } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaDoorOpen, FaUsers, FaMoneyCheckAlt } from "react-icons/fa"; 
import { FaCalendarAlt } from 'react-icons/fa'; 

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/");
    setShow(false);
  };

  const gotoAddAdmin = () => {
    navigate("/add-new/admin");
    setShow(false);
  };

  const gotoSpacesList = () => {
    navigate("/spaces-list");
    setShow(false);
  };

  const gotoMessages = () => {
    navigate("/messages");
    setShow(false);
  };

  const gotoHallList = () => {
    navigate("/hall-list");
    setShow(false);
  };

  const gotoClientList = () => {
    navigate("/client-list");
    setShow(false);
  };

  const gotoTransactions = () => {
    navigate("/transactions");
    setShow(false);
  };

  const gotoReservationManagement = () => {
    navigate("/reservation-management");
    setShow(false);
  };

  const gotoAdminServices = (spaceId) => {
    navigate(`/admin-services/${spaceId}`);
    setShow(false);
  };

  const gotoAdminEquipments = (spaceId) => {
    navigate(`/admin-equipments/${spaceId}`);
    setShow(false);
  };

  return (
    <>
      <div
        className={`fixed top-1/2 left-[10px] rounded-t-[5px] rounded-b-[7px] h-[350px] w-[60px] lg:w-[80px] 
          bg-gray-900 p-4 transition-all duration-300 ease-in-out transform ${
            show ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 -translate-y-1/2 flex flex-col items-center justify-between z-50 overflow-y-auto`}
      >
        <div className="flex flex-col items-center w-full text-white space-y-6">
          <TiHome className="text-3xl lg:text-4xl cursor-pointer text-blue-400 hover:text-blue-600" onClick={gotoHome} />
          <MdAdminPanelSettings className="text-3xl lg:text-4xl cursor-pointer text-purple-400 hover:text-purple-600" onClick={gotoAddAdmin} />
          <MdAddBusiness className="text-3xl lg:text-4xl cursor-pointer text-green-400 hover:text-green-600" onClick={gotoSpacesList} />
          <AiFillMessage className="text-3xl lg:text-4xl cursor-pointer text-pink-400 hover:text-pink-600" onClick={gotoMessages} />
          <FaDoorOpen className="text-3xl lg:text-4xl cursor-pointer text-yellow-400 hover:text-yellow-600" onClick={gotoHallList} />
          <FaUsers className="text-3xl lg:text-4xl cursor-pointer text-cyan-400 hover:text-cyan-600" onClick={gotoClientList} />
          <FaMoneyCheckAlt className="text-3xl lg:text-4xl cursor-pointer text-orange-400 hover:text-orange-600" onClick={gotoTransactions} />
          <FaCalendarAlt className="text-3xl lg:text-4xl cursor-pointer text-teal-400 hover:text-teal-600" onClick={gotoReservationManagement} />
          {/* Ajouter les nouveaux boutons pour AdminServices et AdminEquipments */}
          <button onClick={() => gotoAdminServices('1')} className="text-xl text-white hover:text-gray-300">Services</button>
          <button onClick={() => gotoAdminEquipments('1')} className="text-xl text-white hover:text-gray-300">Équipements</button>
          <RiLogoutBoxFill className="text-3xl lg:text-4xl cursor-pointer text-red-400 hover:text-red-600" />
        </div>
      </div>
      <div className="fixed top-0 left-0 p-4 z-50">
        <GiHamburgerMenu className="cursor-pointer text-gray-900 text-3xl lg:text-4xl" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;