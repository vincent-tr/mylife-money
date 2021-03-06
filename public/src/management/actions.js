'use strict';

import { createAction, io, dialogs } from 'mylife-tools-ui';
import actionTypes from './action-types';
import { getCriteria, getSelectedGroupId, getSelectedOperations, getOperationIds, getOperationViewId, getOperationIdDetail } from './selectors';
import { createOrUpdateView, deleteView } from '../common/action-tools';

const local = {
  showSuccess: message => dialogs.notificationShow({ message, type: dialogs.notificationShow.types.success }),
  setOperationView: createAction(actionTypes.SET_OPERATION_VIEW),
  setCriteria: createAction(actionTypes.SET_CRITERIA),
  selectOperations: createAction(actionTypes.SELECT_OPERATIONS),
  setDetail: createAction(actionTypes.SET_DETAIL),
};

export const getOperations = () => createOrUpdateView({
  criteriaSelector: getCriteria,
  viewSelector: getOperationViewId,
  setViewAction: local.setOperationView,
  service: 'management',
  method: 'notifyOperations'
});

const clearOperations = () => deleteView({
  viewSelector: getOperationViewId,
  setViewAction: local.setOperationView
});

export const showDetail = operationId => local.setDetail(operationId);
export const closeDetail = () => local.setDetail(null);

export const managementEnter = getOperations;
export const managementLeave = () => async (dispatch) => {
  await dispatch(clearOperations());
  dispatch(closeDetail());
};

export const setMinDate = (value) => setCriteriaValue('minDate', value);
export const setMaxDate = (value) => setCriteriaValue('maxDate', value);
export const setAccount = (value) => setCriteriaValue('account', value);
export const setLookupText = (value) => setCriteriaValue('lookupText', value);

export const selectGroup = (value) => (dispatch) => {
  dispatch(setCriteriaValue('group', value));
  dispatch(closeDetail());
};

function setCriteriaValue(name, value) {
  return (dispatch, getState) => {
    const state = getState();
    const criteria = getCriteria(state);
    if(criteria[name] === value) {
      return;
    }

    dispatch(local.setCriteria({ [name]: value }));
    dispatch(getOperations());
  };
}

let groupIdCount = 0;

export const createGroup = () => {
  return async (dispatch, getState) => {
    const parentGroup = getSelectedGroupId(getState());
    const newGroup = {
      display: `group${++groupIdCount}`,
      parent: parentGroup
    };

    const id = await dispatch(io.call({
      service: 'management',
      method: 'createGroup',
      object: newGroup
    }));

    dispatch(selectGroup(id));
  };
};

export const deleteGroup = () => {
  return async (dispatch, getState) => {
    const id = getSelectedGroupId(getState());

    await dispatch(io.call({
      service: 'management',
      method: 'deleteGroup',
      id
    }));

    dispatch(selectGroup(null));
  };
};

export const updateGroup = (group) => {
  return async (dispatch) => {
    await dispatch(io.call({
      service: 'management',
      method: 'updateGroup',
      object: group
    }));
  };
};

export const moveOperations = (group) => {
  return async (dispatch, getState) => {
    const operations = getSelectedOperations(getState()).map(op => op._id);

    await dispatch(io.call({
      service: 'management',
      method: 'moveOperations',
      group,
      operations
    }));
  };
};

export const operationMoveDetail = (group) => {
  return async (dispatch, getState) => {
    const operations = [getOperationIdDetail(getState())];

    dispatch(closeDetail());
    await dispatch(io.call({
      service: 'management',
      method: 'moveOperations',
      group,
      operations
    }));
  };
};

export const operationsSetNote = (note) => {
  return async (dispatch, getState) => {
    const operations = getSelectedOperations(getState()).map(op => op._id);

    await dispatch(io.call({
      service: 'management',
      method: 'operationsSetNote',
      note,
      operations
    }));
  };
};

export const operationSetNoteDetail = (note) => {
  return async (dispatch, getState) => {
    const operations = [getOperationIdDetail(getState())];

    await dispatch(io.call({
      service: 'management',
      method: 'operationsSetNote',
      note,
      operations
    }));
  };
};

export const selectOperation = ({ id, selected }) => {
  return (dispatch, getState) => {
    if(id) {
      dispatch(local.selectOperations({ id, selected }));
      return;
    }

    // we are selecting/unselecting all
    if(!selected) {
      dispatch(local.selectOperations({ ids: [] }));
      return;
    }

    const state = getState();
    const ids = getOperationIds(state);
    dispatch(local.selectOperations({ ids }));
  };
};

export const importOperations = (account, file) => {
  return async (dispatch) => {
    const content = await readFile(file);

    const count = await dispatch(io.call({
      service: 'management',
      method: 'operationsImport',
      account,
      content
    }));

    dispatch(local.showSuccess(`${count} operation(s) importée(s)`));
  };
};

export const operationsExecuteRules = () => {
  return async (dispatch) => {
    const count = await dispatch(io.call({
      service: 'management',
      method: 'operationsExecuteRules'
    }));

    dispatch(local.showSuccess(`${count} operation(s) déplacée(s)`));
  };
};

async function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const err = reader.error;
      if(err) { return reject(err); }
      resolve(reader.result);
    };

    reader.readAsText(file);
  });
}
