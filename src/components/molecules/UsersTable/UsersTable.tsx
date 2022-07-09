import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { User } from 'types';

const UsersTable = ({ users }: { users: User[] }) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'userID',
      header: () => 'ID',
      cell: (info) => <div className="text-xs">{info.getValue()}</div>,
    },
    {
      accessorKey: 'auth0UserID',
      cell: (info) => <div className="text-xs">{info.getValue()}</div>,
    },
    {
      accessorFn: (row) => row.email,
      id: 'Email',
      cell: (info) => <div className="text-xs">{info.getValue()}</div>,
    },
    {
      accessorKey: 'username',
      header: () => 'Username',
      cell: (info) => <div className="text-xs">{info.getValue()}</div>,
    },
    {
      accessorFn: (row) => `${row.givenName} ${row.familyName}`,
      id: 'Full Name',
      cell: (info) => <div className="text-xs">{info.getValue()}</div>,
    },
    {
      accessorFn: (row) => `${new Date(row.created).toDateString()}`,
      id: 'Created At',
      cell: (info) => <div className="text-xs">{info.getValue()}</div>,
    },
  ];
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 overflow-y-scroll">
      <div className="overflow-hidden ">
        <table className="min-w-full">
          <thead className="border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    {header.isPlaceholder || header.depth === 0
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                onClick={() => console.log(`${row.getValue('userID')} clicked`)}
                key={row.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
    </div>
  );
};

export default UsersTable;
