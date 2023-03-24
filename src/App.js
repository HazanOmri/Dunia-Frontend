import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { Liked } from './pages/liked.jsx'
import { Cart } from './pages/cart.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { ItemDetails } from './cmps/item-details.jsx'
import { UserMsg } from './cmps/user-msg'


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader />
        <main className="main-app">
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<About />} path='/about' />
            <Route element={<ItemDetails />} path='/details/:id' />
            <Route element={<Liked />} path='/liked' />
            <Route element={<Cart />} path='/cart' />
          </Routes>
          <UserMsg />
        </main>
        <AppFooter />
      </Router>
    </Provider>
  )
}
