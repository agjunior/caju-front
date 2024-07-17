import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Service from '~/services/RegistrationService';
import useApi from '~/hooks/useApi';
import { Registration } from '~/types/Registration';
import { set } from 'react-hook-form';

const RegistrationContext = createContext({
  registrations: [] as Registration[],
  fetchRegistrations: async () => {},
  filterRegistrations: async (field: string, value: string) => {},
  addRegistration: async (data: Registration) => {},
  updateRegistration: async (data: Registration) => {},
  deleteRegistration: async (id: string) => {},
});

export const useRegistrations = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([] as Registration[]);

    const executeFetchRegistrations = useApi(Service.fetchRegistrations);
    const executeFilterRegistrations = useApi(Service.filterRegistrationsByField);
    const executeAddRegistration = useApi(Service.addRegistration);
    const executeUpdateRegistration = useApi(Service.updateRegistration, true);
    const executeDeleteRegistration = useApi(Service.deleteRegistration, true);

    const fetchRegistrations = async () => {
      const result = await executeFetchRegistrations();
        setRegistrations(result);
    };

    const filterRegistrations = async (field, value) => {
      const result = await executeFilterRegistrations(field, value);
      setRegistrations(result);
    };

    const addRegistration = async (data: Registration) => {
      const result = await executeAddRegistration(data);
      setRegistrations([...registrations, result]);
    }

    const updateRegistration = async (data: Registration) => {
      const result = await executeUpdateRegistration(data.id, data);
      setRegistrations(registrations.map((registration: Registration) => registration.id === data.id ? result : registration));
    }

    const deleteRegistration = async (id: string) => {
      const result = await executeDeleteRegistration(id);
      setRegistrations(registrations.filter((registration: Registration) => registration.id !== id));
    }

    useEffect(() => {
      fetchRegistrations();
    }, []);

    return (
      <RegistrationContext.Provider value={{
        registrations,
        fetchRegistrations,
        filterRegistrations,
        addRegistration,
        updateRegistration,
        deleteRegistration
      }}>
            {children}
        </RegistrationContext.Provider>
    );
};