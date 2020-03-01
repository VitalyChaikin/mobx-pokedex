import React from 'react'
import { useStores } from '../hooks/use-stores'

const Header = () => {
  const { myStore } = useStores()
  return (
    <div className='Header'>
      <div className='hSearch'>
        <label htmlFor='sExpression'>Search:</label>
        <input
          type='text'
          className='input-text'
          id='sExpression'
          onChange={myStore.changeFilter.bind()}
        />
      </div>
      <div className='hItemsPerPage'>
        <label htmlFor='nItemsPerPage' id='lItemsPerPage'>
          View on page:
        </label>
        <select
          id='nItemsPerPage'
          defaultValue={myStore.itemsPerPage}
          onChange={myStore.changeItemsPerPage.bind()}
        >
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='200'>200</option>
        </select>
      </div>

      <div className='hSearchType'>
        <label htmlFor='sSearchType' id='lSearchType'>
          Type:
        </label>
        <select
          id='sSearchType'
          defaultValue={myStore.searchByType}
          onChange={myStore.changeFilterType.bind()}
        >
          <option value='-'>- All -</option>
          <option value='normal'>Normal</option>
          <option value='fire'>Fire</option>
          <option value='water'>Water</option>
          <option value='electric'>Electric</option>
          <option value='grass'>Grass</option>
          <option value='ice'>Ice</option>
          <option value='fighting'>Fighting</option>
          <option value='poison'>Poison</option>
          <option value='ground'>Ground</option>
          <option value='flying'>Flying</option>
          <option value='psychic'>Psychic</option>
          <option value='bug'>Bug</option>
          <option value='rock'>Rock</option>
          <option value='ghost'>Ghost</option>
          <option value='dragon'>Dragon</option>
          <option value='dark'>Dark</option>
          <option value='steel'>Steel</option>
          <option value='fairy'>Fairy</option>
        </select>
      </div>
    </div>
  )
}

// <div className="hOffset">
//   <label htmlFor="nOffset" id="lOffset">Offset</label>
//   <input type="text" defaultValue='0' pattern='[0-9]^.{1,3}$' className="input-text" id="nOffset" onBlur={store.ChangeDataOffset} />
//   <button className='bSetOffset' id="bOffset" onClick={store.SetDataOffset}>Set</button>
// </div>

export default Header
