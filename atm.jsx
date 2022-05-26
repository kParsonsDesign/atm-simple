const ATMDeposit = ({ onChange, transactionType }) => {
  if (transactionType) {
    return (
      <div className='container text-center w-75'>
        <label className='label my-3 fs-3' htmlFor='deposit'>
          {transactionType}: <br />
        </label>
        <div className='input-group'>
          <input
            type='number'
            onChange={onChange}
            className='form-control'
            id='transaction-amount'
            step='20'
            min='0'
            placeholder='Type $ amount'
          ></input>
          <input type='submit' value='Submit' className='btn btn-success px-2'></input>
        </div>
      </div>
    );
  }
};

const TransactionType = ({ onClick }) => {
  return (
    <div className='container text-center'>
      <button
        type='button'
        className='btn btn-primary btn-lg m-3 p-3 px-4'
        onClick={onClick}
        value='Deposit'
        id='deposit'
      >
        Deposit
      </button>
      <button
        type='button'
        className='btn btn-primary btn-lg m-3 p-3 px-4'
        onClick={onClick}
        value='Withdraw'
        id='withdraw'
      >
        Withdrawal
      </button>
      <br />
    </div>
  );
};

// Keep accountState and update
const ATM = () => {
  const [accountTotal, setAccountTotal] = React.useState(0);
  const [transactionAmount, setTransactionAmount] = React.useState(0);
  const [transactionType, setTransactionType] = React.useState('');
  console.log('Account Rendered');
  console.log(transactionType);

  console.log(accountTotal);

  const handleChange = (e) => {
    console.log(`handleChange ${e.target.value}`);
    console.log(transactionAmount);
    setTransactionAmount(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    transactionAmount === 0
      ? alert(`No value submitted.`)
      : alert(
          `Transaction Submitted: ${transactionType} $${transactionAmount}`
        );

    // check for sufficient funds for withdrawal
    if (
      transactionType === 'Withdraw' &&
      accountTotal - transactionAmount < 0
    ) {
      alert(`Insufficient funds for transaction`);
      return;
    }

    // if Withdrawing and transactionAmount doesn't cause overddraft
    if (
      transactionType === 'Withdraw' &&
      accountTotal - transactionAmount >= 0
    ) {
      setAccountTotal(Number(accountTotal) - Number(transactionAmount));
      return;
    }

    // else deposit amount
    setAccountTotal(Number(accountTotal) + Number(transactionAmount));
  };

  const handleTransactionType = (e) => {
    setTransactionType(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='container'>
      <div className='row'>
        <h2 className='col align-self-center p-3 m-2 bg-info rounded'>
          Account Balance: $ {accountTotal}
        </h2>
      </div>
      <h3 className='text-center mt-5 mb-3'>Select Transaction Type:</h3>
      <TransactionType onClick={handleTransactionType} />
      <ATMDeposit
        onChange={handleChange}
        transactionType={transactionType}
      ></ATMDeposit>
    </form>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ATM />);
