import { useEffect } from "react";
import { ItemPreview } from "./item-preview";

export function ItemList({ items }) {
    useEffect(() => { }, [])

    return <section className="item-list-container">
        <div className="item-list">
            {items.map(item => <ItemPreview item={item} key={item._id} />)}
        </div>
    </section>
}