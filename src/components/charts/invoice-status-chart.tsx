import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import ChartTooltip from "@/components/ui/chart-tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Maximize2 } from "lucide-react";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import ExcelJS from 'exceljs';

const data = [
  { name: "Paid", value: 400 },
  { name: "Pending", value: 300 },
  { name: "Overdue", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function InvoiceStatusChart() {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const downloadAsPng = async () => {
    if (!chartRef.current) return;
    
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: document.documentElement.classList.contains('dark') ? '#0f0f0f' : '#ffffff'
    });
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "invoice-status-chart.png";
    link.href = image;
    link.click();
  };

  const downloadAsCSV = () => {
    const csvContent = [
      ["Status", "Count"],
      ...data.map(item => [item.name, item.value.toString()])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "invoice-status-data.csv";
    link.click();
  };

  const downloadAsExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Your App';
    workbook.lastModifiedBy = 'Your App';
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet('Invoice Status');
    
    worksheet.columns = [
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Count', key: 'count', width: 15 }
    ];

    worksheet.getRow(1).font = { bold: true };

    data.forEach(item => {
      worksheet.addRow({ status: item.name, count: item.value });
    });

    const totalCount = data.reduce((sum, item) => sum + item.value, 0);
    const totalRow = worksheet.addRow({ status: 'Total', count: totalCount });
    totalRow.font = { bold: true };

    worksheet.getColumn('count').numFmt = '#,##0';

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "invoice-status-report.xlsx";
    link.click();
  };

  const chartContent = (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Invoice Status</CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div 
                  className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={downloadAsPng}>
                  Download PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadAsCSV}>
                  Download CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadAsExcel}>
                  Download Excel Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div 
              className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
              onClick={() => setShowFullscreen(true)}
              title="Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pl-2 pt-4" ref={chartRef}>
          <div style={{ width: '100%', height: 300 }}>
            {chartContent}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Invoice Status</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-[calc(90vh-100px)]">
            {chartContent}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

