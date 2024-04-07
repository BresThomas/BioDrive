import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { BlogView } from '../sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {

  return (
      <>
        <Helmet>
          <title>Blog </title>
        </Helmet>

        <BlogView />
      </>
  );
}
