'use strict';

import request from 'superagent';
import { actionTypes } from '../constants/index';
import {
  getAccounts,
  getGroups, createGroup, updateGroup, deleteGroup,
  managementGetOperations
} from '../actions/service-actions';

const dataService = (/*store*/) => next => action => {
  next(action);

  switch (action.type) {
    case actionTypes.QUERY_ACCOUNTS:
      request
        .get('/api/accounts')
        .end((err, res) => {
          if (err) {
            return next(getAccounts(new Error(JSON.parse(res.text))));
          }
          const data = JSON.parse(res.text);
          return next(getAccounts(data));
        });
      break;

    case actionTypes.QUERY_GROUPS:
      request
        .get('/api/groups')
        .end((err, res) => {
          if (err) {
            return next(getGroups(new Error(JSON.parse(res.text))));
          }
          const data = JSON.parse(res.text);
          return next(getGroups(data));
        });
      break;

    case actionTypes.QUERY_CREATE_GROUP:
      request
        .put('/api/group')
        .send(action.payload)
        .end((err, res) => {
          if (err) {
            return next(createGroup(new Error(JSON.parse(res.text))));
          }
          const data = JSON.parse(res.text);
          return next(createGroup(data));
        });
      break;

    case actionTypes.QUERY_UPDATE_GROUP:
      request
        .post('/api/group')
        .send(action.payload)
        .end((err, res) => {
          if (err) {
            return next(updateGroup(new Error(JSON.parse(res.text))));
          }
          const data = JSON.parse(res.text);
          return next(updateGroup(data));
        });
      break;

    case actionTypes.QUERY_DELETE_GROUP:
      request
        .delete('/api/group')
        .send({ id: action.payload })
        .end((err, res) => {
          if (err) {
            return next(deleteGroup(new Error(JSON.parse(res.text))));
          }
          return next(deleteGroup(action.payload));
        });
      break;

    case actionTypes.MANAGEMENT_QUERY_OPERATIONS:
      request
        .get('/api/operations')
        .query(action.payload)
        .end((err, res) => {
          if (err) {
            return next(getOperations(new Error(JSON.parse(res.text))));
          }
          const data = JSON.parse(res.text);
          return next(managementGetOperations(data));
        });
      break;
  }
};

export default dataService;