export default function Alignment({ alignment }: { alignment: any }) {
  const colorMap: any = {
    "strongly aligned": "bg-green-400",
    aligned: "bg-yellow-400",
    misaligned: "bg-orange-400",
    "strongly misaligned": "bg-red-400",
  };
  return (
    <>
      <div
        className={`inline-block text-sm rounded-sm px-2 ${colorMap[alignment.alignment]}`}
      >
        {alignment.alignment}
      </div>
      &nbsp;
      <i className="inline-block text-xs">🎯&nbsp;{alignment.sdg.name}</i>
    </>
  );
}
