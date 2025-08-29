import { useState, Fragment } from 'react';
import 'bulma/css/bulma.css';
import Time from './components/features/TimeBookingPopup/Time.jsx';
import BookingProvider from './context/BookingContext.jsx';

function App() {
  const [modalActive, setModalActive] = useState(false);

  const handleAcitve = (evt) => {
    evt.preventDefault();
    setModalActive(true);
  };

  return (
    <BookingProvider>
      <div className="container-fluid">
        <nav className="block navbar is-white">
          <header>
            <div className="navbar-brand">
              <div className="navbar-burger">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </header>
        </nav>
        <button className="button is-primary" onClick={(e) => handleAcitve(e)}>
          Press
        </button>
      </div>
      <Time modalActive={modalActive} setModalActive={setModalActive} />
    </BookingProvider>
  );
}

export default App;
