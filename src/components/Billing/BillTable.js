import React from "react";
import BillRow from "./BillRow";

function BillTable({ items, onItemsChange }) {
  const handleRowChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "qty" || field === "rate") {
      const qty = parseFloat(updatedItems[index].qty) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].amount = qty * rate;
    }

    onItemsChange(updatedItems);
  };

  const addRow = () => {
    const newRow = {
      sr: items.length + 1,
      particular: "",
      qty: 0,
      rate: 0,
      amount: 0,
    };
    onItemsChange([...items, newRow]);
  };

  const totalAmount = items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Particular</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, index) => (
            <BillRow
              key={index}
              row={row}
              index={index}
              onRowChange={handleRowChange}
            />
          ))}
        </tbody>
      </table>
      <button className="add-btn" onClick={addRow}>+ Add Row</button>
      <h3 className="total">Total: {totalAmount}</h3>
    </div>
  );
}

export default BillTable;
