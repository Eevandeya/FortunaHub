import { useState, Fragment } from 'react';
import 'bulma/css/bulma.css';
import Time from './components/Time.jsx';

function App() {
  const [modalActive, setModalActive] = useState(false);

  const handleAcitve = (evt) => {
    evt.preventDefault();
    setModalActive(true);
  };

  return (
    <>
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
    </>
  );
}

export default App;
