import { ItemPreview } from './item-preview'

export function ItemList({ items }) {

    return <section className="item-list-container">
        <div className="item-list">
            {items.map(item => <ItemPreview item={item} key={item._id} />)}
        </div>
    </section>
}