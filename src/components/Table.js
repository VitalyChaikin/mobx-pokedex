import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../hooks/use-stores'

export const IntroButton = observer(function IntroButton (props) {
  const { myStore } = useStores()
  let cLabel = []
  if (myStore.introScreen)
    cLabel.push(
      <div
        className='IntroButton'
        onClick={() => myStore.showMePokedex()}
        key='IntroButton'
      >
        <label key='lbl' id='lIntroButton'>
          {' '}
          Show me Pokedex{' '}
        </label>
      </div>
    )
  return cLabel
})

const RowHead = ({ data: arr, skipEvents }) => {
  const { myStore } = useStores()
  let p = myStore.myP

  //console.log('skipEvents',skipEvents);
  let sorted
  let thList = []
  if (arr.length === 0) thList.push(<th key='noitems'>Empty list</th>)
  else {
    let onClickEvent = undefined
    if (!skipEvents) onClickEvent = myStore.changeSortOrder.bind()
    // Use keys of first element for Column names
    Object.keys(arr[0]).forEach((element, key) => {
      sorted = undefined
      if (!skipEvents)
        if (element === p.sortColumn) {
          // dont decorate sorted column if skipEvent = true
          sorted = 'sortColumn' + p.sortDirection.toString()
          //console.log('RowHead #1 sorted = ', sorted);
        }
      // console.log('RowHead #1 element = ', element);
      //console.log('RowHead #2 key = ', key);
      let columnName = p.getColumnName(element)
      // console.log('RowHead #1 element', element, 'columnName', columnName);
      if (!(columnName === 'hidden')) {
        thList.push(
          <th
            key={element}
            className={element}
            id={sorted}
            onClick={onClickEvent}
          >
            {columnName}
          </th>
        )
        // console.log('push className=', element, 'columnName=',columnName);
      } //else console.log('RowHead #1 skip element=', element, 'columnName=',columnName);
    })
  }
  return <tr>{thList}</tr>
}
const Row = ({ data: line, skipEvents }) => {
  const { myStore } = useStores()
  let p = myStore.myP

  let id = undefined
  let trColumns = []
  for (const property in line) {
    let columnName = p.getColumnName(property)
    // console.log('property', property, 'columnName', columnName, !(columnName==='hidden'));
    if (!(columnName === 'hidden')) {
      let className = 'td' + property // set className = 'tdname' for css selector
      let element = line[property]
      if (className === 'tdid') id = element
      if (className === 'tdtype1' || className === 'tdtype2')
        className += element // tdtype1/tdtype2 also have value like: tdtype1fire
      trColumns.push(
        <td className={className} key={property} tag={id}>
          {element}
        </td>
      )
      //console.log('Row#1 push className=', className, 'element=',element);
    } //else console.log('Row #1 skip property=', property, 'columnName=',columnName);
  }
  if (id === undefined) id = ''
  let onClickEvent = undefined
  if (!skipEvents) onClickEvent = myStore.clickOnDataRow.bind()
  let trRow = []
  trRow.push(
    <tr className='DataRow' key={id} onClick={onClickEvent}>
      {trColumns}
    </tr>
  )
  return trRow
}

const ModalInfo = observer(() => {
  const { myStore } = useStores()
  let divModalInfo = null

  if (!(myStore.choosenItemImg === undefined))
    divModalInfo = (
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <button className='close' onClick={myStore.closeModalInfo.bind()}>
            &times;
          </button>
          <img
            src={myStore.choosenItemImg}
            className='imagePokemon'
            alt='pokemon'
          />
          <table className='DataTable'>
            <thead>
              <RowHead data={myStore.choosenArrData} skipEvents={true} />
            </thead>
            <tbody>
              <Row key={0} data={myStore.choosenArrData[0]} skipEvents={true} />
            </tbody>
          </table>
        </div>
      </div>
    )

  return divModalInfo
})

const Table = observer(() => {
  const { myStore } = useStores()
  return (
    <div className='frameDataTable'>
      <table className='DataTable'>
        <thead>
          <RowHead data={myStore.arrData} skipEvents={false} />
        </thead>
        <tbody>
          {myStore.arrData.map((dev, i) => (
            <Row key={i} data={dev} skipEvents={false} />
          ))}
        </tbody>
      </table>
      <div>
        <ModalInfo />
      </div>
    </div>
  )
})

export default Table
