import { NavLink } from 'react-router-dom';

function Homepage() {
    return (
        <>
            <header>
                <nav>
                    <div className='navbar'>
                        <div className='navbar-content'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 640 640'>
                                <path d='M447.8 415.7C450.3 413.2 553 323.3 553 323.3L535.5 315.8C525.5 310.9 528.1 304.3 530.5 298.4C532.9 290.8 550.6 231.1 550.6 231.1C550.6 231.1 502.9 241.1 492.9 243.6C485.4 246 482.9 241.1 480.4 236.1C477.9 231.1 465.4 203.7 465.4 203.7C465.4 203.7 412.8 263.6 410.3 266C400.3 273.5 390.2 266 392.7 256C392.7 246 420.3 126.4 420.3 126.4C420.3 126.4 390.2 143.8 380.2 148.8C372.7 153.8 367.6 153.8 362.6 143.8C357.5 136.3 319.9 64 319.9 64C319.9 64 282.4 136.3 277.4 143.8C272.4 153.8 267.4 153.8 259.8 148.8C249.8 143.8 219.7 126.4 219.7 126.4C219.7 126.4 247.3 246 247.3 256C249.8 266 239.8 273.5 229.7 266C227.2 263.5 174.6 203.7 174.6 203.7C174.6 203.7 162.1 231 159.6 236C157.1 241 154.6 245.9 147.1 243.5C137 241 89.4 231 89.4 231C89.4 231 107 290.7 109.5 298.3C111.9 304.3 114.5 310.8 104.5 315.7L87 323.3C87 323.3 189.6 413.2 192.2 415.7C197.3 420.7 202.2 423.2 197.3 438.2C192.2 453.2 187.2 473.3 187.2 473.3C187.2 473.3 282.4 453.2 292.5 450.7C301.2 449.8 310.8 453.2 310.8 463.2C310.8 473.2 305 576 305 576L335 576C335 576 329.2 473.3 329.2 463.2C329.2 453.1 338.7 449.8 347.6 450.7C357.6 453.2 452.8 473.3 452.8 473.3C452.8 473.3 447.8 453.2 442.8 438.2C437.8 423.2 442.8 420.7 447.8 415.7z' />
                            </svg>
                        </div>
                        <div className='navbar-right'>
                            <span>
                                <NavLink
                                    style={({ isActive }) =>
                                        isActive
                                            ? { color: 'white' }
                                            : { color: '#c6cec9' }
                                    }
                                    to='/'
                                    end>
                                    В главное меню
                                </NavLink>
                            </span>
                            <span>
                                <NavLink
                                    style={({ isActive }) =>
                                        isActive
                                            ? { color: 'white' }
                                            : { color: '#c6cec9' }
                                    }
                                    to='/booking/time'
                                    end>
                                    Забронировать
                                </NavLink>
                            </span>
                            <span>
                                <a href='#about'>О нас</a>
                            </span>
                        </div>
                        <div id='burger-menu'>
                            <input
                                type='checkbox'
                                id='burger-checkbox'
                                className='burger-checkbox'
                            />
                            <label
                                htmlFor='burger-checkbox'
                                className='burger'></label>
                            <ul className='menu-list'>
                                <li>
                                    <a className='menu-item' href='#'>
                                        Главная
                                    </a>
                                </li>
                                <li>
                                    <a className='menu-item' href='#'>
                                        Забронировать
                                    </a>
                                </li>
                                <li>
                                    <a className='menu-item' href='#'>
                                        О нас
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className='container'>
                <div className='first'></div>
                <div className='second'></div>
                <div className='third'></div>
            </main>
            <footer>
                <div className='basement' id='about'>
                    <span>
                        <h3>О нас:</h3>
                        <p>
                            Лучшая баня для семейного отдыха или посиделок с
                            друзьями. Природа города и чистый воздух предают
                            ощущения отдыха на природе. Работаем с 2025 и имеем
                            крупный опыт в банных услугах.
                        </p>
                    </span>
                    <span>
                        <h3>Забронировать:</h3>
                        <p>Выберите время</p>
                    </span>
                    <span>
                        <h3>Наше местоположение:</h3>
                        <p>Адрес: город, улица, номер дома</p>
                        <p>Время работы: 00:00 — 08:00</p>
                    </span>
                    <span>
                        <h3>Профиль:</h3>
                        <p>Регистрация</p>
                        <p>Вход</p>
                    </span>
                </div>
            </footer>
        </>
    );
}

export default Homepage;
