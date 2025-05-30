import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { Holiday } from "../types/types";
import { useMemo } from "react";

interface HolidaysTableProps {
  rows: Holiday[];
  loading: boolean;
  onRowClick: (row: Holiday) => void;
}

interface DateValueFormatterParams {
  value: string | undefined;
}

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "localName", headerName: "Local Name", width: 200 },
  { field: "name", headerName: "English Name", width: 200 },
  {
    field: "date",
    headerName: "Date",
    width: 130,
    renderCell: (params: GridRenderCellParams<Holiday>) => {
      const dateStr = params.value;
      if (!dateStr) return null;
      const d = new Date(dateStr);
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const yy = d.getFullYear();
      return <span>{`${mm}/${dd}/${yy}`}</span>;
    },
  },

  { field: "countryCode", headerName: "Country", width: 100 },
  { field: "fixed", headerName: "Fixed", width: 90, type: "boolean" },
  { field: "global", headerName: "Global", width: 90, type: "boolean" },
];

export function HolidaysTable({
  rows,
  loading,
  onRowClick,
}: HolidaysTableProps) {
  const uniqueRows = useMemo(() => {
    const seen = new Set<string>();
    return rows.filter((h) => {
      const key = `${h.date}-${h.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [rows]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => `${row.date}-${row.name}`}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        loading={loading}
        disableRowSelectionOnClick
        autoHeight
        onRowClick={(p: GridRowParams<Holiday>) => onRowClick(p.row)}
      />
    </div>
  );
}
