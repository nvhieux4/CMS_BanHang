import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Customers from 'views/customers';
import Dashboard from 'views/dashboard';
import Products from 'views/products';
import Transactions from 'views/transactions';
import DefaultLayout from 'layout/DefaultLayout';

export default function NavigateRouter() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/transactions" element={<Transactions />} />
            </Route>
        </Routes>
    );
}
