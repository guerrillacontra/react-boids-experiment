
import React from "react";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";

function App() {

  return (
      <div className="w-screen h-screen bg-gray-900 flex flex-col">
          <Toolbar/>
          <div className="flex justify-center mt-4">
              <Canvas/>
          </div>
      </div>
  )
}

export default App
