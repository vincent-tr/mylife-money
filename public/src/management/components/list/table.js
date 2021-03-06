'use strict';

import { React, mui, VirtualizedTable, useScreenPhone } from 'mylife-tools-ui';
import { useConnect, useStyles } from './table-behaviors';

const Table = (props) => {
  const { onSelect, onDetail, operations } = useConnect();
  const classes = useStyles();
  const isPhone = useScreenPhone();
  const rowClassName = (row) => row && row.fromChildGroup ? classes.fromChild : classes.normal; // row undefined => header

  const selectedCount = operations.reduce(((acc, op) => op.selected ? acc + 1 : acc), 0);

  const headerCheckbox = (
    <mui.Checkbox
      color='primary'
      indeterminate={selectedCount > 0 && selectedCount < operations.length}
      checked={selectedCount === operations.length}
      onChange={e => onSelect({ selected: e.target.checked })}/>
  );


  const cellCheckbox = (row) => (
    <mui.Checkbox
      color='primary'
      checked={row.selected}
      onChange={e => onSelect({ id: row.operation._id, selected: e.target.checked })}
      onClick={e => e.stopPropagation()}/>
  );

  const columns = [
    { dataKey: 'checkbox', width: isPhone ? 60 : 80, headerRenderer: headerCheckbox, cellDataGetter: ({ rowData }) => rowData, cellRenderer: cellCheckbox },
    //{ dataKey: 'account', width: 150, headerRenderer: 'Compte', cellDataGetter: ({ rowData }) => rowData.account && rowData.account.display },
    { dataKey: 'amount', width: 80, headerRenderer: 'Montant', cellDataGetter: ({ rowData }) => rowData.operation.amount, cellClassName: value => value < 0 ? classes.amountDebit : classes.amountCredit },
    { dataKey: 'date', width: 100, headerRenderer: 'Date', cellDataGetter: ({ rowData }) => new Date(rowData.operation.date).toLocaleDateString('fr-FR') }, // TODO: formatter
    { dataKey: 'label', headerRenderer: 'Libellé', cellDataGetter: ({ rowData }) => rowData.operation.label }
  ];
  if(!isPhone) {
    columns.push({ dataKey: 'note', headerRenderer: 'Note', cellDataGetter: ({ rowData }) => rowData.operation.note });
  }

  return (
    <VirtualizedTable data={operations} columns={columns} {...props} rowClassName={rowClassName} onRowClick={row => onDetail(row.operation._id)} />
  );
};

export default Table;
