import React, { useEffect, useState } from "react";
import "./BillingForm.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function BillForm() {
  const [items, setItems] = useState([
    { sr: 1, particular: "", qty: 0, rate: 0, amount: 0 },
  ]);
  const [billNo, setBillNo] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "qty" || field === "rate") {
      newItems[index].amount = newItems[index].qty * newItems[index].rate;
    }
    setItems(newItems);
  };

  const addRow = () => {
    setItems([
      ...items,
      { sr: items.length + 1, particular: "", qty: 0, rate: 0, amount: 0 },
    ]);
  };

  const totalAmount = items.reduce((sum, row) => sum + row.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Bill Submitted Successfully!");
    setSubmitted(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // --- HEADER ---
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setLineWidth(1);
    doc.rect(5, 15, pageWidth - 10, pageHeight - 20);

    doc.setFontSize(18).setFont("helvetica", "bold").setTextColor(184, 40, 55);
    doc.text("MALGANGA ENTERPRISES", pageWidth / 2, 25, { align: "center" });

    doc.setFontSize(12).setTextColor(46, 117, 182);
    doc.text("RMC CONCRET PUMP SERVICE", pageWidth / 2, 32, { align: "center" });

    doc.setTextColor(91, 155, 213);
    doc.text(
      "Room No. 301, Shubham Apartment, Baap Goan, Thane Bhiwandi",
      pageWidth / 2,
      39,
      { align: "center" }
    );

    doc.setTextColor(51, 51, 51);
    doc.text("Mob: 8291358469 / 8788284288", pageWidth / 2, 46, {
      align: "center",
    });

    // --- BILL DETAILS ---
    doc.setFontSize(12).setTextColor(0, 0, 0);
    doc.text(`Bill No: ${billNo}`, 14, 60);
    doc.text(`Date: ${date}`, pageWidth - 60, 60);
    doc.text(`Customer Name: ${name}`, 14, 68);

    // --- TABLE ---
    const tableColumn = ["Sr.", "Particular", "Qty", "Rate", "Amount"];
    const tableRows = items.map((item) => [
      item.sr,
      item.particular,
      item.qty,
      item.rate,
      item.amount,
    ]);

    autoTable(doc, {
      startY: 75,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { cellPadding: 3 },
    });

    const finalY = doc.lastAutoTable?.finalY || 75;

    // --- TOTAL ---
    const totalX = pageWidth - 50;
    const totalY = finalY + 10;
    doc.setTextColor(41, 128, 185).text("Total: ", totalX, totalY);
    doc.setTextColor(0, 0, 0).text(
      `${totalAmount}`,
      totalX + doc.getTextWidth("Total: "),
      totalY
    );

    // --- AMOUNT IN WORDS ---
    function numberToWordsIndian(num) {
      const a = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ];
      const b = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ];

      function inWords(num) {
        if ((num = num.toString()).length > 9) return "Overflow";
        let n = ("000000000" + num)
          .substr(-9)
          .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return "";
        let str = "";
        str += n[1] !== "00" ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore " : "";
        str += n[2] !== "00" ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh " : "";
        str += n[3] !== "00" ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand " : "";
        str += n[4] !== "0" ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " Hundred " : "";
        str += n[5] !== "00"
          ? (str !== "" ? "and " : "") +
            (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
            " "
          : "";
        return str.trim() + " Only";
      }
      return inWords(num);
    }

    doc.setTextColor(41, 128, 185).text("Amount in words: ", 14, finalY + 20);
    doc.setTextColor(0, 0, 0).text(
      numberToWordsIndian(totalAmount),
      14 + doc.getTextWidth("Amount in words: "),
      finalY + 20
    );

    // --- FOOTER ---
    doc.setFontSize(9).setTextColor(0, 0, 0);
    const footerText = [
      "MALGANGA ENTERPRISES",
      "RMC CONCRET PUMP SERVICE",
      "Room No. 301, Shubham Apartment, Baap Goan, Thane Bhiwandi",
      "Mob: 8291358469 / 8788284288",
    ];
    let textStartX = 14;
    let textStartY = pageHeight - 30;
    footerText.forEach((line, i) => {
      doc.text(line, textStartX, textStartY + i * 6);
    });

    // --- SIGNATURE IMAGE ---
    const footerWidth = 50;
    const footerHeight = 20;
    const footerX = pageWidth - footerWidth - 14;
    const footerY = pageHeight - footerHeight - 20;

    const logo = new Image();
    logo.crossOrigin = "anonymous";
    logo.src = `${process.env.PUBLIC_URL}/signature.png`;

    logo.onload = () => {
      doc.addImage(logo, "PNG", footerX, footerY, footerWidth, footerHeight);

      const text = "Prachi Datta Bhalerao";
      const textWidth = doc.getTextWidth(text);
      const textX = footerX + footerWidth / 2 - textWidth / 2;
      const textY = footerY + footerHeight + 8;
      doc.text(text, textX, textY);

      // Save after image loads
      doc.save(`Bill_${billNo || "bill"}.pdf`);
    };

    logo.onerror = () => {
      doc.setFontSize(10).setTextColor(200, 0, 0);
      doc.text("Signature image failed to load.", footerX, footerY - 4);
      doc.save(`Bill_${billNo || "bill"}.pdf`);
    };
  }; // ✅ closing generatePDF

  return (
    <div className="billing-container">
      <form className="billing-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <div>
            <label>Bill No: </label>
            <input type="text" value={billNo} onChange={(e) => setBillNo(e.target.value)} required/>
            <label>Name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Date: </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>

        <table className="billing-table">
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
              <tr key={index}>
                <td>{row.sr}</td>
                <td>
                  <input
                    type="text"
                    value={row.particular}
                    onChange={(e) => handleChange(index, "particular", e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleChange(index, "qty", parseInt(e.target.value) || 0)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.rate}
                    onChange={(e) => handleChange(index, "rate", parseInt(e.target.value) || 0)}
                    required
                  />
                </td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" onClick={addRow} className="add-btn">
          + Add Row
        </button>

        <div className="total-box">
          <h3>Total: {totalAmount}</h3>
        </div>

        <div className="submit-box">
          <button type="submit" className="submit-btn">Submit Bill</button>
          <br />
          {submitted && (
            <button type="button" onClick={generatePDF} className="download-btn">
              Download PDF
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BillForm;
//Tejas Dalavi