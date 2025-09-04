import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import numberToWords from "number-to-words";


function BillPreview({ billData }) {
    const totalAmount = billData.items.reduce((acc, item) => acc + item.amount, 0);

    const generatePDF = () => {
        const doc = new jsPDF();

        const amountInWords = numberToWords.toWords(totalAmount);
        const formattedAmountInWords =
            amountInWords.charAt(0).toUpperCase() + amountInWords.slice(1) + " only";


        // Header
        doc.setFontSize(16);
        doc.text("MALGANGA ENTERPRISES", 70, 10);
        doc.setFontSize(10);
        doc.text("RMC CONCRET PUMP SERVICE", 80, 15);
        doc.text("Room No. 301, Shubham Apartment, Baap Goan, Thane Bhiwandi", 40, 20);
        doc.text("Mob: 8291358469 / 8788284288", 75, 25);

        // Bill details
        doc.setFontSize(12);
        doc.text(`Bill No: ${billData.billNo}`, 10, 35);
        doc.text(`Date: ${billData.date}`, 150, 35);
        doc.text(`Name: ${billData.name}`, 10, 42);

        // Table
        const tableData = billData.items.map((row) => [
            row.sr,
            row.particular,
            row.qty,
            row.rate,
            row.amount,
        ]);

        autoTable(doc, {
            head: [["Sr. No", "Particular", "Qty", "Rate", "Amount"]],
            body: tableData,
            startY: 50,
        });

        // Total
        doc.text(
            `Total Amount: ${totalAmount}`,
            150,
            doc.lastAutoTable.finalY + 10
        );
        doc.text(
            `Rupees: ${formattedAmountInWords}`,
            10,
            doc.lastAutoTable.finalY + 20
        );

        // Footer
        doc.setFontSize(10);
        doc.text("For PRACHI DATTA BHALERAO", 150, 280);
        doc.text("Proprietor", 170, 285);

        // Save
        doc.save("bill.pdf");
    };

    return (
        <div className="bill-preview">
            <h2>Bill Preview</h2>
            <p>Bill No: {billData.billNo}</p>
            <p>Date: {billData.date}</p>
            <p>Name: {billData.name}</p>

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
                    {billData.items.map((row, index) => (
                        <tr key={index}>
                            <td>{row.sr}</td>
                            <td>{row.particular}</td>
                            <td>{row.qty}</td>
                            <td>{row.rate}</td>
                            <td>{row.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Total: {totalAmount}</h3>
            <button className="download-btn" onClick={generatePDF}>
                Download PDF
            </button>
        </div>
    );
}

export default BillPreview;
