import React, { useState } from 'react';

import MyProfileModule from '../../organisms/MyProfileModule/MyProfileModule.jsx';
import MySelectModule from '../../molecules/MySelectModule/MySelectModule.jsx';
import MyGridView from '../../organisms/MyGridView/MyGridView.jsx';

function MyPage() {
  const [select, setSelect] = useState(false);

  const handleSelect = () => {
    setSelect(!select);
  };
  return (
    <div>
      <MyProfileModule />
      <MySelectModule select={select} handleSelect={handleSelect} />
      <MyGridView />
    </div>
  );
}
export default MyPage;
