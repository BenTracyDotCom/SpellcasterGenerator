const parseSpellInfo = (spellObj, level, modifier) => {
  /*
  { cantrips_known: num,
    spell_slots_level_x: num,
    spells_known?: num,  
  }
  */
 console.log(spellObj)
  const parsed = {}
  if(spellObj.spells_known){
    parsed.spells_known = spellObj.spells_known
  } else {
    parsed.spells_known = parseInt(level) + parseInt(modifier)
  }
  parsed[0] = spellObj.cantrips_known
  const keys = Object.keys(spellObj)
  for(let i = 0; i < keys.length; i ++){
    let num = parseInt(keys[i].slice(-1))
    if(num){
      parsed[num] = spellObj[keys[i]]
    }
  }
  return parsed

}

export default parseSpellInfo