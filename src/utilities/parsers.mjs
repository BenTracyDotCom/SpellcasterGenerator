const parsers = {
  parseSlots: (spellcastingInfo) => {
    const slots = []
    const slotInfo = Object.keys(spellcastingInfo).filter(key => (parseInt(key.slice(-1)) !== NaN))
    slotInfo.forEach(slot => {
      slots[parseInt(slot.slice(-1))] = spellcastingInfo[slot]
    })
    slots[0] = spellcastingInfo.cantrips_known
    return slots
  },

  parseSpellsKnown: (spellObj, level) => {
    //Adds spells_known field if dependent on level, modifier
    if (!spellObj.spells_known) {
      const modifier =
        level < 4 ? 3 :
          //Assuming bumping up ability score from 16 to 18 at level 4, 19 at 8, 20 at 12
          level < 12 >= 4 ? 4 : 5
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
          modifiers[castingAbility]++
          modifiers.con++
        } else if (key === '1') {
          //Half-elf: +1 to either spellcasting stat or CON
          if (castingAbility === 'cha') {
            modifiers.con++
          } else {
            modifiers[castingAbility]++
          }
        }
      }
    })

    Object.keys(modifiers).forEach(key => {
      if (modifiers[key] > 10) {
        modifiers[key] = Math.floor((modifiers[key] - 10) / 2)
      }
    })
    modifiers[castingAbility] = level < 4 ? 3 : level < 12 >= 4 ? 4 : 5
    modifiers.con += (level > 7 && level < 12 ? 1 : level >= 12 ? 2 : 0)
    return modifiers
  },

  toIndex: (str) => {
    const formattedString = str.replace(/\s+/g, '-').toLowerCase();
    return formattedString;
  },

  distributeSpells: (spells, prepared) => {
    const mutableSpells = spells.slice(0)
    const toReturn = []
    for (let i = 0; i < prepared; i++) {
      const indexToRemove = Math.floor(Math.random() * (spells.length - i))
      let randomSpell = mutableSpells.splice(indexToRemove, 1)[0]
      toReturn.push(randomSpell)
    }
    return toReturn
  },
  findHighestLevel: (spells) => {
    const highest = spells.length - 1
    for(let i = spells.length - 1; i >= 0 ; i --){
      if(spells[i]){
        highest = i
        break
      }
    }
    return highest
  }

}

export default parsers