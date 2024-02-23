const parseModifiers = (castingAbility, subrace) => {

  const modifiers = {
    con: 14,
    str: 12,
    dex: 13,
    wis: 0,
    cha: 0,
    int: 0
  }


  modifiers[castingAbility] = 15

  Object.keys(subrace.bonuses).forEach(key => {
    if(!parseInt(key)){
      modifiers[key] += parseInt(subrace.bonuses[key])
    } else {
      if(key === '2'){
        //Variant human: +1 to spellcasting stat and CON
        modifiers.castingModifier ++
        modifiers.con ++
      } else if (key === '1'){
        //Half-elf: +1 to either spellcasting stat or CON
        if(castingModifier === 'cha'){
          modifiers.con ++
        } else {
          modifiers.castingModifier ++
        }
      }
    }
  })

  Object.keys(modifiers).forEach(key => {
    if(modifiers[key] > 10){
      modifiers[key] = Math.floor((modifiers[key] - 10) / 2)
    }
  })

  return modifiers

}

export default parseModifiers