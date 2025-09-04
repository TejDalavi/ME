import React, { useEffect, useState } from "react";
import "./BillingForm.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";



function BillForm() {
  const defaultSignature = "/img/signature.png"; // ← ADD THIS
  const [signatureImage, setSignatureImage] = useState(defaultSignature);

  const [items, setItems] = useState([
    { sr: 1, particular: "", qty: 0, rate: 0, amount: 0 },
  ]);
  const [billNo, setBillNo] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [signature, setSignature] = useState("");
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
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

    // Auto-increment bill number
    // setBillNo((prev) => prev + 1);

    // Show download button
    setSubmitted(true);
  };

  // const handleSignatureUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setSignatureImage(reader.result); // Base64 string
  //   };
  //   if (file) reader.readAsDataURL(file);
  // };

  const generatePDF = () => {
    const doc = new jsPDF();

    // 📌 Page border with margin
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setLineWidth(1);
    doc.rect(5, 15, pageWidth - 10, pageHeight - 20);

    // 📌 Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(184, 40, 55);
    doc.text("MALGANGA ENTERPRISES", pageWidth / 2, 25, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(46, 117, 182);
    doc.text("RMC CONCRET PUMP SERVICE", pageWidth / 2, 32, { align: "center" });

    doc.setTextColor(91, 155, 213);
    doc.text(
      "Room No. 301, Shubham Apartment, Baap Goan, Thane Bhiwandi",
      pageWidth / 2,
      39,
      { align: "center" }
    );

    doc.setTextColor(51, 51, 51);
    doc.text("Mob: 8291358469 / 8788284288", pageWidth / 2, 46, { align: "center" });

    // 📌 Bill No, Date & Customer Name
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Bill No: ${billNo}`, 14, 60);
    doc.text(`Date: ${date}`, pageWidth - 60, 60);
    doc.text(`Customer Name: ${name}`, 14, 68);

    // 📌 Table
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

    // 📌 Total
    const totalX = pageWidth - 50;
    const totalY = finalY + 10;
    doc.setTextColor(41, 128, 185);
    doc.text("Total: ", totalX, totalY);
    doc.setTextColor(0, 0, 0);
    doc.text(`${totalAmount}`, totalX + doc.getTextWidth("Total: "), totalY);

    // 📌 Amount in words
    // const x = 14;
    // const y = finalY + 20;
    // doc.setTextColor(41, 128, 185);
    // doc.text("Amount in words: ", x, y);
    // doc.setTextColor(0, 0, 0);
    // doc.text(
    //   numberToWords(totalAmount),
    //   x + doc.getTextWidth("Amount in words: "),
    //   y
    // );
const x = 14;
const y = finalY + 20;

function numberToWordsIndian(num) {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return "Overflow";
    let n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return "";
    let str = "";
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore " : "";
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh " : "";
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand " : "";
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " Hundred " : "";
    str += (n[5] != 0) ? ((str != "") ? "and " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) + " " : "";
    return str.trim() + " Only";
  }
  return inWords(num);
}

doc.setTextColor(41, 128, 185);
doc.text("Amount in words: ", x, y);
doc.setTextColor(0, 0, 0);
doc.text(
  numberToWordsIndian(totalAmount),
  x + doc.getTextWidth("Amount in words: "),
  y
);

    // ==============================
    // 📌 Signature (Left side)
    // ==============================
    // ==============================
    // 📌 Signature (Left side - ONLY image now)
    // ==============================
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);

    const footerText = [
      "MALGANGA ENTERPRISES",
      "RMC CONCRET PUMP SERVICE",
      "Room No. 301, Shubham Apartment, Baap Goan, Thane Bhiwandi",
      "Mob: 8291358469 / 8788284288"
    ];

    let textStartX = 14;                         // left margin
    let textStartY = pageHeight - 30;            // adjust Y as needed
    footerText.forEach((line, i) => {
      doc.text(line, textStartX, textStartY + (i * 6));
    });

    // ==============================
    // 📌 Footer Image + Company Name + Signature text (Right side)
    // ==============================
    const footerImg = "/img/signature.png"; // <-- your footer image path
    const footerWidth = 50;
    const footerHeight = 20;
    const footerX = pageWidth - footerWidth - 14;
    const footerY = pageHeight - footerHeight - 20;

    // Footer image
    doc.addImage(footerImg, "PNG", footerX, footerY, footerWidth, footerHeight);

    // Footer labels
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    // Company name

    // Signature text below company name
    const text = "Prachi Datta Bhalerao";
    const textWidth = doc.getTextWidth(text);
    const textX = footerX + (footerWidth / 2) - (textWidth / 2);
    const textY = footerY + footerHeight + 8;

    doc.text(text, textX, textY);

    // 📌 Save PDF
    // doc.save(`Bill_${billNo}.pdf`);
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bill.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };



  const numberToWords = (num) => {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (num === 0) return "Zero";

    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
      if (n < 1000) return a[Math.floor(n / 100)] + " Hundred " + inWords(n % 100);
      if (n < 1000000) return inWords(Math.floor(n / 1000)) + " Thousand " + inWords(n % 1000);
      return "";
    };

    return inWords(num) + " Only";
  };




  return (
    <div className="billing-container">
      <form className="billing-form" onSubmit={handleSubmit}>
        {/* Header with Date */}
        <div className="form-header">
          <div>
            <label>Bill No: </label>
            <input type="text" value={billNo} 
            onChange={(e) => setBillNo(e.target.value)}
            />

            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Date: </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
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
                    onChange={(e) =>
                      handleChange(index, "particular", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) =>
                      handleChange(index, "qty", parseInt(e.target.value))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.rate}
                    onChange={(e) =>
                      handleChange(index, "rate", parseInt(e.target.value))
                    }
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

        {/* Total */}
        <div className="total-box">
          <h3>Total: {totalAmount}</h3>
        </div>

        {/* Digital Signature */}
        {/* <div className="signature-box">
          <label>Digital Signature: </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleSignatureUpload}
          />

        </div> */}


        {/* Submit */}
        <div className="submit-box">
          <button type="submit" className="submit-btn">
            Submit Bill
          </button>
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