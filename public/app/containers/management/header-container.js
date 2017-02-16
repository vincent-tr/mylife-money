'use strict';

import { connect } from 'react-redux';
import { setMinDate, setMaxDate, setAccount, importOperations, operationsExecuteRules } from '../../actions/management';
import { getSelectedOperations, getSelectedGroupId } from '../../selectors/management';
import { getAccounts } from '../../selectors/accounts';
import { makeGetSortedChildren } from '../../selectors/groups';

import Header from '../../components/management/header';

const mapStateToProps = () => {
  const getSortedChildren = makeGetSortedChildren();
  return (state) => ({
    showExecuteRules : !getSelectedGroupId(state),
    canMove          : !!getSelectedOperations(state).length,
    accounts         : getAccounts(state),
    rootGroups       : getSortedChildren(state, {}),
    minDate          : state.management.minDate,
    maxDate          : state.management.maxDate,
    account          : state.management.account
  });
};

const mapDispatchToProps = (dispatch) => ({
  onMinDateChanged         : (value) => dispatch(setMinDate(value)),
  onMaxDateChanged         : (value) => dispatch(setMaxDate(value)),
  onAccountChanged         : (value) => dispatch(setAccount(value)),
  onOperationsImport       : (account, file) => dispatch(importOperations(account, file)),
  onOperationsExecuteRules : () => dispatch(operationsExecuteRules())
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
