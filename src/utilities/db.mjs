import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api.mjs";

const db = {
  storeClasses: async function (cb) {
    api.fetchClasses()
      .then(data => {
        cb('Storing classes...')
        const promises = data.map((clas) => (
          AsyncStorage.setItem(clas.index, JSON.stringify(clas))
        ))
        return Promise.all(promises)
      })
      .then(() => {
        cb('Classes stored')
      })
      .catch((err) => cb('Error storing classes: ' + err))
  }
}

export default db