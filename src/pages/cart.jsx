import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ItemList } from '../cmps/item-list'
import { userService } from '../services/user.service'

export function Cart() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [items, setItems] = useState([])
    const [sum, setSum] = useState(0)

    useEffect(() => {
        loadCart()
    }, [user])

    async function loadCart() {
        const cartAndSum = await userService.getCart()
        console.log('cartAndSum', cartAndSum)
        setItems(cartAndSum.items)
        setSum(cartAndSum.sum)
    }

    return items?.length > 0 ?
        <section className="cart">
            <ItemList items={items} />
            <h1 className="sum">לתשלום:₪{sum}</h1>
            <div className="actions">
                <Link to="/about" className="cta">לסיום הזמנה</Link>
                <Link to="/" className="back">להמשך רכישה</Link>
            </div>
        </section>
        : <h1>הסל שלך ריק...</h1>
}