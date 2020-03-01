class MyPokedex {
  constructor () {
    const Pokedex = require('pokedex-promise-v2')
    this._P = new Pokedex()

    this.total = 0 // How many total pokemons
    this.names = [] // Names of selected pokemons
    this.dataOffset = 0 // min = 0, max = this.total
    this.dataRows = [] // Row data selected pokemons
    this._namesOnPage = 10 // How many data-Rows on page
    this.sortColumn = undefined // Current sort column
    this.sortDirection = 1 // Sort direction 1/-1
    this.promiseResolved = false // Variable for debug
  }

  set namesOnPage (n) {
    this._namesOnPage = n
  }

  get namesOnPage () {
    return this._namesOnPage
  }

  // mark: async - because Promise call inside
  async Initialize () {
    let interval = {
      limit: this.namesOnPage - 1,
      offset: this.dataOffset
    }
    /* RESPONSE EXAMPLE
        {
            count: 964,
            next: 'https://pokeapi.co/api/v2/pokemon/?offset=36&limit=3',
            previous: 'https://pokeapi.co/api/v2/pokemon/?offset=30&limit=3',
            results: [
            { name: 'nidoking', url: 'https://pokeapi.co/api/v2/pokemon/34/' },
            { name: 'clefairy', url: 'https://pokeapi.co/api/v2/pokemon/35/' },
            { name: 'clefable', url: 'https://pokeapi.co/api/v2/pokemon/36/' }
            ]
        }
        */

    const self = this
    self.promiseResolved = false
    this.names = []
    await this._P.getPokemonsList(interval).then(
      function (response) {
        self.total = response.count
        for (let line of response.results) self.names.push(line.name)
        self.promiseResolved = true
      },
      err => console.log('Error (51): getPokemonsList', err)
    )
    // console.log('Init #1: this.names', this.names.length);
    // console.log('Init #2: this.dataRows', this.dataRows.length);
  }

  // mark: async - because Promise call inside
  async FillDataRows () {
    let self = this
    this.dataRows = []

    let promises = [] // Stack all promises

    this.names.forEach((v, i) => {
      // console.log('Add promise - NOT execute');
      promises.push(
        new Promise((resolve, reject) => {
          this._P.getPokemonByName(v).then(function (response) {
            //console.log(response.name, response.types);
            self.dataRows.push(
              self.MapResponse('getPokemonByName', response)
              // add mapped-response to dataRows
            )
            // console.log('Add ', self.dataRows.length, response.id);
            resolve('Ok')
          })
        })
      )
    }) // end forEach()
    // console.log('Fill #0: Promise.all(promises)');
    await Promise.all(promises)
      .then(result => {
        //console.log('Fill #1: all resolved ', result);
        self.SortDataRows(self.sortColumn)
      })
      .catch(error => {
        console.log('error is ', error)
      })
  }

  MapResponse (functionCalledName, response) {
    // Get something from response
    let mappedResponse = {}
    if ('getPokemonByName' === functionCalledName)
      mappedResponse = {
        // map response to flat object
        id: response.id,
        name: response.name,
        weight: response.weight / 10,
        height: response.height,
        base_experience: response.base_experience,
        ability: this.GetSlot1Ability(response.abilities),
        type1: this.GetTypeNumber(1, response.types),
        type2: this.GetTypeNumber(2, response.types)
      }
    return mappedResponse
  }

  GetColumnName (propName) {
    return this.GetAllColumnNames()[propName]
  }

  GetAllColumnNames () {
    return {
      id: '#',
      name: 'Name',
      weight: 'KG',
      height: 'Height',
      base_experience: 'Exp',
      ability: 'Ability',
      type1: 'Type I',
      type2: 'Type II',

      Author: 'Author',
      Description: 'Description'
    }
  }

  GetSlot1Ability (response_abilities) {
    // ability: {name: "overgrow", url: "https://pokeapi.co/api/v2/ability/65/"}
    // is_hidden: false
    // slot: 1
    let abilityNameSlot1 = ''
    response_abilities.forEach(line => {
      if (line.slot === 1) abilityNameSlot1 = line.ability.name
    })
    return abilityNameSlot1
  }

  GetTypeNumber (n, response_types) {
    // slot: 1
    // type: {name: "grass", url: "https://pokeapi.co/api/v2/type/12/"}
    let abilityNameSlotN = ''
    response_types.forEach(line => {
      if (line.slot === n) abilityNameSlotN = line.type.name
    })
    return abilityNameSlotN
  }

  SortDataRows (nameColumn = undefined) {
    this.sortColumn = nameColumn
    if (this.sortColumn === undefined) {
      if (this.dataRows.length === 0) return
      this.sortColumn = Object.keys(this.dataRows[0])[0] // take first column name for sort
    }
    this.dataRows.sort((a, b) => {
      let compared = 0
      if (a[this.sortColumn] > b[this.sortColumn])
        compared = 1 * this.sortDirection
      else if (a[this.sortColumn] < b[this.sortColumn])
        compared = -1 * this.sortDirection
      return compared
    })
  }
}

export default MyPokedex

/* RESPONSE EXAMPLE

P.getPokemonByName('eevee')
{
  abilities: [
    { ability: [Object], is_hidden: true, slot: 3 },
    { ability: [Object], is_hidden: false, slot: 2 },
    { ability: [Object], is_hidden: false, slot: 1 }
  ],
  base_experience: 65,
  forms: [
    {
      name: 'eevee',
      url: 'https://pokeapi.co/api/v2/pokemon-form/133/'
    }
  ],
  game_indices: [
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 133, version: [Object] },
    { game_index: 102, version: [Object] },
    { game_index: 102, version: [Object] },
    { game_index: 102, version: [Object] }
  ],
  height: 3,
  held_items: [],
  id: 133,
  is_default: true,
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/133/encounters',
  moves: [
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] },
    { move: [Object], version_group_details: [Array] }
  ],
  name: 'eevee',
  order: 198,
  species: {
    name: 'eevee',
    url: 'https://pokeapi.co/api/v2/pokemon-species/133/'
  },
  sprites: {
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/133.png',
    back_female: null,
    back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/133.png',
    back_shiny_female: null,
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
    front_female: null,
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/133.png',
    front_shiny_female: null
  },
  stats: [
    { base_stat: 55, effort: 0, stat: [Object] },
    { base_stat: 65, effort: 1, stat: [Object] },
    { base_stat: 45, effort: 0, stat: [Object] },
    { base_stat: 50, effort: 0, stat: [Object] },
    { base_stat: 55, effort: 0, stat: [Object] },
    { base_stat: 55, effort: 0, stat: [Object] }
  ],
  types: [ { slot: 1, type: [Object] } ],
  weight: 65
}
*/
