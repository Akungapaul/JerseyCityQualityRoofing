import type { CostRange } from "@/data/types";

interface CostTableProps {
  items: CostRange[];
  caption: string;
}

export function CostTable({ items, caption }: CostTableProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-secondary text-text-primary text-[0.875rem] font-bold uppercase tracking-wider">
              <th className="px-4 py-3 text-left border-b border-[#4a5040]">
                Item
              </th>
              <th className="px-4 py-3 text-left border-b border-[#4a5040]">
                Low Estimate
              </th>
              <th className="px-4 py-3 text-left border-b border-[#4a5040]">
                High Estimate
              </th>
              <th className="px-4 py-3 text-left border-b border-[#4a5040]">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.item}
                className={
                  index % 2 === 0 ? "bg-dominant" : "bg-secondary"
                }
              >
                <td className="px-4 py-3 text-lg text-text-secondary border-b border-[#4a5040]">
                  {item.item}
                </td>
                <td className="px-4 py-3 text-lg text-text-primary font-bold border-b border-[#4a5040]">
                  {item.lowEstimate}
                </td>
                <td className="px-4 py-3 text-lg text-text-primary font-bold border-b border-[#4a5040]">
                  {item.highEstimate}
                </td>
                <td className="px-4 py-3 text-[0.875rem] text-text-secondary border-b border-[#4a5040]">
                  {item.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[0.875rem] text-text-secondary mt-4 italic">
        * Prices are estimates based on regional averages and vary by project
        scope, materials, and site conditions.
      </p>
    </div>
  );
}
