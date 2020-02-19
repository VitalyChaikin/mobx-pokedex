import React, { Component } from 'react';
import {observer} from 'mobx-react';

export const IntroButton = observer(class IntroButton extends Component {
    render() {
        const {store} = this.props;
        let cLabel = [];        
        if(store.introScreen) cLabel.push(
            <div className='IntroButton' onClick={store.ShowMePokedex.bind()} key='IntroButton'>
                <label key='lbl' id='lIntroButton'> Show me Pokedex </label>
            </div>
        )
        return (cLabel)
    }
})

const RowHead = ( {data: arr, store }) => {  
    let p = store.myP;
    let sorted;
    let thList = [];
    if(arr.length === 0) thList.push(<th key='noitems'>Empty list</th>)
    else {
      // Use keys of first element for Column names
      Object.keys(arr[0]).forEach( (element, key) => {
        sorted = undefined;
        if(element===p.sortColumn) {
          sorted = 'sortColumn' + p.sortDirection.toString();
          //console.log('RowHead #1 sorted = ', sorted);
        }
        // console.log('RowHead #1 element = ', element);
        //console.log('RowHead #2 key = ', key);      
        thList.push(<th key={element} className={element} id={sorted} onClick={store.ChangeSortOrder.bind()}>{p.GetColumnName(element)}</th>)
      });
    }    
    return <tr>{thList}</tr>;
  }  
  const Row = ( {data: line, store }) => {  
    
    let trColumns = [];
    for (const property in line) {
      let className = 'td' + property;  // set className = 'tdname' for css selector      
      let element = line[property];
      if(className==='tdtype1' || className==='tdtype2') className += element;  // tdtype1/tdtype2 also have value like: tdtype1fire      
      trColumns.push(<td className={className} key={property}>{element}</td>)
    }  
    let trRow = [];
    trRow.push(
      <tr key=''>
        {trColumns}
      </tr>);
    return (trRow);
  }
  
  const Table = observer(class Table extends Component {
    render() {
      const {store} = this.props;
      return (
        <div className='frameDataTable'>
          <table className='DataTable'>
            <thead>
              <RowHead data={store.arrData} store={store}/>
            </thead>
            <tbody>
              {store.arrData.map((dev,i) =>            
                <Row key={i} data={dev} store={store}/> )
              }
            </tbody>
          </table>          
        </div>        
      )
    }
  })

  export default Table;