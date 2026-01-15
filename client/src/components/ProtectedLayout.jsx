import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { isLoggedIn } from "../utils/auth";

const ProtectedLayout = ({ children }) => {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) setAllowed(true);
  }, []);

  if (!allowed) return <LoginModal onSuccess={() => setAllowed(true)} />;

  return children;
};

export default ProtectedLayout;
