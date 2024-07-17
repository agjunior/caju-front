import { Registration } from '~/types/Registration';
import { ApiService } from './ApiService'

const fetchRegistrations = async () => {
    return await ApiService.get('registrations');
};

const filterRegistrationsByField = async (field: string, value: string) => {
    return await ApiService.get(`registrations?${field}=${value}`);
};

const addRegistration = async (data: Registration) => {
    return await ApiService.post('registrations', data);
}

const updateRegistration = async (id: number, data: Registration) => {
    return await ApiService.put(`registrations/${id}`, data);
}

const deleteRegistration = async (id: number) => {
    return await ApiService.delete(`registrations/${id}`);
}

export {
    fetchRegistrations,
    filterRegistrationsByField,
    addRegistration,
    updateRegistration,
    deleteRegistration
};