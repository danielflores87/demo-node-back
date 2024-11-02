import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { AppContext } from "../app.context";
import { ButtonComponent } from "./button.component";
import { CiLogin } from "react-icons/ci";

export function HeaderComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authorization } = useContext(AppContext);

  // useEffect(() => {
  //   if (
  //     (!authorization.token || authorization.token.length == 0) &&
  //     location.pathname !== "/login"
  //   )
  //     navigate("/login");
  // }, [authorization]);

  if (location.pathname === "/login") {
    return null;
  }
  return (
    <div className="text-gray-50 bg-gray-700 p-4 flex justify-between">
      <div
        className="font-bold hover:cursor-pointer block px-4  text-2xl hover:text-blue-500"
        onClick={() => navigate("/")}
      >
        <ImHome />
      </div>
      {authorization?.user?.name ? (
        <>
          <label className="text-base font-bold">
            Bienvenido, {authorization?.user?.name ?? ""}
          </label>
        </>
      ) : (
        <>
          <ButtonComponent
            className="text-white"
            icon={<CiLogin />}
            buttonStyle="Secondary"
            value="Iniciar Sesion"
            action={() => navigate("/login")}
          />
        </>
      )}
    </div>
  );
}
