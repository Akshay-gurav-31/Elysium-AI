import { jsPDF } from 'jspdf';

const downloadPDF = (healthReport, toast) => {
  if (healthReport) {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(healthReport, 10, 10);
    doc.save('health_report.pdf');
    toast({ title: "PDF Downloaded", description: "Your health report has been downloaded." });
  }
};

export default downloadPDF;