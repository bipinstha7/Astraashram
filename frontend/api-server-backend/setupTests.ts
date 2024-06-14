import { configure } from '@testing-library/react';

configure({
  getElementError: (message: string | null, container) => {
    const error = new Error(message || '');
    error.name = 'TestingLibraryElementError';
    error.stack = null;
    return error;
  },
});
