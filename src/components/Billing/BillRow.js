import React from "react";

function BillRow({ row, index, onRowChange }) {
  return (
    <tr>
      <td>{row.sr}</td>
      <td>
        <input
          type="text"
          value={row.particular}
          onChange={(e) => onRowChange(index, "particular", e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={row.qty}
          onChange={(e) => onRowChange(index, "qty", e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={row.rate}
          onChange={(e) => onRowChange(index, "rate", e.target.value)}
        />
      </td>
      <td>{row.amount}</td>
    </tr>
  );
}

export default BillRow;
