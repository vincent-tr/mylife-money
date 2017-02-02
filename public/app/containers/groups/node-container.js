'use strict';

import { connect } from 'react-redux';
import { makeGetSortedChildren, getSelectedGroupId } from '../../selectors/groups';
import { selectGroup } from '../../actions/index';

import Node from '../../components/groups/node';

const mapStateToProps = () => {
  const getSortedChildren = makeGetSortedChildren();
  return (state, props) => ({
    selected : getSelectedGroupId(state) === props.group.id,
    children : getSortedChildren(state, props)
  });
};


const mapDispatchToProps = (dispatch, props) => ({
  onSelect : () => dispatch(selectGroup(props.group.id)),
});

const NodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Node);

export default NodeContainer;
