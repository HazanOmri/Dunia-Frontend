import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { userService } from '../services/user.service.js'
import { signup, login, setUser } from '../store/user.action.js'
import { utilService } from '../services/util.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function LoginSignup() {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)
    const { signupState } = useParams()
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (signupState === 'loginState') setIsSignupState(false)
        else if (signupState === 'signupState') setIsSignupState(true)
    }, [signupState])

    function onToggleSignupState(ev) {
        ev.preventDefault()
        setIsSignupState(!isSignupState)
    }

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    async function loginAsGuest() {
        try {
            await login({
                _id: utilService.makeId(),
                fullname: 'guest',
                username: 'guest',
                password: 'guest',
            })
            navigate('/')
        } catch (err) {
            showErrorMsg('Had problem to log in')
        }
    }

    async function onSubmit(ev) {
        ev.preventDefault();
        if (isSignupState)
            try {
                await signup({ ...credentials, fullname: credentials.fullname })
                navigate('/')
            }
            catch (err) {
                showErrorMsg('Had problem to sign up')
            }
        else try {
            await login(credentials)
            navigate('/')
        } catch (err) {
            showErrorMsg('Had problem to log in')
        }
    }

    function onLogout() {
        userService.logout()
        setUser(userService.getEmptyUser())
    }

    return user.fullname !== '' ?
        <section>
            <h1>שלום {user.fullname}</h1>
            <button onClick={onLogout}>התנתק</button>
        </section>
        : <section className="login-signup">
            <div className="login-page">
                <Link className="guest-btn" to='/'>המשך כאורח</Link>
                <form className="login-form grid " onSubmit={onSubmit}>
                    <label>שם משתמש
                        <input
                            className="custom-placeholder"
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="הכנס שם משתמש"
                            onChange={handleCredentialsChange}
                            required
                        />
                    </label>
                    <label>כתובת מייל
                        <input
                            className="custom-placeholder"
                            type="email"
                            name="email"
                            value={credentials.email}
                            placeholder="הכנס כתובת דוא״ל"
                            onChange={handleCredentialsChange}
                            required
                        />
                    </label>
                    <label>סיסמה
                        <input
                            className="custom-placeholder"
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="הכנס סיסמה"
                            onChange={handleCredentialsChange}
                            required
                        />
                    </label>
                    {isSignupState &&
                        <label>שם מלא
                            <input
                                className="custom-placeholder"
                                type="text"
                                name="fullname"
                                value={credentials.fullname}
                                placeholder="הכנס שם מלא"
                                onChange={handleCredentialsChange}
                                required
                            />
                        </label>
                    }
                    <button className="registration-btn">{isSignupState ? "הרשם" : "התחבר"}</button>
                    <a href="#" onClick={onToggleSignupState}>
                        {isSignupState ? "קיים ברשותך חשבון? לחץ כאן " : "להרשמה לחץ כאן"}
                    </a>
                </form>
            </div>
        </section>
}