import { styles } from "../style/styles";

export const Login = () => {
  const { flexRow, flexCol, titleText, label, input, button } = styles;

  const login = () => {
    console.log("a");
  };

  return (
    <div className={`${flexCol} items-center`}>
      <div className="w-1/2 bg-white p-5 border rounded-lg shadow-xl">
        <h1 className={titleText}>Login</h1>
        <form className={`${flexCol} items-center space-y-8 pt-16`}>
          <div className={`${flexRow} justify-start items-center space-x-5`}>
            <label className={`${label} w-32`}>email: </label>
            <input
              type="email"
              className={`${input} w-60`}
              placeholder="abc@sample.com"
            />
          </div>
          <div className={`${flexRow} justify-start items-center space-x-5`}>
            <label className={`${label} w-32`}>password: </label>
            <input
              type="password"
              className={`${input} w-60`}
              placeholder="******"
            />
          </div>
          <button
            onClick={login}
            className={`${button} bg-blue-400 text-white hover:bg-blue-500`}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
};
