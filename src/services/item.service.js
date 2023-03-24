import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const ITEM_KEY = 'itemDB'

_createItems()

export const itemService = {
  query,
  get,
  remove,
  save,
}

async function query(filterBy = getEmptyFilter()) {
  try {
    let items = await storageService.query(ITEM_KEY)
    if (filterBy.name) {
      const regex = new RegExp(filterBy.name, 'i')
      items = items.filter(item => regex.test(item.name))
    }
    if (filterBy.price) {
      items = items.filter(item => item.price < filterBy.price)
    }
    return Promise.resolve(items)
  } catch (err) {
    throw err
  }
}

function getEmptyFilter() {
  return { name: '' , price: 500}
}

function get(itemId) {
  return storageService.get(ITEM_KEY, itemId)
}

function remove(itemId) {
  return storageService.remove(ITEM_KEY, itemId)
}

function save(item) {
  if (item._id) {
    return storageService.put(ITEM_KEY, item)
  } else {
    return storageService.post(ITEM_KEY, item)
  }
}

function _createItems() {
  let items = utilService.loadFromStorage(ITEM_KEY)
  if (!items || !items.length) {
    items = []
    for (let i = 1; i <= 10; i++) {
      items.push({
        "_id": utilService.makeId(5),
        "name": 'שידת עץ 2 מגירות, מסגרת מתכת שחורה',
        "imgUrl": `../assets/imgs/${i}.jpeg`,
        "price": utilService.getRandomIntInclusive(100, 300),
        "categories": ['מראות','אקססוריז','שולחנות', 'כיסאות', 'שידות']
      }
      )
    }
    utilService.saveToStorage(ITEM_KEY, items)
  }
}