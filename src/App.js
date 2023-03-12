import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Home></Home>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
