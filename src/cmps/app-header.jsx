import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { setFilter } from '../store/item.action';

export function AppHeader() {
    const filter = useSelector(storeState => storeState.itemModule.filter)
    const user = useSelector(storeState => storeState.userModule.user)
    const elBtnRef = useRef(null)
    const elScreenRef = useRef(null)
    const elUlRef = useRef(null)
    const elImgInputRef = useRef(null)

    function handleChange({ target }) {
        setFilter({ ...filter, name: target.value })
    }

    function getItemsAmount() {
        let sum = 0
        for (const item in user.cart) {
            sum += user.cart[item]
        }
        return sum
    }

    function toggleMenu() {
        if (!elBtnRef.current) elBtnRef.current = document.querySelector('.toggle-menu-btn')
        if (!elScreenRef.current) elScreenRef.current = document.querySelector('.toggle-menu-screen')
        if (!elUlRef.current) elUlRef.current = document.querySelector('ul')
        elBtnRef.current.classList.toggle('hide-btn')
        elScreenRef.current.classList.toggle('close-nav')
        elUlRef.current.classList.toggle('open')
        let elImgInput = document.querySelector('.input-img-container')
        let elCatInput = document.querySelector('.multi-selector')
        if (elImgInput) elImgInput.classList.toggle('to-back')
        if (elCatInput) elCatInput.classList.toggle('to-back')

    }

    return <section className="app-header-container full main-app">
        <div className="app-header">
            <input
                type="text"
                placeholder="חפש פריט לפי שם..."
                value={filter.name}
                onChange={handleChange}
            />
            <Link to="/" className="logo">דוניא</Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            <svg role="img" height="24" width="24" aria-hidden="true" color="white" viewBox="0 0 24 24"><path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path></svg>
                            {/* FULL HOUSE <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24"><path d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"></path></svg> */}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/liked">
                            {user.liked.length ? <span>{user.liked.length}</span> : ""}
                            <svg fill="black" role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 16 16" className="un-liked"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path></svg>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/cart">
                            {Object.keys(user.cart).length ? <span>{getItemsAmount()}</span> : ""}
                            <svg aria-hidden="true" focusable="false" role="presentation" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4.28572 1.85718L5.13117 1.63172C5.02903 1.24869 4.68214 0.982178 4.28572 0.982178V1.85718ZM6.85715 17.7143L6.01581 17.4739C5.94038 17.7379 5.99325 18.022 6.15859 18.2412C6.32393 18.4604 6.58258 18.5893 6.85715 18.5893V17.7143ZM18.4286 13.8572L18.4984 14.7294C18.8104 14.7044 19.0853 14.5147 19.2193 14.2318L18.4286 13.8572ZM22.2857 5.71432L23.0765 6.0889L23.637 4.90557L22.3293 4.84041L22.2857 5.71432ZM0.857147 2.73218H4.28572V0.982178H0.857147V2.73218ZM6.87296 14.4739L6.01581 17.4739L7.69848 17.9547L8.55562 14.9547L6.87296 14.4739ZM6.85715 18.5893H19.2857V16.8393H6.85715V18.5893ZM7.78407 15.5865L18.4984 14.7294L18.3588 12.985L7.64451 13.8421L7.78407 15.5865ZM19.2193 14.2318L23.0765 6.0889L21.4949 5.33975L17.6378 13.4826L19.2193 14.2318ZM3.44026 2.08263L4.24026 5.08263L5.93117 4.63172L5.13117 1.63172L3.44026 2.08263ZM4.24026 5.08263L6.86883 14.9398L8.55975 14.4889L5.93117 4.63172L4.24026 5.08263ZM22.3293 4.84041L5.12927 3.98326L5.04217 5.73109L22.2422 6.58824L22.3293 4.84041Z" fill="currentColor"></path>      <path d="M7.6875 20.8C8.0672 20.8 8.375 21.1079 8.375 21.4875C8.375 21.8672 8.0672 22.175 7.6875 22.175C7.3078 22.175 7 21.8672 7 21.4875C7 21.1079 7.3078 20.8 7.6875 20.8"></path><path d="M18.6875 20.8C19.0672 20.8 19.375 21.1079 19.375 21.4875C19.375 21.8672 19.0672 22.175 18.6875 22.175C18.3078 22.175 18 21.8672 18 21.4875C18 21.1079 18.3078 20.8 18.6875 20.8" ></path>    </svg>
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/loginSingup">
                            <svg width="23px" height="20px" viewBox="0 0 23 20">
                                <path d="M10.5794105,11.2103717 C13.7166489,11.2103717 16.2612611,8.69966543 16.2612611,5.60431227 C16.2612611,2.50895911 13.7166113,0.0154275093 10.5794105,0.0154275093 C7.44220966,0.0154275093 4.89755984,2.52613383 4.89755984,5.60431227 C4.89755984,8.68249071 7.44217199,11.2103717 10.5794105,11.2103717 Z M10.5794105,1.47713755 C12.8800244,1.47713755 14.7623825,3.33434944 14.7623825,5.60431227 C14.7623825,7.87427509 12.8800244,9.73144981 10.5794105,9.73144981 C8.27879654,9.73144981 6.39643839,7.87423792 6.39643839,5.60427509 C6.39643839,3.33431227 8.27875887,1.47713755 10.5794105,1.47713755 Z" id="Shape" />
                                <path d="M0.749439273,19.9633829 L20.4790847,19.9633829 C20.8973781,19.9633829 21.2285239,19.6366543 21.2285239,19.2239405 C21.2285239,15.3547212 18.039027,12.1905576 14.1000532,12.1905576 L7.12847074,12.1905576 C3.20694149,12.1905576 -1.42108547e-14,15.3375093 -1.42108547e-14,19.2239405 C-1.42108547e-14,19.6366543 0.331145833,19.9633829 0.749439273,19.9633829 Z M7.12847074,13.6694424 L14.1000532,13.6694424 C16.9584043,13.6694424 19.3113143,15.7674349 19.6773493,18.484461 L1.55117465,18.484461 C1.91717199,15.7846468 4.27011968,13.6694424 7.12847074,13.6694424 Z" id="Shape" />
                            </svg>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">
                            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 416.979 416.979">
                                <g>
                                    <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85   c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786   c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576   c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765   c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z" />
                                </g>
                            </svg>
                        </NavLink>
                    </li>
                </ul>
                <button className="toggle-menu-btn" onClick={toggleMenu}>
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24.75 24.75" >
                        <g>
                            <path d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2   c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2   c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z" />
                        </g>
                    </svg>
                    {/* תפריט */}
                </button>
            </nav>
            <div className="toggle-menu-screen" onClick={toggleMenu}></div>
        </div>
    </section>
}