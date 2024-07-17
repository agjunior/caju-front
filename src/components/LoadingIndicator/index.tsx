import { useLoading } from '~/hooks/useLoading';
import styled, { keyframes } from "styled-components";
import { FaSpinner } from 'react-icons/fa';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: ${rotate} 2s linear infinite;
`;

export const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    color: rgba(232, 5, 55);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
`;

const LoadingIndicator = () => {
    const { isLoading } = useLoading();

    return (
        <>
            {isLoading && (
              <LoadingContainer data-testid="loading-container">
                <SpinnerIcon />
              </LoadingContainer>
            )}
        </>
    );
};

export default LoadingIndicator;