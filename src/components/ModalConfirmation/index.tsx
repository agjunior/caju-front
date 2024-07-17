import styled from 'styled-components';
import { useModal } from '~/hooks/useModal';
import { ButtonSmall } from '~/components/Buttons';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ModalConfirmation = () => {
    const { isOpen, message, onConfirm, closeModal } = useModal();

    return (
        <>
            {isOpen && (
                <ModalContainer>
                    <ModalContent>
                        <ModalText>{message ? message : 'Confirmar a operação?'}</ModalText>
                        <ButtonGroup>
                            <ButtonSmall bgcolor="#b9b9b9" onClick={closeModal}>Não</ButtonSmall>
                            <ButtonSmall bgcolor="#64a98c" onClick={() => { onConfirm(); closeModal(); }}>Sim</ButtonSmall>
                        </ButtonGroup>
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    )
}

export default ModalConfirmation;