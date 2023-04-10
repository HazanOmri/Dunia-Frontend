import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const ITEM_KEY = 'itemDB'
const ITEM_URL = 'item/'

// _createItems()

export const itemService = {
  query,
  get,
  remove,
  save,
  getEmptyItem,
}

async function query(filterBy = getEmptyFilter()) {
  try {
    // let items = await storageService.query(ITEM_KEY)
    let items = await httpService.get(ITEM_URL)
    console.log(items)
    // if (filterBy.name) {
    //   const regex = new RegExp(filterBy.name, 'i')
    //   items = items.filter(item => regex.test(item.name))
    // }
    // if (filterBy.price) {
    //   items = items.filter(item => item.price < filterBy.price)
    // }
    return items
  } catch (err) {
    throw err
  }
}

function getEmptyFilter() {
  return { name: '', price: 500 }
}

function get(itemId) {
  return httpService.get(ITEM_URL + itemId)
  // return storageService.get(ITEM_KEY, itemId)
}

function remove(itemId) {
  return httpService.delete(ITEM_URL + itemId)
}

function save(item) {
  if (item._id) {
    return httpService.put(ITEM_URL + item._id, item)
  } else {
    return httpService.post(ITEM_URL, item)
  }
}

function getEmptyItem() {
  return {
    name: '',
    imgUrl: '',
    description: '',
    price: 0,
    categories: []
  }
}

// function _createItems() {
//   let items = utilService.loadFromStorage(ITEM_KEY)
//   if (!items || !items.length) {
//     items = []
//     for (let i = 0; i <= 10; i++) {
//       items.push({
//         "_id": utilService.makeId(5),
//         "name": 'שידת עץ 2 מגירות, מסגרת מתכת שחורה',
//         "imgUrl": `../assets/imgs/${i}.jpeg`,
//         "price": utilService.getRandomIntInclusive(100, 300),
//         "categories": ['מראות', 'אקססוריז', 'שולחנות', 'כיסאות', 'שידות']
//       }
//       )
//     }
//     utilService.saveToStorage(ITEM_KEY, items)
//   }
// }