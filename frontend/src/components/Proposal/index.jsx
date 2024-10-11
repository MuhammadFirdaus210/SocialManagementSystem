import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Proposal from './page';
import InputRoutes from './input';
import TableLayout from './list/KUBE';
import TableUEP from './list/UEP';
import DetailDataProposal from './config/detail/UEP';
import EditRoutes from './config/edit';
import VerifikasiUEP from './verifikasi/UEP';
import EvaluasiFormUEP from './evaluasi/UEP';
import TableManfaat from './list/Manfaat';
import LaporanPage from '../Pages/ListKS';
import VerifikasiRoutes from './verifikasi';
import EvaluasiRoutes from './evaluasi';
import DetailRoutes from './config/detail';

function ProposalRoutes() {
  const breadcrumbItems = [
    { label: 'Proposal', path: '/proposal' },
  ];

  const breadcrumbItemsInput = [
    { label: 'Proposal', path: '/proposal' },
    { label: 'Input Data', path: '/proposal/input' },
  ];
  
  return (
    <Routes>
      <Route path="/" element={<Proposal breadcrumbItems={breadcrumbItems} />} />
      <Route path="/:tipe/list" element={<LaporanPage />} />
      <Route path="/input" element={<Proposal breadcrumbItems={breadcrumbItemsInput} tipe="input"/>} />
      <Route path="/kube" element={<TableLayout breadcrumbItems={breadcrumbItems} tipe={"kube"} />} />
      <Route path="/uep" element={<TableUEP breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="/manfaat" element={<TableManfaat breadcrumbItems={breadcrumbItems} tipe={"manfaat"} />} />
      <Route path="/:tipe/detail/:id" element={<DetailRoutes breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="/:tipe/verifikasi/:id" element={<VerifikasiRoutes breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="/:tipe/evaluasi/:id" element={<EvaluasiRoutes breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="/:tipe/edit/:id" element={<EditRoutes breadcrumbItems={breadcrumbItems} tipe={"uep"} />} />
      <Route path="input/*" element={<InputRoutes breadcrumbItems={breadcrumbItems} />} />
    </Routes>
  );
}

export default ProposalRoutes;