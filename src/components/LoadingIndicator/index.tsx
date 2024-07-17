import { useLoading } from '~/hooks/useLoading';
import styled from "styled-components";

export const LoadingContainer = styled.div`
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

const LoadingIndicator = () => {
    const { isLoading } = useLoading();

    return (
        <>
            {isLoading && (
                <LoadingContainer>
                    <div>Carregando...</div>
                </LoadingContainer>
            )}
        </>
    )
};

export default LoadingIndicator;