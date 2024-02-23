import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api.mjs";
import races from "./races.mjs";

/*================= DB ORGANIZATION ==========================
  
races -> (arr) all races with bonus, subrace info
class-index -> (obj) all class info
class-index-spells -> (arr) spells in that class' spellbook(short version)
class-index-levels -> (arr) spell slots, proficiency bonus/level
spell-index -> (obj) expanded version of the spell
npcs -> (arr) all npcs by index
npc-index -> (obj) specific npc info */

const db = {
  races: races,

  setLoaded: async function () {
    return AsyncStorage.setItem('dataLoaded', 'true')
  },

  storeRaces: async function () {
    return AsyncStorage.setItem('races', JSON.stringify(this.races))
  },

  storeClasses: async function (cb) {
    api.fetchClasses(cb)
      .then(data => {
        cb('Storing classes...')
        const promises = data.map((clas) => (
          //For each class, this creates an entry for the class, a spell list for that class, and level info for that class.
          Promise.all([
            AsyncStorage.setItem(clas.index, JSON.stringify(clas)),
            api.fetchSpellsByClass(clas.index)
              .then(classSpells => (
                AsyncStorage.setItem(clas.index + '-spells', JSON.stringify(classSpells.results))
              ))
              .catch(err => console.log("error fetching class-specific spells: ", err)),
            api.fetchClassLevels(clas)
              .then(classLevels => (
                AsyncStorage.setItem(clas.index + '-levels', JSON.stringify(classLevels))
              ))
              .catch(err => console.log("error fetching class-specific levels: ", err))
          ])
        ))
        return Promise.all(promises)
      })
      .then(() => {
        cb('Classes stored')
      })
      .catch(err => cb('Error storing classes: ' + err))
  },

  storeSpells: async function (cb) {
    cb('Storing spells...')
    api.fetchSpells(cb)
      .then(spells => (
        api.expandSpells(spells.results, cb)
      ))
      .then(expandedSpells => {
        const promises = expandedSpells.map(spell => (
          //Now we've got spell levels to add to spells.
          AsyncStorage.setItem(spell.index, JSON.stringify(spell))
        ))
        return Promise.all(promises)
      })
      .then(() => {
        cb('Spells stored')
      })
      .catch(err => cb("Error storing spells: " + err))
  },

  getLevelInfo: async function (clas, level) {
    return AsyncStorage.getItem(clas.index ? clas.index + '-levels' : clas + '-levels')
      .then(store => {
        const levels = JSON.parse(store)
        return levels[level - 1]
      })
  },

  getSpellcastingInfo: async function (clas, level) {
    return this.getLevelInfo(clas, level)
      .then(info => {
        const relevantInfo = {};
        const spellcasting = info.spellcasting
        for (let i = 0; i < Object.keys(spellcasting).length; i++) {
          let key = Object.keys(spellcasting)[i]
          if (spellcasting[key] > 0) {
            relevantInfo[key] = spellcasting[key]
          }
        }
        return relevantInfo
      })
  },

  getClass: async function (clas) {
    return AsyncStorage.getItem(clas)
  }
}

export default db

db.storeClasses