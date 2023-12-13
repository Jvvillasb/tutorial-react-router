import { useNavigate, useParams } from "react-router-dom";
import { deleteInvoice, getInvoice } from "../../../data";

export default function Invoice() {
  //Usa o hook useNavigate para obter a função navigate, que pode ser usada para navegar para outras páginas programaticamente.
  const navigate = useNavigate();
  //Usa o hook useParams para obter os parâmetros da URL. No caso, está procurando o parâmetro chamado invoiceId.
  const params = useParams();
  //Obtém os detalhes da fatura usando a função getInvoice do pacote data. O número da fatura é obtido dos parâmetros da URL convertido para um número.
  const invoice = getInvoice(Number(params.invoiceId));
  return (
    //Renderiza o conteúdo dentro do bloco apenas se invoice existir (ou seja, se getInvoice retornar uma fatura).
    <>
      {invoice && (
        <main style={{ padding: "1rem" }}>
          <h2>Total Due: {invoice.amount}</h2>
          <p>
            {invoice.name}: {invoice.number}
          </p>
          <p>Due Date: {invoice.due}</p>
          <p>
            <button
              //Renderiza um botão "Delete" que, quando clicado, executa a seguinte ação: Chama deleteInvoice(invoice.number) para excluir a fatura.
              //Navega para a página "/invoices" concatenada com os parâmetros de pesquisa atuais (location.search).
              onClick={() => {
                deleteInvoice(invoice.number);
                navigate("/invoices" + location.search);
              }}
            >
              Delete
            </button>
          </p>
        </main>
      )}
    </>
  );
}
