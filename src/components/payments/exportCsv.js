import React from "react";

import * as FileSaver from "file-saver";

import * as XLSX from "xlsx";

export const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="btn"
      style={{
        maxWidth: "90px",
        marginLeft: "10px",
        backgroundColor: "#1D6F42",
        color: "white",
      }}
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      <i
        className="icofont-file-excel"
        style={{ fontWeight: "bold", fontSize: "130%" }}
      ></i>
      &nbsp;Excel
    </button>
  );
};
