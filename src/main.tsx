import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Expenses from "./routes/Expenses/index.tsx";
import Invoices from "./routes/Invoices/index.tsx";
import NotFound from "./routes/NotFound/index.tsx";
import Invoice from "./routes/Invoices/Invoice/index.tsx";
import InvoicesIndex from "./routes/Invoices/InvoicesIndex/index.tsx";
import Welcome from "./routes/Welcome/index.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  //Rotas Aninhadas
  //index é para quando carregar o componente a primeira vez
  //: é passado quando queremos receber esse parâmetro como argumento dinâmico
  //rota * é quando for passado uma rota inexistente
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Welcome />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />}>
          <Route index element={<InvoicesIndex />} />
          <Route path=":invoiceId" element={<Invoice />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
