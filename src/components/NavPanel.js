import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../hooks/use-stores'

const NavPanel = observer(() => {
  const { myStore } = useStores()

  //console.log('1.NavPanel#',myStore.pageCurrent);
  if (!myStore.pkdxAllItemsLoaded) myStore.requestDataRows() // async request data from Pokedex

  const buttons = []
  if (myStore.pageTotal > myStore.pageNavigateMax) {
    buttons.push(
      <button
        className='navButton'
        key='0'
        tag={-1}
        id='navTapLeft'
        onClick={myStore.navigatePanel.bind()}
      >
        ←
      </button>
    )
  }
  // myStore.pageNavigateMax
  let i =
    myStore.pageTotal <= myStore.pageNavigateMax ? 1 : myStore.pageNavigate
  for (let j = 1; j <= myStore.pageNavigateMax; j++) {
    if (i <= myStore.pageTotal) {
      const isCurrentPage = myStore.pageCurrent === i ? 'currentPage' : 'Page'
      //console.log('isCurrentPage',isCurrentPage, myStore.pageCurrent, i);
      buttons.push(
        <button
          className='navButton'
          key={i}
          tag={i}
          id={isCurrentPage}
          onClick={
            myStore.pageCurrent === i ? null : myStore.changeCurrentPage.bind()
          }
        >
          {i}
        </button>
      )
    }
    i++
  }

  if (myStore.pageTotal > myStore.pageNavigateMax) {
    buttons.push(
      <button
        className='navButton'
        key='9999'
        tag={+1}
        id='navTapRight'
        onClick={myStore.navigatePanel.bind()}
      >
        →
      </button>
    )
  }

  return (
    <div className='NavPanel'>
      <div className='lblContainer1'>
        <label className='lPage'>{myStore.introScreen ? '' : 'Page:'}</label>
      </div>
      <div className='buttonsContainer'>{buttons}</div>
      <div className='lblContainer2'>
        <label className='litemsLoaded'>
          Loaded: {myStore.pkdxLoadedItems}
        </label>
      </div>
    </div>
  )
})

export default NavPanel
