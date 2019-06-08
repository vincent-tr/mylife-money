'use strict';

import { handleActions, routing } from 'mylife-tools-ui';
import { actionTypes } from '../constants';
import { immutable } from 'mylife-tools-ui';

export default handleActions({

  [actionTypes.REPORTING_GET_OPERATIONS] : {
    next : (state, action) => ({
      ...state,
      operations: state.operations.withMutations(map => {
        map.clear();
        for(const raw of action.payload) {
          const { _id: id, date, ...props } = raw;
          const operation = Object.assign({ id, date: Date.parse(date) }, props);
          map.set(id, operation);
        }
      }),
    })
  },

  [routing.actionTypes.LOCATION_CHANGE] : {
    next : (state) => ({
      ...state,
      operations: state.operations.clear(),
    })
  },

}, {
  operations : new immutable.Map()
});
