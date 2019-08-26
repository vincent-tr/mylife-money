'use strict';

import { React, PropTypes, mui } from 'mylife-tools-ui';
import YearSelectorButton from './year-selector-button';

const useStyles = mui.makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
  },
  button: {
  }
});

const DateSelector = ({ onChange, value, showYearSelector, selectLastDay, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.container} {...props}>
      <mui.DatePicker className={classes.input} value={value} onChange={onChange} clearable autoOk format='dd/MM/yyyy' />
      {showYearSelector && (<YearSelectorButton className={classes.button} value={value} onChange={onChange} selectLastDay={selectLastDay} />)}
    </div>
  );
};

DateSelector.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  showYearSelector: PropTypes.bool,
  selectLastDay: PropTypes.bool
};

export default DateSelector;