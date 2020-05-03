import React from 'react';

import BienesTable from './BienesTable';
import BienesDialog from './BienesDialog';
  
export default function Menu(){
    return(
        <div>
            <BienesTable/>
            <BienesDialog/>
        </div>
    );
}
