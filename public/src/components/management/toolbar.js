'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import * as mui from 'material-ui';
import icons from '../icons';
import base from '../base/index';
import groupEditor from './group-editor';

const styles = {
  icon: {
    margin: 16,
  },
  button: {
    height: '56px',
    width: '56px',
    overflow: 'inherit'
  }
};

const Toolbar = ({ group, onGroupCreate, onGroupEdit, onGroupDelete, canChange }) => (
  <mui.Toolbar>
    <mui.ToolbarGroup>

      <mui.IconButton tooltip="Créer un groupe enfant"
                      tooltipPosition="top-right"
                      onClick={onGroupCreate}
                      style={styles.button}>
        <icons.actions.New />
      </mui.IconButton>

      <mui.IconButton tooltip="Editer le groupe"
                      tooltipPosition="top-right"
                      onClick={() => groupEditor(group, (err, group) => onGroupEdit(group))}
                      disabled={!canChange}
                      style={styles.button}>
        <icons.actions.Edit />
      </mui.IconButton>

      <mui.IconButton tooltip="Supprimer le groupe"
                      tooltipPosition="top-right"
                      onClick={() => base.confirm({ lines: ['Supprimer le groupe ?'], proceed: onGroupDelete })}
                      disabled={!canChange}
                      style={styles.button}>
        <icons.actions.Delete />
      </mui.IconButton>

    </mui.ToolbarGroup>
  </mui.Toolbar>
);

Toolbar.propTypes = {
  group         : PropTypes.object,
  onGroupCreate : PropTypes.func.isRequired,
  onGroupEdit   : PropTypes.func.isRequired,
  onGroupDelete : PropTypes.func.isRequired,
  canChange     : PropTypes.bool.isRequired
};

export default Toolbar;