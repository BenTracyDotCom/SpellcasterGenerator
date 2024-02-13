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

// function sortSpells(spells) {

//   console.log(spells[0])

//   const spellsByClassAndLevel = {
//     cleric: {
//       1: [],
//       2: [],
//       3: [],
//       4: [],
//       5: [],
//       6: [],
//       7: [],
//       8: [],
//       9: [],
//     },
//     druid: {
//       1: [],
//       2: [],
//       3: [],
//       4: [],
//       5: [],
//       6: [],
//       7: [],
//       8: [],
//       9: [],
//     },
//     warlock: {
//       1: [],
//       2: [],
//       3: [],
//       4: [],
//       5: [],
//       6: [],
//       7: [],
//       8: [],
//       9: [],
//     },
//     sorcerer: {
//       1: [],
//       2: [],
//       3: [],
//       4: [],
//       5: [],
//       6: [],
//       7: [],
//       8: [],
//       9: [],
//     },
//     bard: {
//       1: [],
//       2: [],
//       3: [],
//       4: [],
//       5: [],
//       6: [],
//       7: [],
//       8: [],
//       9: [],
//     },
//     paladin: {
//       1: [],
//       2: [],
//       3: [],
//       4: [],
//       5: [],
//       6: [],
//       7: [],
//       8: [],
//       9: [],
//     }
//   }
  
//   spells.forEach(spell => {
//     spell.classes.forEach(clas => {
//       spellsByClassAndLevel[clas.index][spell.level] = spell.index
//     })
//   })

//   return spellsByClassAndLevel
// }
