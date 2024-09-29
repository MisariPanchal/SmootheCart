import React from 'react';
import UserHeader from './UserHeader';
import UserCategory from './UserCategory';
import UserProducts from './UserProducts';

export default function UserPage() {

  return (
    <div>
      <UserHeader />
      <UserCategory />
      <UserProducts />
    </div>
  );
}
