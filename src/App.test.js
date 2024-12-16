import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import matchers
import App from './App';

// Mock the `RouteModules` component
jest.mock('./routing/RouteModules', () => () => <div data-testid="route-modules">RouteModules</div>);

describe('App Component', () => {
  test('renders the App component with SearchProvider and RouteModules', () => {
    render(<App />);

    // Check if the RouteModules component is rendered
    const routeModulesElement = screen.getByTestId('route-modules');
    expect(routeModulesElement).toBeInTheDocument();
  });
});
