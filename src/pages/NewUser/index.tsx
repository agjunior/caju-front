import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { FieldValues, useForm } from "react-hook-form";
import { useRegistrations } from "~/contexts/RegistrationContext";
import useCustomHistory from "~/hooks/useCustomHistory";
import { formatToCPF, isCPF, formatToDate } from "brazilian-values";
import { Registration } from "~/types/Registration";
import { RegistrationStatus } from "~/enums/RegistrationStatus";

const NewUserPage = () => {
  const { goToHome } = useCustomHistory();
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const { addRegistration } = useRegistrations();

  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatToCPF(event.target.value)
    setValue('cpf', formattedCPF, { shouldValidate: true });
  };

  const onSubmit = async (data: FieldValues) => {
    const registration: Registration = {
      employeeName: data.name,
      email: data.email,
      cpf: data.cpf.replace(/\D/g, ''),
      admissionDate: formatToDate(new Date(data.admissionDate)),
      status: RegistrationStatus.REVIEW,
    };
    await addRegistration(registration);
    goToHome();
  };

  const validateName = (name: string) => {
    const regex = /^[^\d][a-zA-Z]{1,}\s[a-zA-Z]{1,}/;
    return regex.test(name) || "O nome deve começar com uma letra, conter pelo menos 2 letras e um espaço";
  };
  
  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('name', {
              required: 'Nome é obrigatório',
              validate: {validateName},
            })}
            placeholder="Nome"
            label="Nome"
            error={errors.name?.message?.toString()}
          />
          <TextField
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: { value: /^\S+@\S+\.\S+$/,
                message: 'Email inválido'
            }})}
            placeholder="Email"
            label="Email"
            type="email"
            error={errors.email?.message?.toString()}
          />
          <TextField
            {...register('cpf', {
              required: 'CPF é obrigatório',
              validate: value => isCPF(value) || 'CPF inválido',
            })}
            placeholder="CPF"
            label="CPF"
            maxLength={14}
            error={errors.cpf?.message?.toString()}
            onChange={handleCPFChange}
            value={watch('cpf')}
          />
          <TextField
            {...register('admissionDate', { required: 'Data de admissão é obrigatória' })}
            label="Data de admissão"
            type="date"
            error={errors.admissionDate?.message?.toString()}
          />
          <Button>Cadastrar</Button>
        </S.Form>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
