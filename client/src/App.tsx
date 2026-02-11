import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<any>();
  const [company, setCompany] = useState<any>();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/company`,
      );
      setData(await response.json());
    })();
  }, []);

  return (
    <div className="bg-slate-800 w-dvw h-dvh text-white p-8 relative">
      <h1 className="text-3xl font-bold underline">SDG product breakdown</h1>
      {!data ? (
        <div className="animate-pulse">Loading...</div>
      ) : !company ? (
        <div className="w-full mt-4">
          <table className="table-auto w-full border border-white">
            <thead>
              <tr>
                <th className="p-2 text-left border border-white">Company</th>
                <th className="p-2 text-center border border-white">
                  Product categories
                </th>
                <th className="p-2 text-center border border-white">
                  Cumulative weight
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: any) => (
                <tr
                  className="cursor-pointer"
                  key={row.id}
                  onClick={() => setCompany(row)}
                >
                  <td className="p-2 text-left border border-white">
                    {row.name}
                  </td>
                  <td className="p-2 text-center border border-white">
                    {row.products.length}
                  </td>
                  <td className="p-2 text-center border border-white">
                    {row.products.reduce(
                      (acc: any, n: any) => acc + n.consolidatedWeight,
                      0,
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full mt-4">
          <div
            className="underline font-bold cursor-pointer float-right mt-1"
            onClick={() => setCompany(undefined)}
          >
            Back
          </div>
          <h1 className="text-xl font-bold">{company.name}</h1>
          <div className="">Company data comes here</div>
        </div>
      )}
    </div>
  );
}

export default App;
