import React from 'react';

const Header = ({ store }) => {

  return (    
    <div className='Header'>        
      <div className="hSearch">
        <label htmlFor="sExpression">Search:</label>
        <input type="text" className="input-text" id="sExpression" onChange={store.ChangeFilter.bind()} />
      </div>
      <div className="hItemsPerPage">
        <label htmlFor="nItemsPerPage" id='lItemsPerPage'>View on page:</label>
        <select id="nItemsPerPage" defaultValue={store.itemsPerPage} onChange={store.ChangeItemsPerPage.bind()}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>                    
        </select>
      </div>
      <div className="hOffset">
        <label htmlFor="nOffset" id="lOffset">Offset</label>
        <input type="text" defaultValue='0' pattern='[0-9]^.{1,3}$' className="input-text" id="nOffset" onBlur={store.ChangeDataOffset.bind()} />
        <button className='bSetOffset' id="bOffset" onClick={store.SetDataOffset.bind()}>Set</button>                
      </div>        
    </div>
  );
};

export default Header;