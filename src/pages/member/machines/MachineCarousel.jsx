import React from "react";

const MachineCarousel = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="carousel h-full w-full">
        <div className="carousel-item h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=1400&q=85"
            className="h-full w-full object-cover grayscale"
            alt="Gym machine"
          />
        </div>
      </div>
    </div>
  );
};

export default MachineCarousel;
