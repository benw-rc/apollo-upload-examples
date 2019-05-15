/** @module */
import _ from 'lodash';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Component from '../Component';
import { Table as BaseTable } from 'semantic-ui-react';

import './Table.scss';

/**
 * Table component wraps semantic ui table, and simplifies the definition process.
 *
 * @param {JSX[]} headers - list of headers
 * @param {JSX[]} data - list of lists.  each row is included as a list of elements
 * @param {boolean} [sortable=false] - are the rows sortable by column?
 * @param {Number[]} [widths] - optional list of column widths
 */
export class Table extends Component {
  state = {
    column: null,
    direction: null,
  };
  sorted_data = () => {
    const { column, direction } = this.state;
    const { data } = this.props;
    const by_column = _.sortBy(data, column);
    return direction === 'ascending' ? by_column : by_column.reverse();
  }
  handle_sort = clicked => () => {
    const { column, direction } = this.state;
    if (column !== clicked) {
      this.setState({
        column: clicked,
        direction: 'ascending',
      });
      return;
    }
    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }
  header_cell = (header, index) => {
    const { widths, sortable } = this.props;
    const params = {
      key: index
    };
    if (widths !== undefined) {
      params.width = widths[index];
    }
    if (sortable) {
      const { column, direction } = this.state;
      params.sorted = column === index ? direction : null;
      params.onClick = this.handle_sort(index);
    }
    return (
      <BaseTable.HeaderCell {...params}>
        {header}
      </BaseTable.HeaderCell>
    );
  };
  render() {
    const {
      className,
      headers,
      sortable,
    } = this.props;
    const data = sortable ? this.sorted_data() : this.props.data;

    return (
      <BaseTable
        inverted
        className={classNames("argus-table", className)}
        sortable={sortable}
      >
        <BaseTable.Header>
          <BaseTable.Row>
            { headers.map(this.header_cell) }
          </BaseTable.Row>
        </BaseTable.Header>
        <BaseTable.Body>
          { data.map((row, row_n) =>
            <BaseTable.Row key={row_n}>
              { row.map((item, item_n) =>
                <BaseTable.Cell verticalAlign="middle" key={item_n}>{item}</BaseTable.Cell>
              ) }
            </BaseTable.Row>
          ) }
        </BaseTable.Body>
      </BaseTable>
    );
  }
}
Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  widths: PropTypes.arrayOf(PropTypes.number),
  sortable: PropTypes.bool,
};

Table.defaultProps = {
  headers: [],
  data: [],
};

export default Table;
