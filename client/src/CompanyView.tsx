import ProductView from "./ProductView";

export default function CompanyView({ company }: { company: any }) {
  return (
    <div>
      <h4 className="text-xl font-bold">{company.name}</h4>
      {company.products.map((product: any, index: number) => (
        <ProductView
          product={product}
          hue={Math.ceil(((index + 1) / company.products.length) * 359)}
          key={index}
        />
      ))}
    </div>
  );
}
