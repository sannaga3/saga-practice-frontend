import React from "react";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { deleteTaskRequest } from "../../../sagas/tasks";

export const MTable = ({ datas, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const columns = [
    {
      field: "id",
      title: "ID",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "user_name",
      title: "User Name",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "task_name",
      title: "Task Name",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "purpose",
      title: "Purpose",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "action",
      title: "Action",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "schedule_start",
      title: "Schedule_start",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "schedule_end",
      title: "Schedule_end",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "status",
      title: "Status",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (values) => (
        <>
          {values.status === "0" && "未着手"}
          {values.status === "1" && "進行中"}
          {values.status === "2" && "終了"}
        </>
      ),
    },
    {
      field: "show",
      title: "Show",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => (
        <Link to={`/task/${row.id}`} state={row} className="show-link">
          詳細
        </Link>
      ),
    },
    {
      field: "edit",
      title: "Edit",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => (
        <Link to={`/task/${row.id}/edit`} state={row} className="edit-link">
          変更
        </Link>
      ),
    },
    {
      field: "delete",
      title: "Delete",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => (
        <button
          type="button"
          className="delete-link"
          onClick={() => {
            handleDelete(row.id);
          }}
        >
          削除
        </button>
      ),
    },
  ];

  const handleDelete = (taskId) => {
    if (!window.confirm("本当に投稿を削除しますか？")) {
      return false;
    }
    dispatch(deleteTaskRequest(taskId, navigate));
  };

  // redux-toolkitのimmerによるオブジェクトのフリーズが、material-tableでエラーを引き起こす。オブジェクトのディープコピーを生成して回避
  const cloneDatas = structuredClone(datas);

  return (
    <MaterialTable
      icons={tableIcons}
      title={title}
      columns={columns}
      data={cloneDatas}
      options={{
        headerStyle: { whiteSpace: "nowrap" },
        cellStyle: {
          height: 15,
          overflowY: "scroll",
          overflow: "scroll",
          padding: 1,
        },
        paging: true,
        pageSize: 10,
        emptyRowsWhenPaging: false,
        pageSizeOptions: [10, 25, 50],
        maxBodyHeight: "550px",
        selection: true,
      }}
    />
  );
};
