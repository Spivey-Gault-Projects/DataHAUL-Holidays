import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { LongWeekend } from "../types/LongWeekend";

interface Props {
  rows: LongWeekend[];
  loading: boolean;
  onRowClick: (row: LongWeekend) => void;
}

export default function LongWeekendsTable({
  rows,
  loading,
  onRowClick,
}: Props) {
  const columns: GridColDef<LongWeekend>[] = [
    {
      field: "startDate",
      headerName: "Start",
      width: 130,
      valueFormatter: ({ value }) =>
        value ? new Date(value as string).toLocaleDateString("en-US") : "",
    },
    {
      field: "endDate",
      headerName: "End",
      width: 130,
      valueFormatter: ({ value }) =>
        value ? new Date(value as string).toLocaleDateString("en-US") : "",
    },
    { field: "days", headerName: "Days", width: 90, type: "number" },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSizeOptions={[5, 10]}
      loading={loading}
      onRowClick={(p: GridRowParams<LongWeekend>) => onRowClick(p.row)}
      autoHeight
    />
  );
}
