import randomColor from "randomcolor";
import Alignment from "./Alignment";

function getDepth(node: any) {
  if (!node.children || node.children.length === 0) {
    return 1;
  }

  const childDepths = node.children.map(getDepth);
  return 1 + Math.max(...childDepths);
}

export default function ProductView({
  product,
  hue,
  depth,
  parent,
  maxDepth,
}: {
  product: any;
  hue: number;
  depth?: number;
  parent?: any;
  maxDepth?: any;
}) {
  const calculatedMaxDepth = !maxDepth ? getDepth(product) : maxDepth;
  const consolidatedWeight = parent
    ? product.consolidatedWeight / parent.consolidatedWeight
    : 0;
  const depthInt = depth || 0;
  return (
    <>
      <div
        className={`relative text-gray-800 flex flex-row justify-start align-end  border-slate-800 ${!depth ? "mt-2" : ""}`}
        style={{
          backgroundColor: randomColor({ hue, luminosity: "light" }),
          height: calculatedMaxDepth * (80 - depthInt * 1),
          width: !depth ? "100%" : `${consolidatedWeight * 100}%`,
          fontWeight: 800 - depthInt * 100,
        }}
      >
        <div className="flex w-full h-full justify-between items-end absolute p-2 overflow-scroll">
          <div className="text-nowrap">
            <div>{product.name}</div>
            {product.consolidatedAlignment && (
              <Alignment alignment={product.consolidatedAlignment}></Alignment>
            )}
          </div>
          <strong className="pl-2">
            {parent ? `${(consolidatedWeight * 100).toFixed(1)}%` : "100%"}
          </strong>
        </div>
        {product.children.map((p: any) => (
          <ProductView
            product={p}
            hue={(hue + 30) % 359}
            key={p.id}
            depth={!!depth ? depth + 1 : 1}
            parent={product}
          />
        ))}
      </div>
    </>
  );
}
