'use strict';

import { io, createSelector } from 'mylife-tools-ui';

export const getOperationStatsViewId = (state) => state.home.stats;
export const getOperationStatsView = state => io.getView(state, getOperationStatsViewId(state));
export const getTotalByMonthViewId = (state) => state.home.totalByMonth;

const getTotalByMonthList = (state) => io.getViewList(state, getTotalByMonthViewId(state));

export const getSortedTotalByMonth = createSelector(
  [ getTotalByMonthList ],
  (items) => {
    const ret = Array.from(items);
    ret.sort((item1, item2) => item1.month < item2.month ? -1 : 1);
    return ret;
  }
);
