import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Customer } from '@/types/customer';
import CustomerList from '@/components/customers/CustomerList';
import CustomerSearch from '@/components/customers/CustomerSearch';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    razaoSocial: 'Empresa ABC Ltda',
    nomeFantasia: 'ABC Comercial',
    cnpj: '12345678901234',
    email: 'contato@abccomercial.com',
    telefone: '11999999999',
    endereco: {
      logradouro: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234567'
    }
  },
  {
    id: '2',
    razaoSocial: 'XYZ Indústria S.A.',
    nomeFantasia: 'XYZ Industrial',
    cnpj: '98765432109876',
    email: 'contato@xyzindustrial.com',
    telefone: '11988888888',
    endereco: {
      logradouro: 'Avenida Principal',
      numero: '456',
      bairro: 'Industrial',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '04567890'
    }
  },
];

export default function Sacados() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    const filtered = customers.filter(customer => 
      customer.razaoSocial.toLowerCase().includes(query.toLowerCase()) ||
      customer.nomeFantasia.toLowerCase().includes(query.toLowerCase()) ||
      customer.cnpj.includes(query) ||
      customer.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const handleEdit = (customer: Customer) => {
    console.log('Edit customer:', customer);
  };

  const handleDelete = (customerId: string) => {
    setDeleteCustomerId(customerId);
  };

  const confirmDelete = () => {
    if (deleteCustomerId) {
      const updatedCustomers = customers.filter(c => c.id !== deleteCustomerId);
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
      setDeleteCustomerId(null);
    }
  };

  const handleView = (customer: Customer) => {
    console.log('View customer:', customer);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sacados</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Sacado
        </Button>
      </div>

      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg space-y-6">
        <div className="flex justify-between items-center gap-4">
          <div className="w-full max-w-sm">
            <CustomerSearch onSearch={handleSearch} />
          </div>
        </div>

        <CustomerList
          customers={filteredCustomers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>

      <AlertDialog open={!!deleteCustomerId} onOpenChange={() => setDeleteCustomerId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este sacado? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}