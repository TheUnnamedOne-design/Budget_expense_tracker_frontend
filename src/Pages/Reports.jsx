import React, { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";
import { summary as getSummary, listExpenses } from "../api/api"; // updated imports
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale);

export default function Reports() {
  const pieRef = useRef();
  const barRef = useRef();
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    async function load() {
      const s = await getSummary();
      setSummary(s);
      if (pieRef.current) {
        new Chart(pieRef.current, {
          type: "pie",
          data: {
            labels: ["Income", "Expense"],
            datasets: [{ data: [s.income, s.expense] }]
          }
        });
      }
      const list = await listExpenses();
      const months = {};
      list.forEach(it => {
        const m = it.date.slice(0, 7);
        months[m] = months[m] || { income: 0, expense: 0 };
        months[m][it.type === "income" ? "income" : "expense"] += Number(it.amount);
      });
      const labels = Object.keys(months).sort();
      const incData = labels.map(l => months[l].income);
      const expData = labels.map(l => months[l].expense);
      if (barRef.current) {
        new Chart(barRef.current, {
          type: "bar",
          data: {
            labels,
            datasets: [
              { label: "Income", data: incData },
              { label: "Expense", data: expData }
            ]
          }
        });
      }
    }
    load();
  }, []);

  const exportCsv = async () => {
    const list = await listExpenses();
    let csv = "type,category,amount,date,note\n";
    list.forEach(r => csv += `${r.type},${r.category},${r.amount},${r.date},${(r.note || "").replace(/,/g, " ")}\n`);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "expenses.csv");
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.text("Expense Report", 10, 10);
    doc.text(`Income: ₹${summary.income}   Expense: ₹${summary.expense}`, 10, 20);
    doc.save("report.pdf");
  };

  return (
    <main className="container">
      <h2>Reports & Analytics</h2>
      <div className="report-grid">
        <div className="card"><h3>Income vs Expense</h3><canvas ref={pieRef} /></div>
        <div className="card"><h3>Monthly overview</h3><canvas ref={barRef} /></div>
      </div>
      <div className="actions">
        <button className="btn" onClick={exportCsv}>Export CSV</button>
        <button className="btn outline" onClick={exportPdf}>Export PDF</button>
      </div>
    </main>
  );
}
