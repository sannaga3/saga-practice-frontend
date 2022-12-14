import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import { deleteTaskRequest } from "../../../sagas/tasks";

export const Dgrid = ({ datas }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (taskId) => {
    if (!window.confirm("本当に投稿を削除しますか？")) {
      return false;
    }
    dispatch(deleteTaskRequest(taskId, navigate));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user_name", headerName: "User Name", width: 100 },
    { field: "task_name", headerName: "Task Name", width: 150 },
    { field: "purpose", headerName: "Purpose", width: 150 },
    { field: "action", headerName: "Action", width: 150 },
    { field: "schedule_start", headerName: "Schedule_start", width: 150 },
    { field: "schedule_end", headerName: "Schedule_end", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 80,
      disableExtendRowFullWidth: true,
      renderCell: (values) => (
        <>
          {values.row.status === "0" && "未着手"}
          {values.row.status === "1" && "進行中"}
          {values.row.status === "2" && "終了"}
        </>
      ),
    },
    {
      field: "showButton",
      headerName: "Show",
      width: 70,
      disableExtendRowFullWidth: true,
      renderCell: (values) => (
        <Link
          to={`/task/${values.row.id}`}
          state={values.row}
          className="show-link"
        >
          詳細
        </Link>
      ),
    },
    {
      field: "editButton",
      headerName: "Edit",
      width: 70,
      disableExtendRowFullWidth: true,
      renderCell: (values) => (
        <Link
          to={`/task/${values.row.id}/edit`}
          state={values.row}
          className="edit-link"
        >
          変更
        </Link>
      ),
    },
    {
      field: "deleteButton",
      headerName: "Delete",
      width: 70,
      disableExtendRowFullWidth: true,
      renderCell: (values) => (
        <button
          type="button"
          className="delete-link w-16"
          onClick={() => handleDelete(values.row.id)}
        >
          削除
        </button>
      ),
    },
  ];

  return (
    <DataGrid
      getRowId={(row) => row.id}
      rows={datas}
      columns={columns}
      rowsPerPageOptions={[10, 25, 50, 100]}
      initialState={{
        pagination: {
          pageSize: 10,
        },
      }}
    />
  );
};
