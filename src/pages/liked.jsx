import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ItemList } from "../cmps/item-list"
import { userService } from "../services/user.service"

export function Liked() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [items, setItems] = useState([])

    useEffect(() => {
        onLoadLiked()
    }, [user])

    async function onLoadLiked() {
        const liked = await userService.getLiked()
        setItems(liked)
    }

    return items.length > 0 ?
        <section className="liked">
            <ItemList items={items} />
        </section>
        : <h1>אין פריטים אהובים...</h1>
}