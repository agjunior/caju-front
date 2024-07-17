import { useState } from 'react';
import useCustomHistory from '~/hooks/useCustomHistory';
// import { registrationService } from '~/services/RegistrationService';

const useSubmitRegistration = () => {
    const [error, setError] = useState(null);
    const { goToHome } = useCustomHistory();

    const onSubmit = async (data) => {
    //    registrationService.addRegistration(data)
    //     .then(() => goToHome())
    //     .catch(setError)
    };

    return { onSubmit, error };
};

export default useSubmitRegistration;