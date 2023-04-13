import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'

import { uploadService } from "../services/upload.service"
import defaultPhoto from '../assets/imgs/add.jpeg'
import { itemService } from '../services/item.service'
import { userService } from "../services/user.service"
import { setUser } from "../store/user.action"
import { useSelector } from "react-redux"
import FilterSelcet from "../cmps/filter-select"


export function Edit() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [item, setItem] = useState(itemService.getEmptyItem())
    const [itemImg, setItemImg] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemCategories, setItemCategories] = useState(null)
    const [itemPrice, setItemPrice] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id) loadItem()
    }, [])

    async function loadItem() {
        try {
            const newItem = await itemService.get(params.id)
            console.log('newItem', newItem)
            const { name, description, price, imgUrl } = newItem
            setItem(newItem)
            setItemName(name)
            setItemDescription(description)
            setItemPrice(+price)
            setItemImg(imgUrl)
        } catch (err) {
            console.log(err, 'Cant load item')
        }
    }

    async function onUploadImg(ev) {
        try {
            const imgUrl = await uploadService.uploadImg(ev)
            setItemImg(imgUrl)
        } catch (err) {
            console.log('Cant set image', err)
        }
    }

    function onChangeName({ target }) {
        setItemName(target.value)
    }

    function onChangeDescription({ target }) {
        setItemDescription(target.value)
    }

    function onChangePrice({ target }) {
        setItemPrice(+target.value)
    }

    async function onSave() {
        let newItem = {
            _id: item._id,
            name: itemName,
            imgUrl: itemImg,
            description: itemDescription,
            price: itemPrice,
            categories: itemCategories
        }
        try {
            newItem = await itemService.save(newItem)
            console.log('item', item)
            navigate('/')
        } catch (err) {
            console.log(err, 'Cant save item')
        }
    }

    async function onDelete() {
        try {
            await itemService.remove(item._id)
            await userService.updateUsers(item._id)
            const newLiked = user.liked.filter(itemId => itemId !== item._id)
            const newCart = { ...user.cart }
            delete newCart[item._id]
            setUser({ ...user, liked: newLiked, cart: newCart })
            onToggleModal()
            navigate('/')

        } catch (err) {
            console.log(err, 'Cant delete item')
        }
    }

    function onToggleModal() {
        setIsModalOpen(prevVal => !prevVal)
    }

    function onChooseCategory({ target }) {
        setItemCategories(target.value)
    }

    return <section className="edit">
        <h1>ערוך פרטי מוצר</h1>
        <div className="edit-container">
            <div className="input-img-container">
                <img src={itemImg ? itemImg : defaultPhoto} />
                <input type="file" onChange={onUploadImg} />
            </div>
            <form className="text-input">
                <input type="text"
                    name="name"
                    className="input-title"
                    placeholder="שם הפריט"
                    value={itemName}
                    onChange={onChangeName}
                />
                <textarea name="description"
                    className="input-desc"
                    placeholder="הכנס תיאור פריט"
                    value={itemDescription}
                    onChange={onChangeDescription}
                />
                <FilterSelcet handleChange={onChooseCategory} />
                <input type="number"
                    name="price"
                    placeholder="הכנס מחיר"
                    value={itemPrice}
                    onChange={onChangePrice}
                />
            </form>
        </div>
        <div className="actions">
            <button className="save" onClick={onSave}>שמור</button>
            {params.id ? <button className="delete" onClick={onToggleModal}>מחק</button> : ''}
        </div>
        {isModalOpen && <div className="mdoal">
            <div className="closeModal" onClick={onToggleModal}>
                <svg width="16" height="16" viewBox="-1 -1 17 17"><g transform="translate(-636.000000, -429.000000)" fill="#2D2D2D"><g transform="translate(132.000000, 315.000000)"><g transform="translate(30.000000, 100.000000)"><g transform="translate(458.000000, 0.000000)"><path d="M23,21 L14,21 L14,23 L23,23 L23,32 L25,32 L25,23 L34,23 L34,21 L25,21 L25,12 L23,12 L23,21 Z" transform="translate(24.000000, 22.000000) rotate(-315.000000) translate(-24.000000, -22.000000) " /></g></g></g></g></svg>
            </div>
            <h1>האם אתה בטוח?</h1>
            <div className="modal-actions">
                <button className="delete" onClick={onDelete}>מחק</button>
                <button className="cancel" onClick={onToggleModal}>ביטול</button>
            </div>
        </div>}
    </section >
}