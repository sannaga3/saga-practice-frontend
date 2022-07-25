import { MTable } from "../modules/tables/MTable";
import { Dgrid } from "../modules/tables/Dgrid";

export const Tasks = ({ tasks, tableType }) => {
  return (
    <div className="flexCol items-center">
      <div style={{ height: 700, width: "90%" }}>
        {tableType === "datagrid" ? (
          <Dgrid datas={tasks} />
        ) : (
          <MTable datas={tasks} title={"TaskList"} />
        )}
      </div>
    </div>
  );
};
