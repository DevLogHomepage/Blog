import React, { ReactPropTypes } from 'react'


const Contact = React.lazy(() => import('./contact'));
const LazyContact = (props) => (
  <React.Suspense fallback={'<p>Loading...</p>'}>
    <Contact {...props} />
  </React.Suspense>
);

export default LazyContact