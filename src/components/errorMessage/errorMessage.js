export const ErrorMessages = ({ errors }) => {
  return (
    <>
      {errors.length > 0 && (
        <div className="flex justify-center">
          <div className="w-2/3 space-y-1 border-2 border-red-700 text-red-700 mt-5 mb-2 p-1">
            {errors.map((error) => {
              return (
                <li key={error} className="text-left px-5 font-bold">
                  {error}
                </li>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
