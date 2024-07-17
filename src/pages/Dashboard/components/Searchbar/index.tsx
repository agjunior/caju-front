import { useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import { useForm } from "react-hook-form";
import { isCPF, formatToCPF } from "brazilian-values";
import routes from "~/router/routes";
import * as S from "./styles";
import { useRegistrations } from "~/contexts/RegistrationContext";

export const SearchBar = () => {
  const history = useHistory();
  const { register, watch, setValue, clearErrors, formState: { errors } } = useForm({ mode: 'all' });
  const cpfValue = watch('cpf');
  const [lastValidCPF, setLastValidCPF] = useState('');
  const { filterRegistrations, fetchRegistrations } = useRegistrations();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  }

  useEffect(() => {
    const cleanCPF = cpfValue?.replace(/\D/g, '');
    if (isCPF(cleanCPF) && cleanCPF.length === 11 && cleanCPF !== lastValidCPF) {
      setLastValidCPF(cleanCPF);
      filterRegistrations('cpf', cleanCPF);
    }
    if (cleanCPF && cleanCPF.length < 11 && lastValidCPF) {
      setLastValidCPF('');
      fetchRegistrations();
    }
  }, [cpfValue, lastValidCPF]);

  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors();
    const formattedCPF = formatToCPF(event.target.value);
    const shouldValidate = formattedCPF.length === 14;
    setValue('cpf', formattedCPF, { shouldValidate });
  };
  
  return (
    <S.Container>
      <TextField 
        {...register('cpf', {
          validate: value => isCPF(value) || 'CPF inválido'
        })}
        onChange={handleCPFChange}
        onBlur={handleCPFChange}
        value={cpfValue || ''}
        maxLength={14}
        placeholder="Digite um CPF válido"
        error={errors.cpf && errors.cpf.message?.toString()} />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={fetchRegistrations}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
