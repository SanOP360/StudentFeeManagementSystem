import React from "react";
import jsPDF from "jspdf";
import { FaFileInvoice } from "react-icons/fa";

export default function InvoiceButton({ student }) {
  const handleGenerateInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student Fee Invoice", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Student Name: ${student.name}`, 20, 40);
    doc.text(`Roll Number: ${student.rollNumber}`, 20, 50);
    doc.text(`Class: ${student.class}`, 20, 60);

    doc.setFontSize(16);
    doc.text("Payment Details", 20, 80);

    if (student.paymentStatus === "Unpaid") {
      doc.setFontSize(12);
      doc.text("Dear Parent/Guardian,", 20, 100);
      doc.text(
        "We noticed that the fee for the current term is still pending.",
        20,
        110
      );
      doc.text(
        "Please submit the fee at your earliest convenience to avoid any disruptions in your child's education.",
        20,
        120
      );
      doc.text(
        "Your prompt attention to this matter is greatly appreciated.",
        20,
        130
      );
    } else {
      doc.setFontSize(12);
      doc.text("Dear Parent/Guardian,", 20, 100);
      doc.text(
        "We are pleased to inform you that the fee for the current term has been successfully submitted.",
        20,
        110
      );
      doc.text(
        "Thank you for your timely payment.",
        20,
        120
      );
      doc.text(
        "We appreciate your cooperation and commitment to your child's education.",
        20,
        130
      );
    }

    doc.setFontSize(12);
    doc.text("Thank you for your cooperation.", 20, 150);
    doc.text("Best regards,", 20, 160);
    doc.text("The School Administration", 20, 170);

    doc.save(`Invoice_${student.rollNumber}.pdf`);
  };

  return (
    <button
      onClick={handleGenerateInvoice}
      className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center"
    >
      <FaFileInvoice className="mr-2" /> Generate Invoice
    </button>
  );
}
