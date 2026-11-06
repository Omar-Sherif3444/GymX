import React from "react";

const MachineCarousel = () => {
  return (
    <div className="w-full h-75 sm:h-100 md:h-125 lg:h-full overflow-hidden">
      <div className="carousel w-full h-full">
        <div className="carousel-item w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=1400&q=85"
            className="w-full h-full object-cover grayscale"
            alt="Gym machine"
          />
        </div>
      </div>
    </div>
  );
};

export default MachineCarousel;
