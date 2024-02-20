export async function fetchClasses() {
  const response = await fetch("https://www.dnd5eapi.co/api/classes")
  const classes = response.json();
  return classes
}

export async function fetchClass(classObj) {
  const response = await fetch(`https://www.dnd5eapi.co${classObj.url}`)
  const clas = response.json();
  return clas
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

export async function loadSpells(spells, incrementer, portionTotalLoading) {
  incrementer = incrementer || (() => {})
  const promises = spells.map(async(spell) => {
    const result = await fetchSpell(spell);
    incrementer(spells.length, portionTotalLoading)
    return result
  })

  return Promise.all(promises)
}