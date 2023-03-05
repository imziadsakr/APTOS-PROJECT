import * as React from 'react';

import { 
    DashboardMain, 
} from './styled/Dashboard.styled';

import NFTTable from 'src/components/Dashboard/NFTTable';
import NFTSlide from 'src/components/Dashboard/NFTSlide';

const Dashboard = (props) => {

    return (
        <DashboardMain>
            <NFTSlide />
            <NFTTable />            
        </DashboardMain>
    )
}

export default Dashboard;