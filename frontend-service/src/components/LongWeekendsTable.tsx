import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { LongWeekend } from "../types/types";
import { useMemo } from "react";

interface LongWeekendsTableProps {
  rows: LongWeekend[];
  loading: boolean;
  onRowClick: (row: LongWeekend) => void;
}

export default function LongWeekendsTable({
  rows,
  loading,
  onRowClick,
}: LongWeekendsTableProps) {
  const uniqueRows = useMemo(() => {
    const seen = new Set<string>();
    return rows
      .map((r) => {
        const id = `${r.startDate}-${r.endDate}`;
        return { ...r, id };
      })
      .filter((r) => {
        if (seen.has(r.id)) return false;
        seen.add(r.id);
        return true;
      });
  }, [rows]);
  const columns: GridColDef[] = [
    {
      field: "startDate",
      headerName: "Start",
      width: 130,
      renderCell: (params) => {
        const v = params.value as string | undefined;
        return v ? new Date(v).toLocaleDateString("en-US") : "";
      },
    },
    {
      field: "endDate",
      headerName: "End",
      width: 130,
      renderCell: (params) => {
        const v = params.value as string | undefined;
        return v ? new Date(v).toLocaleDateString("en-US") : "";
      },
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={uniqueRows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        onRowClick={(p: GridRowParams<LongWeekend>) => onRowClick(p.row)}
      />
    </div>
  );
}
