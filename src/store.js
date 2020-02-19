import { decorate, observable } from 'mobx';
import MyPokedex from './pclass'

/* EVENTS             OBSERVABLE      ACTION
 ChangeSortOrder      arrData         UpdateDataRows
 ChangeItemsPerPage
 ChangeDataOffset
 SetDataOffset
 ChangeFilter
*/
class Store {

  itemsPerPage = 10;
  filterRow = undefined;
  pkdxDataOffset = 0;
  pkdxTotal = undefined;
  arrData = [ 
    {Author: 'Vitaly Chaikin', Description: 'Hello !' },
    {Author: '', Description: 'This is a Pokedex test project using ReactJS + MobX.'},    
    {Author: '', Description: 'Javascript is something new for me, so to complete the test task'},
    {Author: '', Description: 'it was necessary to study ES6, Nodejs and Reactjs basics, CSS and MobX trics.'},
    {Author: '', Description: 'The hardest part seemed to be using promises inside Pokedex-api.'},
    {Author: '', Description: 'I had to figure it out in detail using the console.'},
    {Author: '', Description: 'As a result, we got (as you see) this table component that displays any array'},
    {Author: '', Description: ' of the form:'},
    {Author: '', Description: "  arrData = [ {Author: 'Vitaly Chaikin', Description: 'Hello !' }, {...} ];"},
    {Author: '', Description: ''},
    {Author: '', Description: 'The number of columns will correspond to the properties of the object {};'},
    {Author: '', Description: 'Each column and each cell has its own css style. Layout is adaptive.'},
    {Author: '', Description: 'You can sort the visible data by clicking on the column name.'},
    {Author: '', Description: 'Warning! If you set offset 800, data received from Pokedex-api looks strange !'},
    {Author: '', Description: 'Despite the fact that the total number of Pokemons 964, some of them ...'},
    {Author: '', Description: 'have a higher id ?!'},
    {Author: '', Description: 'Аnd remember getting data on 50-100-200 pokemons may take more than 5 seconds'}
  ];
  introScreen = true;
  
  myP = new MyPokedex();  // Pokedex instance

  ShowMePokedex = (event) => {  // click on 'Start' button
    this.introScreen = false;
    this.RequestDataRows();
  }
  ChangeSortOrder = (event) => {  // click on Column header
    let arg1;
    let lenBeforeSpace = event.target.className.indexOf(' '); // Take first className='class1 class2 class3'
    // console.log('event.target.className=(',event.target.className,') lenBeforeSpace= ', lenBeforeSpace, 'this.myP.sortColumn = ', this.myP.sortColumn);
    if(-1===lenBeforeSpace) 
      arg1 = event.target.className
    else
      arg1 = event.target.className.slice(0,lenBeforeSpace);
    //console.log('arg1= ', arg1, 'this.myP.sortColumn = ', this.myP.sortColumn);
    
    if(arg1===this.myP.sortColumn) 
      this.myP.sortDirection = -this.myP.sortDirection
    else 
      this.myP.sortDirection = 1;
    this.myP.SortDataRows(arg1);    
    this.UpdateDataRows();
  }

  ChangeItemsPerPage = (event) => { // new value View on page:
    this.itemsPerPage = parseInt(event.target.value);
    this.myP.namesOnPage = this.itemsPerPage;
    this.RequestDataRows();
  }

  ChangeDataOffset = (event) => { // new value entered to Offset field component (onBlur)
    const newDataOffset = parseInt(event.target.value);
    if(!isNaN(newDataOffset))
      this.pkdxDataOffset = newDataOffset
    else
      console.log('NAN')
  }

  SetDataOffset = (event) => {  // button [Set] clicked
    this.myP.dataOffset = this.pkdxDataOffset;
    this.RequestDataRows();
  }

  ChangeFilter = (event) => {    
    this.filterRow = event.target.value.toLowerCase();    // all data in lowercase    
    this.UpdateDataRows();
  }
  FilterDataRows() {    
    if(this.filterRow === undefined || this.filterRow === '')
      return this.myP.dataRows
    else {
      return (
        this.myP.dataRows.filter( ({name}) => {          
          if(typeof name === 'string') // is column exist
            return !(name.indexOf(this.filterRow)===-1) // filter rows 
          else 
            return false;          
        })
      )
    }    
  }

  RequestDataRows() { // request data from Pokedex
    this.myP.Initialize().then( () => {            
      this.myP.FillDataRows().then(() => {        
        this.pkdxTotal = this.myP.total;
        this.UpdateDataRows();        
      })      
    });
  }

  UpdateDataRows() {  // put data to Observable
    this.arrData.replace(this.FilterDataRows().slice(0, this.myP.namesOnPage));
  }
}

Store = decorate(Store, {
  arrData: observable,
  introScreen: observable
});

export default new Store();
