import { memo } from "react";

export const ErrorMessage = memo(({ messages }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-2/3 space-y-1 border-2 border-red-700 text-red-700 mt-5 mb-2 p-1">
          {messages.map((message) => {
            return (
              <li key={message} className="text-left px-5 font-bold">
                {message}
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
});
