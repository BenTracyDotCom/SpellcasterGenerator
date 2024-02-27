const parsers = {
  parseSlots: (spellcastingInfo, cb) => {
    const slots = []
    const slotInfo = Object.keys(spellcastingInfo).filter(key => (parseInt(key.slice(-1)) !== NaN))
    slotInfo.forEach(slot => {
      slots[parseInt(slot.slice(-1))] = spellcastingInfo[slot]
      //console.log(slots,  ` just set to ${slot}`)
    })
    cb(slots)
  },

  parseSpellsKnown: (spellObj, level) => {
    const modifier = 
    level < 4 ? 3 : 
    //Assuming bumping up ability score from 16 to 18 at level 4, 19 at 8, 20 at 12
    level < 12 >= 4 ? 4 : 5
    /*
    { cantrips_known: num,
      spell_slots_level_x: num,
      ...
      spells_known?: num,  
    }
    */
    if (!spellObj.spells_known) {
      spellObj.spells_known = parseInt(level) + parseInt(modifier)
    }
    return spellObj
  },

  parseModifiers: (castingAbility, subrace, level) => {

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
      if (!parseInt(key)) {
        modifiers[key] += parseInt(subrace.bonuses[key])
      } else {
        if (key === '2') {
          //Variant human: +1 to spellcasting stat and CON
          modifiers.castingModifier++
          modifiers.con++
        } else if (key === '1') {
          //Half-elf: +1 to either spellcasting stat or CON
          if (castingModifier === 'cha') {
            modifiers.con++
          } else {
            modifiers.castingModifier++
          }
        }
      }
    })

    Object.keys(modifiers).forEach(key => {
      if (modifiers[key] > 10) {
        modifiers[key] = Math.floor((modifiers[key] - 10) / 2)
      }
    })
    modifiers[castingAbility] =  level < 4 ? 3 : level < 12 >= 4 ? 4 : 5
    modifiers.con += (level > 7 && level < 12 ? 1 : level >= 12 ? 2 : 0 )
    return modifiers
  },

  toIndex: (str) => {
    const formattedString = str.replace(/\s+/g, '-').toLowerCase();
    return formattedString;
  },

  parseSpellsIntoSlots: (spells) => {
    const parsed = [];

    Object.keys(spells).forEach(key => {

      if (parseInt(key.slice(-1)) !== NaN) {
        parsed[parseInt(key.slice(-1))] = spells[key]
      }
    })
    return parsed
  },

  distributeSpells: (spells, prepared) => {
    const mutableSpells = spells.slice(0)
    //Pick 2 for every level of slots, put remainder into level 1
    //console.log(mutableSpells, ' spells')
    //console.log(typeof prepared, ' prepared data type')
    //console.log(prepared, 's/b 2')
    const toReturn = []
    for(let i = 0; i < prepared; i ++){
      const indexToRemove = Math.floor(Math.random() * (spells.length - i))
      let randomSpell = mutableSpells.splice(indexToRemove, 1)[0]
      toReturn.push(randomSpell)
    }
    return toReturn
  }

}

export default parsers