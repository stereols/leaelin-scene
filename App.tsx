import React from 'react';
import Slideshow from './components/Slideshow';

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-black">
      {/* 
        The slideshow component takes up the entire viewport.
        Optimized for 7-inch landscape kiosk displays.
      */}
      <Slideshow />
    </div>
  );
};

export default App;