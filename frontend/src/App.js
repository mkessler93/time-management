import './App.css';
import Header from './components/Header';
import Timer  from './components/Timer';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <Timer />
      </div>
    </GlobalProvider>
  );
}

export default App;
