import React from "react";
import { Link } from "@inertiajs/react";

export default function DataTable({ data, columns, actions }) {
    return (
        <div className="overflow-x-auto px-4">
            <table className="table-auto w-full text-sm md:text-base">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm font-medium">
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-2">
                                {col.label}
                            </th>
                        ))}
                        {actions && <th className="px-4 py-2">Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="border-t">
                            {columns.map((col) => (
                                <td key={col.key} className="px-4 py-2">
                                    {typeof col.render === "function"
                                        ? col.render(item[col.key], item)
                                        : item[col.key]}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-4 py-2 flex gap-2">
                                    {actions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => action.onClick(item)}
                                            className={action.className}
                                            aria-label={action.label}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
