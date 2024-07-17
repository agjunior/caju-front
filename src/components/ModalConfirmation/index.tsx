import styled from 'styled-components';
import { useModal } from '~/hooks/useModal';

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalConfirmation = () => {
    const { isOpen, message, onConfirm, closeModal } = useModal();

    return (
        <>
            {isOpen && (
                <ModalContainer>
                    <div className="modal">
                        <div className="modal-content">
                            <p>{message ? message : 'Desejar confirmar a operação?'}</p>
                            <button onClick={closeModal}>Não</button>
                            <button onClick={() => { onConfirm(); closeModal(); }}>Sim</button>
                        </div>
                    </div>
                </ModalContainer>
            )}
        </>
    )
}

export default ModalConfirmation;