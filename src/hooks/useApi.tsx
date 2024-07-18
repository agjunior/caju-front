import { useCallback } from 'react';
import { useLoading } from '~/hooks/useLoading';
import { useModal } from '~/hooks/useModal';
import { toast } from 'react-toastify';

const useApi = (requestFunction: any, needConfirmation:boolean = false) => {
  const { startLoading, stopLoading } = useLoading();
  const { openModal } = useModal();

  const executeRequest = async (...params: any[]) => {
    startLoading();

    try {
      const response = await requestFunction(...params);
      toast.success('Operação realizada com sucesso!');
      return response;
    } catch (error) {
      toast.error('Ocorreu um erro na operação.');
      throw error;
    } finally {
      stopLoading();
    }
  };

  const execute = useCallback((...params: any[]) => {
    return new Promise((resolve, reject) => {
      if (needConfirmation) {
        openModal(() => {
          executeRequest(...params)
            .then(resolve)
            .catch(reject);
        });
      } else {
        executeRequest(...params)
          .then(resolve)
          .catch(reject);
      }
    });
  }, [needConfirmation, requestFunction]);
  
  return execute;
};

export default useApi;