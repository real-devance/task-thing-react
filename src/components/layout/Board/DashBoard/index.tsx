import Greeting from '../../../widgets/Greeting'; 

function DashBoard() {
  return (
    <div className="px-4 py-2 grid grid-rows-[auto_1fr] gap-4">
      <h1 className="text-default text-2xl">Dashboard</h1> {/* Dashboard title */}

      <div className="grid place-items-center"> 
        {/* Displaying the Greeting component */}
        <div className="text-center"> 
          <Greeting /> 
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
