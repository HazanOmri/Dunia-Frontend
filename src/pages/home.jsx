import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { itemService } from '../services/item.service'
import { ItemList } from '../cmps/item-list'
import { setUser } from '../store/user.action'
import { userService } from '../services/user.service'
import { setFilter } from '../store/item.action'

export function Home() {
    const user = useSelector(storeState => storeState.userModule.user)
    const filter = useSelector(storeState => storeState.itemModule.filter)
    const [items, setItems] = useState([])

    useEffect(() => {
        loadUser()
        loadItems()
    }, [filter])

    async function loadItems() {
        const serviceItems = await itemService.query(filter)
        setItems(serviceItems)
    }

    function loadUser() {
        const user = userService.getLoggedinUser()
        if (user) setUser(user)
        else setUser(userService.getEmptyUser())
    }

    function handleChange({ target }) {
        setFilter({ ...filter, price: +target.value })
    }

    return <section className="home">
        <div className="actions">
            {user.isAdmin ? <Link to={"/edit/"}>הוסף מוצר</Link> : <h1></h1>}
            {/* <div>
                <div className="price-range">
                    <p><span>₪</span>{filter.price}</p>
                    <p>קבע טווח</p>
                    <p><span>₪</span>25</p>
                </div >
                <input
                    type="range"
                    id="price"
                    value={filter.price}
                    onChange={handleChange}
                    min={25}
                    max={1000}
                    title={"₪" + filter.price}
                />
            </div> */}
        </div>
        <ItemList items={items} />
    </section>
}