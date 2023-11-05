import React from 'react';
import Layout from '../../../components/_app';
import Applications from '../../../components/admin/applications';

function Application() {
  const data = JSON.parse(window.localStorage.getItem('AuthDataUser'));

  return (
    <Layout>
      <Applications />
    </Layout>
  );
}

export default Application;
