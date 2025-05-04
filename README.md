# AF-2-Hasindu-K

A modern React application built with Vite, featuring Firebase integration and a comprehensive set of features.

## Features

- React 19 with Vite
- Firebase Integration
- React Router for navigation
- Toast notifications
- Dialog components with Radix UI
- Comprehensive testing setup with Vitest
- ESLint for code quality

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Firebase account and project setup

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd af-2-hasindu-k
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Copy your Firebase configuration
   - Update the Firebase configuration in `firebase.jsx`

## Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run the test suite:

```bash
npm test
```

## Linting

Check code quality with ESLint:

```bash
npm run lint
```

## Project Structure

- `src/` - Source code directory
- `public/` - Static assets
- `firebase.jsx` - Firebase configuration
- `vite.config.js` - Vite configuration
- `eslint.config.js` - ESLint configuration

## Dependencies

### Main Dependencies

- React 19
- Firebase
- React Router DOM
- React Icons
- React Toastify
- Radix UI Dialog

### Development Dependencies

- Vite
- Vitest
- ESLint
- Testing Library

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
