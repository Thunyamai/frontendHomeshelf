import React from 'react';
import ItemList from './ItemList';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-semibold">HomeShelf Dashboard</h1>
      <ItemList />
    </div>
  );
};

export default Dashboard;
