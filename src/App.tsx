import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CryptoDetail from './pages/cryptoDetail';
import CryptoList from './pages/cryptoList';
import { ROUTE_PATHS } from './util/constants/routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATHS.HOME} element={<CryptoList />} />
          <Route path={`${ROUTE_PATHS.CRYPTO_DETAIL}/:id`} element={<CryptoDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
