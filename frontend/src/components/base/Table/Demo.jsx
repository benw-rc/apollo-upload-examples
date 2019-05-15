import React from 'react';

import Table from './Table';

export const Demo = () => {
  const headers = ['Col 1', 'Col 2', 'Col 3'];
  const widths = [2, 2, 8];
  const data = [
    [ "A", "B", "C" ],
    [ "Do", "Re", "Mi"],
    [ "X", "Y", "Z" ],
  ];
  return (
    <div>
      <h3>basic</h3>
      <Table {...{data, headers}} />
      <h3>w/ designated widths (out of 16 for 100%)</h3>
      <Table {...{data, headers, widths}} />
      <h3>sortable</h3>
      <Table sortable {...{data, headers, widths}} />
    </div>
  );
}

export default Demo;
