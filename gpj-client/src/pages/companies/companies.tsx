import React, { useEffect, useState } from 'react';
import { CreateCompanyAttributes, UpdateCompanyAttributes } from '../../interfaces';
import Company from '../../models/company';
import searchHelper from '../../shared/utils/search-helper';
import {
  CompaniesTable, CreateCompanyModal, TopLayout, UpdateCompanyModal,
} from './components';
import companiesService from './services/companies-service';

export default function Companies() {
  const [isCreateCompanyModalOpen, setIsCreateCompanyModalOpen] = useState<boolean>(false);
  const [isUpdateCompanyModalOpen, setIsUpdateCompanyModalOpen] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [companiesSearchTerm, setCompaniesSearchTerm] = useState<string>('');

  const fetchCompaniesData = async () => {
    setLoadingCompanies(true);

    const fetchedCompanies = await companiesService.getCompanies().catch(() => []);
    setCompanies(fetchedCompanies);
    setFilteredCompanies(fetchedCompanies);

    setLoadingCompanies(false);
  };

  const openUpdateCompanyModal = (company: Company) => {
    setSelectedCompany(company);
    setIsUpdateCompanyModalOpen(true);
  };

  const closeUpdateCompanyModal = () => {
    setSelectedCompany(null);
    setIsUpdateCompanyModalOpen(false);
  };

  const handleCreateCompany = async (createCompanyAttributes: CreateCompanyAttributes) => {
    await companiesService.createCompany(createCompanyAttributes).then((createdCompany) => {
      setCompanies([...companies, createdCompany]);
      setIsCreateCompanyModalOpen(false);
    }).catch(() => {
      setIsCreateCompanyModalOpen(true);
    });
  };

  const handleUpdateCompany = async (updateCompanyAttributes: UpdateCompanyAttributes) => {
    await companiesService.updateCompany(updateCompanyAttributes).then((updatedCompany) => {
      const updatedCompanys = companies.map((company) => {
        if (company.companyId === updatedCompany.companyId) return updatedCompany;
        return company;
      });

      setCompanies(updatedCompanys);
      closeUpdateCompanyModal();
    }).catch(() => {
      setIsUpdateCompanyModalOpen(true);
    });
  };

  useEffect(() => {
    fetchCompaniesData();
  }, []);

  useEffect(() => {
    const filtered = searchHelper.getFilteredRecordsBySearchTerm<Company>(companies, companiesService.partialMatchKeys, companiesService.fullMatchKeys, companiesSearchTerm);
    setFilteredCompanies(filtered);
  }, [companies, companiesSearchTerm]);

  return (
    <div>
      <CreateCompanyModal
        isOpen={isCreateCompanyModalOpen}
        onClose={() => setIsCreateCompanyModalOpen(false)}
        createCompany={handleCreateCompany}
      />

      {selectedCompany && (
        <UpdateCompanyModal
          isOpen={isUpdateCompanyModalOpen}
          onClose={closeUpdateCompanyModal}
          updateCompany={handleUpdateCompany}
          company={selectedCompany}
        />
      )}

      <div className="mb-5">
        <TopLayout
          setIsCreateCompanyModalOpen={setIsCreateCompanyModalOpen}
          onSearchTermChange={(searchTerm: string) => setCompaniesSearchTerm(searchTerm)}
        />
      </div>
      <CompaniesTable companies={filteredCompanies} loadingCompanies={loadingCompanies} onUpdateCompany={openUpdateCompanyModal} />
    </div>
  );
}
