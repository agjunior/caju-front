import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingIndicator from './index';
import { useLoading } from '~/hooks/useLoading';

jest.mock('~/hooks/useLoading');

describe('LoadingIndicator', () => {
    test('Does not render loading indicator when isLoading is false', () => {
        (useLoading as jest.Mock).mockReturnValue({ isLoading: false });

        render(<LoadingIndicator />);

        const loadingContainer = screen.queryByTestId('loading-container');
        expect(loadingContainer).not.toBeInTheDocument();
    });
});
