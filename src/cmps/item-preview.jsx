import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import photo from '../assets/imgs/3.jpeg'
import { toggleLike, removeFromCart, addToCart, changeAnount } from '../store/user.action'

export function ItemPreview({ item }) {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)

    function onToggleLike(ev) {
        ev.stopPropagation()
        if (user.liked.includes(item._id)) {
            toggleLike(item._id, true)
        } else {
            toggleLike(item._id, false)
        }
    }

    function onChangeAnount(itemId, { target }) {
        changeAnount(itemId, +target.value)
    }

    return <section className="item-preview-container">
        <div className="item-preview">
            <div className="actions">
                <div className="like" onClick={onToggleLike}>
                    {user.liked.includes(item._id) ?
                        <svg fill="black" role="img" height="20" width="20" aria-hidden="true" viewBox="0 0 16 16" ><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
                        : <svg fill="black" role="img" height="20" width="20" aria-hidden="true" viewBox="0 0 16 16" ><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path></svg>
                    }
                </div>
                <div className="delete" onClick={() => removeFromCart(item._id)}>
                    <svg width="20" height="20" viewBox="-1 -1 17 17"><g transform="translate(-636.000000, -429.000000)" fill="#2D2D2D"><g transform="translate(132.000000, 315.000000)"><g transform="translate(30.000000, 100.000000)"><g transform="translate(458.000000, 0.000000)"><path d="M23,21 L14,21 L14,23 L23,23 L23,32 L25,32 L25,23 L34,23 L34,21 L25,21 L25,12 L23,12 L23,21 Z" transform="translate(24.000000, 22.000000) rotate(-315.000000) translate(-24.000000, -22.000000) " /></g></g></g></g></svg>
                </div>
            </div>
            <div className="img-container" onClick={() => navigate(`/details/${item._id}`)}>
                <img src={photo} />
            </div>
            <div className="description">
                <p>{item.name}</p>
                <div className="details">
                    <p className="price">מחיר: <span>₪</span>{item.price}</p>
                    <label className="qty-label" htmlFor="qty">כמות:
                        <select name="qty" id="qty" className="qty" value={user.cart[item._id]} onChange={(ev) => onChangeAnount(item._id, ev)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
    </section >
}