import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEditorTrue, removeExpense } from '../redux/actions';
import editIcon from '../images/editar.png';
import deleteIcon from '../images/excluir.png';

class Table extends Component {
  render() {
    const { dispatch, expenses } = this.props;
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(
                    expense.value * expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    className="edit-button"
                    type="submit"
                    data-testid="edit-btn"
                    onClick={ () => dispatch(setEditorTrue(expense.id)) }
                  >
                    <img src={ editIcon } alt="Botão Editar" />
                  </button>
                  <button
                    className="delete-button"
                    type="submit"
                    data-testid="delete-btn"
                    onClick={ () => dispatch(
                      removeExpense(expenses.filter(({ id }) => id !== expense.id)),
                    ) }
                  >
                    <img src={ deleteIcon } alt="Botão Excluir" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Table);
