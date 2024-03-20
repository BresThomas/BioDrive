import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {

  return (
      <>
        <Helmet>
          <title>Dashboard </title>
        </Helmet>

        <AppView />
      </>
  );
}
