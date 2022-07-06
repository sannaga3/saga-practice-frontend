import { memo } from "react";

export const FlashMessage = memo(({ flash }) => {
  return (
    <>
      {flash && (
        <div className="flex justify-center">
          <div className="w-2/3 border-2 border-teal-700 text-teal-700 text-left font-bold mt-5 mb-2 py-1 px-5">
            {flash}
          </div>
        </div>
      )}
    </>
  );
});
