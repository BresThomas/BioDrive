
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { GerantView } from '../sections/gerant';

function GerantPage(){
    return (
        <>
        <Helmet>
            <title>Gerant | Page principale</title>
        </Helmet>
        <GerantView />
        </>
    );};
export default GerantPage;