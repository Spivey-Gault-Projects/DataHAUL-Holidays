import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Holiday } from "../../types/Holiday";

interface HolidaysTableProps {
  rows: Holiday[];
  loading: boolean;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "localName", headerName: "Local Name", width: 200 },
  { field: "name", headerName: "English Name", width: 200 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "countryCode", headerName: "Country", width: 100 },
  { field: "fixed", headerName: "Fixed", width: 90, type: "boolean" },
  { field: "global", headerName: "Global", width: 90, type: "boolean" },
  {
    field: "launchYear",
    headerName: "Launch Year",
    width: 120,
    type: "number",
  },
];

export function HolidaysTable({ rows, loading }: HolidaysTableProps) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        loading={loading}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
}
