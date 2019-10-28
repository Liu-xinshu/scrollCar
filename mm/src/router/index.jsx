import React from 'react';
import {BrowserRouter}from 'react-router-dom';
import RouterView from '@/router/routerView';
import routes from '@/router/routerConfig';

function RouterRoot(){
    return <BrowserRouter>
        <RouterView routes={routes}/>
    </BrowserRouter>
}

export default RouterRoot;