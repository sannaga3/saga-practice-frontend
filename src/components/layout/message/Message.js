import { ErrorMessage } from "./ErrorMessage";
import { FlashMessage } from "./FlashMessage";

export const Message = ({ errors, location }) => {
  return (
    <>
      {Object.keys(errors).length > 0 ? (
        <ErrorMessage errors={errors} />
      ) : (
        location.state != null &&
        Object.keys(location).length > 0 && <FlashMessage location={location} />
      )}
    </>
  );
};
