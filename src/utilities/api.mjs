import classNames from "./classNames.mjs";

export async function fetchClasses() {
  const response = await fetch("https://www.dnd5eapi.co/api/classes")
  const classes = response.json();
  return classes
}

export async function fetchSpellcastingClasses() {
  const promises = classNames.map(clas => (
    fetchClass(clas)
  ))
  return Promise.all(promises)
}

export async function fetchClass(clas) {
  let response
  if(clas.url){
    response = await fetch(`https://www.dnd5eapi.co${classObj.url}`)
  } else {
    response = await fetch(`https://www.dnd5eapi.co/api/classes/${clas}`)
  } 
  const classData = response.json();
  return classData
}

export async function fetchSpells() {
  const response = await fetch("https://www.dnd5eapi.co/api/spells")
  const spells = response.json();
  return spells
}

export async function fetchSpell(spellObj) {
  const response = await fetch(`https://www.dnd5eapi.co${spellObj.url}`)
  const spell = response.json()
  return spell
}

export async function loadSpells(spells) {
  const promises = spells.map(async(spell) => {
    const result = await fetchSpell(spell);
    return result
  })
  return Promise.all(promises)
}