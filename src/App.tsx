import { Link, Outlet } from "react-router-dom";
import "./App.css";

//Outlet aqui é utilizado para indicar que esse componente possui rotas aninhadas
//e o argumento Outlet nos indica que esse é a rota principal "raiz"
function App() {
  return (
    <>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
