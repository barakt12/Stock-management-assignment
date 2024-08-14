import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../assets/icons/tdp_icon.jpg'

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="header">
      <div className="logo">
        <img src={ Logo }
             alt='Logo' />
      </div>
    </Header>
  );
};

export default AppHeader;