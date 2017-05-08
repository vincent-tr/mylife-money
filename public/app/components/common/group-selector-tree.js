'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import * as mui from 'material-ui';
import tabStyles from '../base/tab-styles';

import GroupSelectorNodeContainer from '../../containers/common/group-selector-node-container';

const GroupSelectorTree = ({ groups, onSelect }) => (
  <mui.List style={tabStyles.scrollable}>
    {groups.map((group) => (<GroupSelectorNodeContainer key={group.id} group={group} level={0} onSelect={onSelect} />))}
  </mui.List>
);

GroupSelectorTree.propTypes = {
  groups   : PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onSelect : PropTypes.func.isRequired
};

export default GroupSelectorTree;