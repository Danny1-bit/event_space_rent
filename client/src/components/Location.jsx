import React from "react";

const Location = () => {
  return (
    <div>
      <div className="max-w-[1540px] mx-auto h-[500px] flex justify-center items-center py-8 mt-4">
        <iframe
          className="w-full"
          height="450"  // Conserver l'attribut height
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.1742401527877!2d47.55397367410003!3d-18.834918905142437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f08427e5147745%3A0x6f2f9f2a6ea6dcb8!2zTHljw6llIFByaXbDqSBNYXNjYQ!5e0!3m2!1sfr!2smg!4v1731412945898!5m2!1sfr!2smg"
          style={{ border: 0, width: '100%' }}  // Conserver la largeur à 100%
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        />
      </div>
    </div>
  );
};

export default Location;