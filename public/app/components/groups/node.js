'use strict';

import React from 'react';
import * as mui from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as muiColorManipulator from 'material-ui/utils/colorManipulator';

import GroupNodeContainer from '../../containers/groups/node-container';

const getStyle = (muiTheme, selected) => {
  if(!selected) { return {}; }
  const textColor = muiTheme.palette.textColor;
  const backgroundColor = muiColorManipulator.fade(textColor, 0.2);
  return { backgroundColor };
};

const GroupNode = ({ muiTheme, selected, group, children, onSelect }) => (
  <mui.ListItem
    onTouchTap={onSelect}
    style={getStyle(muiTheme, selected)}
    primaryText={group.display}
    nestedItems={children.map((child) => (<GroupNodeContainer key={child.id} group={child} />))} />
);

GroupNode.propTypes = {
  muiTheme : React.PropTypes.object.isRequired,
  selected : React.PropTypes.bool.isRequired,
  group    : React.PropTypes.object.isRequired,
  children : React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired,
  onSelect : React.PropTypes.func.isRequired
};

export default muiThemeable()(GroupNode);