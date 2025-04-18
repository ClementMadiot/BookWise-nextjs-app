import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TableProps<T> {
  headers: string[];
  data: T[];
  title: string;
  renderRow: (item: T) => React.ReactNode;
}

const TableComponent = <T,>({
  headers,
  data,
  title,
  renderRow,
}: TableProps<T>) => {
  return (
    <>
      <div className="flex justify-between items-center gap-2 py-6">
        <h2 className="text-xl font-semibold text-dark-400">{title}</h2>
        {title === "All Books" ? (
          <Button className="bg-primary-admin" asChild>
            <Link
              href={"/admin/books/new"}
              className="text-white hover:!bg-primary-admin/95"
            >
              + Create a New Books
            </Link>
          </Button>
        ) : (
          <div className="flex gap-2">
            <p className="text-dark-200">A-Z</p>
            <p className="text-dark-200">#</p>
          </div>
        )}
      </div>
      {/* border-b border-gray-300/40 */}
      <Table className="border-spacing-y-4 border-separate">
        <TableHeader>
          <TableRow className="!bg-light-300">
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className="!text-dark-200 !font-[300] text-left p-4"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className="border-b border-gray-300/40"
            >
              {renderRow(item)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableComponent;
