import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Customer } from '@/types/customer';
import { formatCNPJ } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  onView: (customer: Customer) => void;
}

export default function CustomerList({ customers, onEdit, onDelete, onView }: CustomerListProps) {
  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{customer.razaoSocial}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {customer.nomeFantasia}
                  </span>
                </div>
              </TableCell>
              <TableCell>{formatCNPJ(customer.cnpj)}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Visualizar</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(customer)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Editar</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(customer.id)}
                          className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Excluir</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}