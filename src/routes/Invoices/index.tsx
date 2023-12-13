/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../../data";
import "./styles.css";
import QueryNavLink from "../../components/QueryLink";

export default function Invoices() {
  const invoices = getInvoices();

  //useSearchParams é utilizado para manipular parâmetros de consulta na URL
  const [searchParams, setSearchParams] = useSearchParams();

  //input = é renderizado para filtrar as faturas com base no nome, o valor do campo é controlado
  //pelos parâmetros de consulta e a função setSearchParams é utilizada para atualizar os parâmetros de consulta conforme o usuário digita.
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          //o atributo é definido com base no valor do parâmetro de consulta chamado "filter" na URL. Isso é obtido através da chamada 
          //Se o valor de "filter" existir, ele será exibido no campo de input. Caso contrário, será exibida uma string vazia "".
          value={searchParams.get("filter") || ""}
          //O evento onChange é acionado sempre que o conteúdo do <input> é alterado pelo usuário.
          onChange={(event) => {
          //Obtém o valor atual do <input> (o que o usuário digitou) e atribui à variável filter.
            const filter = event.target.value;
          //Se filter for verdadeiro, chama setSearchParams({ filter }). Isso atualiza os parâmetros de consulta na URL, definindo o parâmetro "filter" com o valor digitado pelo usuário.
            if (filter) {
              setSearchParams({ filter });
          //Se filter for falso (o campo está vazio), chama setSearchParams({}). Isso remove o parâmetro "filter" dos parâmetros de consulta na URL.
            } else {
              setSearchParams({});
            }
          }}
        />
        {
        //O método filter é usado para criar um novo array contendo apenas os elementos que atendem a uma determinada condição.
        invoices
          .filter((invoice) => {
            //Obtém o valor do parâmetro de consulta "filter" da URL usando 
            const filter = searchParams.get("filter");
            //Se não houver um valor de filtro (campo de pesquisa vazio), a fatura é incluída no resultado (retorna true). Isso significa que todas as faturas são exibidas quando o campo de pesquisa está vazio.
            if (!filter) return true;
            //Converte o nome da fatura para minúsculas.
            const name = invoice.name.toLowerCase();
            //Verifica se o nome da fatura começa com o valor do filtro (ignorando maiúsculas e minúsculas). Isso garante que apenas as faturas cujos nomes começam com o que foi digitado no campo de pesquisa sejam incluídas no resultado.
            return name.startsWith(filter.toLowerCase());
          })
          //O método map é usado para criar um array de elementos React (QueryNavLink neste caso) com base no array filtrado de faturas.
          .map((invoice) => (
            //Cada link renderizado contém o nome da fatura e é envolto no componente QueryNavLink.
            //A propriedade className do QueryNavLink é definida com base em se o link está ativo ou não, alterando as classes CSS para estilização.
            <QueryNavLink
              className={({ isActive }: any) =>
                isActive ? "dblock nav-red" : "dblock nav-blue"
              }
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
