const parseSlots = (spellcastingInfo, cb) => {
  const slots = []
  const slotInfo = Object.keys(spellcastingInfo).filter(key => (parseInt(key.slice(-1))))
  slotInfo.forEach(slot => {
    slots[parseInt(slot.slice(-1)) - 1] = spellcastingInfo[slot]
  })
  cb(slots)
}

export default parseSlots