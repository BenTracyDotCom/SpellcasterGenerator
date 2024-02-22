import classNames from "./classNames.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = {
  url: 'https://www.dnd5eapi.co',
  fetchClas: async function(clas) {
    let response
    if (clas.url) {
      response = await fetch(url + classObj.url)
    } else {
      response = await fetch(this.url + '/classes/' + clas)
    }
    const classData = response.json();
    return classData
  },
  fetchClasses: async function() {
    const promises = classNames.map(clas => (
      this.fetchClass(clas)
    ))
    return Promise.all(promises)
  },
  fetchClassSpells: async function(clas) {
    const response = await fetch(this.url + clas.spells)
    const spells = response.json();
    return spells
  },
  fetchClassLevels: async function(clas) {
    const response = await fetch(this.url + clas.levels)
    const levels = response.json()
    return levels
  },
  fetchSpell: async function(spellObj) {
    const response = await fetch(this.url + spellObj.url)
    const spell = response.json()
    return spell
  },
  expandSpells: async function(spells) {
    const promises = spells.map(spell => (
      this.fetchSpell(spell)
    ))
    return Promise.all(promises)
  }
}

const demoClas = {
  "spells": "/api/classes/wizard/spells",
  "levels": "/api/classes/wizard/levels"
}

api.fetchClassLevels(demoClas)
  .then(data => (
    console.log(data[0])
  ))

export default api