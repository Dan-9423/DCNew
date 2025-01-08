import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer } from '../types/customer';

interface CustomerContextType {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

const initialCustomers: Customer[] = [
  {
    id: '1',
    razaoSocial: 'Tech Solutions Ltda',
    nomeFantasia: 'TechSol',
    cnpj: '12.345.678/9012-34',
    email: 'contato@techsol.com.br',
    telefone: '(11) 98765-4321'
  },
  {
    id: '2',
    razaoSocial: 'Indústria ABC S.A.',
    nomeFantasia: 'ABC Industries',
    cnpj: '98.765.432/1098-76',
    email: 'financeiro@abc.com.br',
    telefone: '(21) 99876-5432'
  },
  {
    id: '3',
    razaoSocial: 'Comércio XYZ Eireli',
    nomeFantasia: 'XYZ Store',
    cnpj: '45.678.901/2345-67',
    email: 'contato@xyz.com.br',
    telefone: '(31) 97654-3210'
  },
  {
    id: '4',
    razaoSocial: 'Distribuidora 123 Ltda',
    nomeFantasia: '123 Distrib',
    cnpj: '78.901.234/5678-90',
    email: 'vendas@123distrib.com.br',
    telefone: '(41) 96543-2109'
  },
  {
    id: '5',
    razaoSocial: 'Serviços Beta ME',
    nomeFantasia: 'Beta Services',
    cnpj: '23.456.789/0123-45',
    email: 'atendimento@betaservices.com.br',
    telefone: '(51) 95432-1098'
  }
];

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  return (
    <CustomerContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
}