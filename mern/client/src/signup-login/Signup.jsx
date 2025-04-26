import React from 'react';
import Login from '@react-login-page/page2';
import defaultBannerImage from '@react-login-page/page2/banner-image';

const css = {
    '--login-bg': 'linear-gradient(-135deg,#c850c0,#4158d0)',
    '--login-color': '#333',
    '--login-inner-bg': '#fff',
    '--login-input': '#57b846',
    '--login-input-bg': '#e6e6e6',
    '--login-input-placeholder': '#999999',
    '--login-btn': '#fff',
    '--login-btn-bg': '#57b846',
    '--login-btn-bg-focus': '#57b846',
    '--login-btn-bg-hover': '#333',
    '--login-btn-bg-active': '#57b846',
  };

const Demo = () => (
  <Login style={{ height: 580, ...css }}>
    <Login.Banner>
      <img src={defaultBannerImage} />
    </Login.Banner>
    <Login.Password>
      <div>xx</div>
    </Login.Password>
  </Login>
);

export default Demo;