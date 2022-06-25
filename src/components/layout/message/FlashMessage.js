export const FlashMessage = ({ location }) => {
  return (
    <>
      {location && Object.keys(location.state.flash).length > 0 && (
        <div className="flex justify-center">
          <div className="w-2/3 border-2 border-teal-700 text-teal-700 text-left font-bold mt-5 mb-2 py-1 px-5">
            {location.state.flash}
          </div>
        </div>
      )}
    </>
  );
};
