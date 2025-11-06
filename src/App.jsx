// App.jsx
import React from 'react';
import {  Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CustomerForm from './pages/CustomerForm';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectForm from './pages/ProjectForm';
import Income from './pages/Income';
import IncomeForm from './pages/IncomeForm';
import Expense from './pages/Expense';
import ExpenseForm from './pages/ExpenseForm';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Customer from './pages/Customer';
import Credentials from './pages/Credentials';
import CredentialForm from './pages/CredentialForm';
import CustomerMain from './pages/CustomerMain';
import Vendor from './pages/Vendor';
import VendorForm from './pages/VendorForm';
import Graphs from './pages/Graphs';
function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Dashboard + nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/graph" index element={<Graphs/>}/>
          <Route path="income" element={<Income />} />
          <Route path="/dashboard/income/add" element={<IncomeForm />} />
          <Route path="expense" element={<Expense />} />
          <Route path="/dashboard/expense/add" element={<ExpenseForm />} />
          <Route path="customer" element={<Customer />}>
            <Route index element={<CustomerMain />} />
            <Route path="add" element={<CustomerForm />} />

            <Route path="vendor" element={<Vendor />} />
          </Route>

          <Route path="vendor/add" element={<VendorForm />} />

          <Route path="credentials" element={<Credentials />} />
          <Route
            path="/dashboard/credentials/add"
            element={<CredentialForm />}
          />
          <Route path="projects" element={<Projects />} />
          <Route path="/dashboard/projects/add" element={<ProjectForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
