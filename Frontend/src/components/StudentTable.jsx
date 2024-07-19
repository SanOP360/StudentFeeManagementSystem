import React from "react";
import SendInvoice from "./SendInvoice";

export default function StudentTable({ students }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Roll Number</th>
          <th>Fees</th>
          <th>Payment Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.rollNumber}</td>
            <td>{student.fees}</td>
            <td>{student.paymentStatus}</td>
            <td>
              <button onClick={() => alert("View details")}>View</button>
              <button onClick={() => alert("Edit student")}>Edit</button>
              <input type="checkbox" />
              {student.paymentStatus === "Unpaid" && (
                <SendInvoice student={student} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
