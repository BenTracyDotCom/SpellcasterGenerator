import { gql } from "graphql-tag";

const spellsByClassQuery = gql`
query ClassSpellsByLevel($index: String) {
  class(index: $index) {
    lvl0: spells(level: 0) {
      index
    }
    lvl1: spells(level: 1) {
      index
    }
    lvl2: spells(level: 2) {
      index
    }
    lvl3: spells(level: 3) {
      index
    }
    lvl4: spells(level: 4) {
      index
    }
    lvl5: spells(level: 5) {
      index
    }
    lvl6: spells(level: 6) {
      index
    }
    lvl7: spells(level: 7) {
      index
    }
    lvl8: spells(level: 8) {
      index
    }
    lvl9: spells(level: 9) {
      index
    }
    index
    name
  }
}
`;

const simpleSpellsQuery = gql`
query simpleSpellsQuery {
  spells {
    name
    level
    index
    classes {
      index
      name
    }
  }
}
`;

export default graphqlQueries = {
  spellsByClassQuery: spellsByClassQuery,
  simpleSpellsQuery: simpleSpellsQuery
}