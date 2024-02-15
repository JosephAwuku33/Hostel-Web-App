import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type Room = {
    id: string;
    number: string;
    gender_type: string;
    price: number;
    occupants: number;
    status: string;
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]
export const columnsHeader: ColumnDef<Room>[] = [
  {
    accessorKey: "number",
    header: "Room Number",
  },

  {
    accessorKey: "gender_type",
    header: "Gender",
  },

  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "occupants",
    header: "occupants",
  },
  {
    accessorKey: "status",
    header: "status",
  },
]


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]