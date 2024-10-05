import { Outlet } from "react-router-dom";

 
  export default function RootLayout() {
    return (
      <div className="relative min-h-screen w-full">
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
  