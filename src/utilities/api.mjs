import classNames from "./classNames.mjs";
import { default as gql } from "./graphql.mjs";
import { print } from 'graphql';

const api = {
  url: 'https://www.dnd5eapi.co',
  graphqlEndpoint: 'https://www.dnd5eapi.co/graphql/',
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
  fetchSpellsByClass: async function (clas) {
    return fetch(this.graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: print(gql.spellsByClassQuery),
        variables: { index: clas }
      })
    })
      .then(res => (res.json()))
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
  fetchSimpleSpells: async function () {
    return fetch(this.graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: print(gql.simpleSpellsQuery),
        variables: { limit: 400 }
      })
    })
      .then(res => (res.json()))
    // return fetch(this.graphqlEndpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     query: print(gql.simpleSpellsQuery),
    //   })
    // })
    //   .then(res => (res.json()))
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

//api.fetchSpellsByClass('cleric')