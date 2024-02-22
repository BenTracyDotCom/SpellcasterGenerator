import classNames from "./classNames.mjs";

const api = {
  url: 'https://www.dnd5eapi.co',
  classNames: classNames,
  _fetchClass: async function (clas) {
    let response
    if (clas.url) {
      response = await fetch(url + classObj.url)
    } else {
      response = await fetch(this.url + '/api/classes/' + clas)
    }
    const classData = response.json();
    return classData
  },
  fetchClasses: async function (cb) {
    cb('Fetching classes...')
    const promises = this.classNames.map(clas => (
      this._fetchClass(clas)
    ))
    return Promise.all(promises)
  },
  fetchClassSpells: async function (clas) {
    const response = await fetch(this.url + clas.spells)
    const spells = response.json();
    return spells
  },
  fetchClassLevels: async function (clas) {
    const response = await fetch(this.url + clas.class_levels)
    const levels = response.json()
    return levels
  },
  _fetchSpell: async function (spellObj) {
    const response = await fetch(this.url + spellObj.url)
    const spell = response.json()
    return spell
  },
  fetchSpells: async function (cb) {
    cb('Fetching spells...')
    const response = await fetch(this.url + '/api/spells')
    const spells = response.json()
    return spells
  },
  expandSpells: async function (spells, cb) {
    cb('Expanding spell data...')
    const promises = spells.map(spell => (
      this._fetchSpell(spell)
    ))
    return Promise.all(promises)
  }
}

export default api