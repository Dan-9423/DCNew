import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Customer } from '@/types/customer';
import CustomerList from '@/components/customers/CustomerList';
import CustomerSearch from '@/components/customers/CustomerSearch';
import CustomerForm from '@/components/forms/CustomerForm';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockCustomers: Customer[] = [
  // ... (manter os dados mockados enquanto não temos o Supabase configurado)
];

export default function Sacados() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);

  const handleSearch = (query: string) => {
    const filtered = customers.filter(customer => 
      customer.razaoSocial.toLowerCase().includes(query.toLowerCase()) ||
      customer.nomeFantasia.toLowerCase().includes(query.toLowerCase()) ||
      customer.cnpj.includes(query) ||
      customer.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const handleNewCustomer = (data: Customer) => {
    const newCustomer = {
      ...data,
      id: crypto.randomUUID()
    };
    setCustomers(prev => [newCustomer, ...prev]);
    setFilteredCustomers(prev => [newCustomer, ...prev]);
    setShowNewCustomerModal(false);
    toast({
      title: "Sacado cadastrado",
      description: "O sacado foi cadastrado com sucesso.",
    });
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
      toast({
        title: "Sacado excluído",
        description: "O sacado foi excluído com sucesso.",
      });
    }
  };

  const handleView = (customer: Customer) => {
    console.log('View customer:', customer);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg flex flex-col h-[calc(100vh-7rem)]">
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="w-full max-w-sm">
            <CustomerSearch onSearch={handleSearch} />
          </div>
          <Button onClick={() => setShowNewCustomerModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Sacado
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <CustomerList
            customers={filteredCustomers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>
      </div>

      <Dialog open={showNewCustomerModal} onOpenChange={setShowNewCustomerModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Novo Sacado</DialogTitle>
          </DialogHeader>
          <CustomerForm onSubmit={handleNewCustomer} />
        </DialogContent>
      </Dialog>

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