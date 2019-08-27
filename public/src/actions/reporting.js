'use strict';

import { createAction } from 'mylife-tools-ui';
import { actionTypes } from '../constants';
import { getViewId } from '../selectors/reporting';
import { createOrUpdateView, deleteView } from './tools';

const local = {
  setView: createAction(actionTypes.REPORTING_SET_VIEW),
};

export const getGroupByMonth = (criteria) => createOrUpdateView({
  criteriaSelector: () => criteria,
  viewSelector: getViewId,
  setViewAction: local.setView,
  service: 'reporting',
  method: 'notifyGroupByMonth'
});

export const getGroupByYear = (criteria) => createOrUpdateView({
  criteriaSelector: () => criteria,
  viewSelector: getViewId,
  setViewAction: local.setView,
  service: 'reporting',
  method: 'notifyGroupByYear'
});

const clearReportingView = () => deleteView({
  viewSelector: getViewId,
  setViewAction: local.setView
});

export const reportingLeave = () => async (dispatch) => {
  await dispatch(clearReportingView());
};

export const exportGroupByMonth = (criteria, display) => async (dispatch, getState) => {
  console.log('export', criteria, display);
};

export const exportGroupByYear = (criteria, display) => async (dispatch, getState) => {
  console.log('export', criteria, display);
};
