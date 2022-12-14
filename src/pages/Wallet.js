import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div className="header-wallet-form-container">
          <Header />
          <WalletForm />
        </div>
        <div className="table-component-container">
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
