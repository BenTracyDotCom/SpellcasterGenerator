//TODO: Imploement racial abilities (dragonborn breath, etc.)

export default [
  {
    name: "Dwarf",
    index: "dwarf",
    subraces: [
      {
        name: "Hill",
        bonuses: {
          con: 1,
          wis: 1
        }
      },
      {
        name: "Mountain",
        bonuses: {
          str: 2,
          con: 2
        }
      }
    ]
  },
  {
    name: "Elf",
    index: "elf",
    subraces: [
      {
        name: "High",
        bunuses: {
          dex: 2,
          int: 1
        }
      },
      {
        name: "Wood",
        bonuses: {
          dex: 2,
          wis: 1
        },
      },
      {
        name: "Drow",
        bonuses: {
          dex: 2,
          cha: 1
        }
      },
    ]
  },
  {
    name: "Halfling",
    index: "halfling",
    subraces: [
      {
        name: "Lightfoot",
        bonuses: {
          dex: 2,
          cha: 2
        }
      },
      {
        name: "Stout",
        bonuses: {
          dex: 2,
          con: 1
        }
      }
    ]
  },
  {
    name: "Human",
    index: "human",
    subraces: [
      {
        name: "Normal",
        bonuses: {
          str: 1,
          dex: 1,
          con: 1,
          int: 1,
          wis: 1,
          cha: 1
        }
      },
      {
        name: "Variant",
        bonuses: {
          //any 2
          2: 1
        }
      }
    ]
  },
  {
    name: "Dragonborn",
    index: "dragonborn",
    subraces: [
      {
        name: "Normal",
        bonuses: {
          str: 2,
          cha: 1
        }
      }
    ]
  },
  {
    name: "Gnome",
    index: "gnome",
    subraces: [
      {
        name: "Forest",
        bonuses: {
          dex: 1,
          int: 2
        }
      },
      {
        name: "Rock",
        bonuses: {
          con: 1,
          int: 2
        }
      }
    ]
  },
  {
    name: "Half-Elf",
    index: "half-elf",
    subraces: [
      {
        name: "Normal",
        bonuses: {
          //any 1
          1: 1,
          cha: 2
        }
      }
    ]
  },
  {
    name: "Half-Orc",
    index: "half-orc",
    subraces: [
      {
        name: "Normal",
        bonuses: {
          str: 2,
          con: 1
        }
      }
    ]
  },
  {
    name: "Tiefling",
    index: "tiefling",
    subraces: [
      {
        name: "Normal",
        bonuses: {
          int: 1,
          cha: 2
        }
      }
    ]
  }
]