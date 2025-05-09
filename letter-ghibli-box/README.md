# Letter Ghibli Box

A modern web application for managing and exploring Studio Ghibli movies. Built with React and TypeScript, this application allows users to browse, filter, and organize their favorite Ghibli films.

## 🚀 Features

- Browse Studio Ghibli movies with detailed information
- Search functionality (by title and synopsis)
- Multiple sorting options:
  - Title (A-Z, Z-A)
  - Duration (Shortest to Longest)
  - Rating (Highest to Lowest)
  - Score (Highest to Lowest)
- Advanced filtering system:
  - Watched movies
  - Favorites
  - Movies with notes
  - Rating filters (1-5 stars)
- Personal movie management:
  - Mark movies as watched
  - Add to favorites
  - Add personal notes
  - Rate movies (1-5 stars)
- Responsive design for all screen sizes

## 🛠️ Tools and Technologies

- **Frontend Framework:** React with TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Notifications:** Sonner
- **API Integration:** RTK Query

## 📋 Requirements

### Implemented Requirements

1. **Movie List Display**
   - Grid layout with responsive design
   - Movie cards with essential information
   - Loading states and error handling

2. **Search and Filtering**
   - Real-time search functionality
   - Multiple filter options
   - Advanced sorting capabilities

3. **User Interactions**
   - Movie rating system
   - Watch status tracking
   - Favorites management
   - Notes system

4. **UI/UX**
   - Modern and clean interface
   - Responsive design
   - Loading states
   - User feedback (toasts)

## 🚀 Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mlgonzaga/frontend-challenge-truckpag.git
   cd letter-ghibli-box
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 🧪 Running Tests

To run the test suite:

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

## 📦 Project Structure

```
src/
├── __tests__/      # Tests of some components
├── components/     # React components
├── interfaces/     # TypeScript interfaces
├── store/         # Redux store configuration
├── services/      # API services
├── slices/        # Slice to manipulate localstorage
└── utils/         # Utility functions
```


