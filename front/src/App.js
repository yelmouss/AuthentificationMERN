
import Router from "./routes";

import './App.css'
function App() {

  const apiUrl = process.env.REACT_APP_API_URL;

  console.log(apiUrl)

  return (
    <>
    <div className="home">
    <Router />


    </div>
    
    </>
  );
}

export default App;
