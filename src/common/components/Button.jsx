import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export const ButtonCmp = ({ path, name, state }) => {
  const navigate = useNavigate();
  const router = () => {
    navigate(path, {
      state: state,
    });
  };
  return (
    <Button
      className="rounded-md table__body-buttons"
      size="sm"
      onClick={router}
    >
      <span>{name}</span>
    </Button>
  );
};
