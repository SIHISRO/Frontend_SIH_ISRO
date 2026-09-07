"use client";

import React from "react";
import { formatHomographyMatrix } from "@/utils/formatters";
import { CopyButton } from "../common/CopyButton";
import { Grid, AlertTriangle } from "lucide-react";

export interface HomographyMatrixProps {
  homography: number[][] | null;
  className?: string;
}

export function HomographyMatrix({
  homography,
  className = "",
}: HomographyMatrixProps) {
  const formattedRows = formatHomographyMatrix(homography);
  const jsonString = homography ? JSON.stringify(homography, null, 2) : "null";

  return (
    <div
      className={`rounded-2xl glass-panel-elevated border border-[#BFC9D1]/25 p-6 backdrop-blur-md ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#BFC9D1]/15">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#ef7618]/15 text-[#ef7618] border border-[#ef7618]/30">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#EAEFEF]">
              3×3 Projective Homography Matrix (H)
            </h3>
            <p className="text-xs text-[#BFC9D1] font-mono">
              Geometric mapping: [x′, y′, 1]ᵀ ~ H · [x, y, 1]ᵀ
            </p>
          </div>
        </div>

        {homography && (
          <CopyButton
            text={jsonString}
            label="Copy Matrix JSON"
            className="self-start sm:self-auto"
          />
        )}
      </div>

      {formattedRows ? (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-[420px] w-full border-collapse font-mono text-xs sm:text-sm">
              <tbody>
                {formattedRows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-[#BFC9D1]/10 last:border-b-0">
                    <td className="py-2.5 px-3 text-[#BFC9D1]/60 font-semibold select-none w-12">
                      Row {rowIdx + 1}
                    </td>
                    {row.map((cellVal, colIdx) => (
                      <td
                        key={colIdx}
                        className="py-2.5 px-4 text-center text-[#EAEFEF] font-bold bg-[#18232c]/50 rounded m-1 border border-[#BFC9D1]/10 hover:border-[#ef7618]/50 transition-colors"
                      >
                        <span className={colIdx === 2 ? "text-[#ef7618]" : ""}>
                          {cellVal}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#BFC9D1]/70 leading-relaxed font-mono pt-2">
            The homography matrix rectifies perspective perspective discrepancies, scale variances, and orientation shifts between the Chandrayaan-2 payload and lunar reference frame.
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-mono">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span>
            Homography could not be computed. Insufficient geometrically consistent inlier correspondences (minimum 4 non-collinear correspondences required).
          </span>
        </div>
      )}
    </div>
  );
}
