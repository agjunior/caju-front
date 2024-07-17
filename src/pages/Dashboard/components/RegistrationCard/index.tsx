import React from "react";
import { ButtonSmall } from "~/components/Buttons"; 
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration } from "~/types/Registration";
import { useRegistrations } from "~/contexts/RegistrationContext";
import { RegistrationStatus } from "~/enums/RegistrationStatus";


type Props = {
  data: Registration;
};

const RegistrationCard = (props: Props) => {
  const { updateRegistration, deleteRegistration } = useRegistrations();

  const handleUpdate = (status: RegistrationStatus) => {
    const data = { ...props.data, status};
    updateRegistration(data);
  };
  
  const handleDelete = () => deleteRegistration(props.data.id);

  const buttons = {
    approved: {
      title: "Aprovar",
      color: "rgb(155, 229, 155)",
      status: RegistrationStatus.APPROVED,
    },
    reproved: {
      title: "Reprovar",
      color: "rgb(255, 145, 154)",
      status: RegistrationStatus.REPROVED,
    },
    review: {
      title: "Revisar novamente",
      color: "#ff8858",
      status: RegistrationStatus.REVIEW,
    },
  };

  const buttonsByStatus = {
    REVIEW: [buttons.approved, buttons.reproved],
    APPROVED: [buttons.review],
    REPROVED: [buttons.review],
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {buttonsByStatus[props.data.status]?.map((ButtonComponent, index) => (
          <React.Fragment key={index}>
            <ButtonSmall
              bgcolor={ButtonComponent.color}
              onClick={handleUpdate.bind(null, ButtonComponent.status)}
            >
              {ButtonComponent.title}
            </ButtonSmall>
          </React.Fragment>
        ))}
        <HiOutlineTrash onClick={handleDelete}/>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
