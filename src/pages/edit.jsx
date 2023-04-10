import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'

import { uploadService } from "../services/upload.service"
import defaultPhoto from '../assets/imgs/add.jpeg'
import { itemService } from '../services/item.service'


export function Edit() {
    const [item, setItem] = useState(itemService.getEmptyItem())
    const [itemImg, setItemImg] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemPrice, setItemPrice] = useState(0)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id) loadItem()
    }, [])

    async function loadItem() {
        try {
            const newItem = await itemService.get(params.id)
            const { name, desctiption, price, imgUrl } = newItem
            setItem(newItem)
            setItemName(name)
            setItemDescription(desctiption)
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
            desctiption: itemDescription,
            price: itemPrice,
            // categories: itemCategories
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
        } catch (err) {
            console.log(err, 'Cant delete item')
        }
    }

    return <section className="acount">
        <div className="add-item">
            <div className="header">
                <h1>ערוך פרטי מוצר</h1>
            </div>
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
                    {/* <input type="text"
                        name="category"
                        placeholder="שייך לקטגוריה"
                        value={item.categories}
                        onChange={() => console.log('change')}
                    /> */}
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
                <button className="delete" onClick={onDelete}>מחק</button>
            </div>
        </div>
    </section>
}


