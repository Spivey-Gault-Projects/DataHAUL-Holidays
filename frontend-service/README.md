# DataHaul Holidays Frontend Service

A React-based frontend application for exploring public holidays worldwide, built with Material UI and connected to a .NET backend API.

## Overview

This frontend application provides an interactive interface for users to:

- Browse upcoming public holidays worldwide
- Search holidays by country and year
- View long weekend information
- Compare holiday counts between countries
- Check if today is a holiday in a selected country

## Key Features

- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Calendar Views**: Multiple calendar display options
- **Data Visualization**: Charts for holiday comparisons
- **Real-time Data**: Fetches from backend API service
- **Modern UI**: Built with Material UI components

## Component Architecture

### Core Components

1. **ExplorerSection** (`ExplorerSection.tsx`)

   - _User Perspective_: Main dashboard with tabs for different holiday views
   - _Technical_: Manages state and coordinates data fetching between components

2. **SearchPanel** (`SearchPanel.tsx`)

   - _User Perspective_: Search form for selecting country and year
   - _Technical_: Controlled form component with autocomplete

3. **HeroSection** (`HeroSection.tsx`)
   - _User Perspective_: Welcome banner with app title
   - _Technical_: Stateless presentation component with gradient background

### Feature Components

1. **TodayCard** (`TodayCard.tsx`)

   - _User Perspective_: Shows whether today is a holiday in selected country
   - _Technical_: Uses React Query for data fetching

2. **CompareSection** (`CompareSection.tsx`)

   - _User Perspective_: Compares holiday counts between countries
   - _Technical_: Uses Recharts for data visualization

3. **HolidaysSection** (`HolidaysSection.tsx`)

   - _User Perspective_: Displays list of holidays in card format
   - _Technical_: Responsive grid layout with interactive cards

4. **LongWeekendsTable** (`LongWeekendsSection.tsx`)
   - _User Perspective_: Shows upcoming long weekends
   - _Technical_: Formats date ranges and calculates durations

### Calendar Components

1. **UpcomingCalendar** (`UpcomingCalendar.tsx`)

   - _User Perspective_: 7-day view of upcoming holidays
   - _Technical_: Groups holidays by day in a responsive grid

2. **YearCalendar** (`YearCalendar.tsx`)
   - _User Perspective_: 12-month view of holidays
   - _Technical_: Wrapper for react-big-calendar with custom configuration

### Detail Components

1. **DetailedHolidayView** (`DetailedHolidayView.tsx`)

   - _User Perspective_: Shows detailed holiday information in drawer
   - _Technical_: Receives data via props from parent

2. **LongWeekendDetail** (`LongWeekendDetail.tsx`)
   - _User Perspective_: Shows detailed long weekend information
   - _Technical_: Formats dates and calculates duration

## API Integration

The frontend communicates with the backend via `holidaysApi.ts`, which provides:

- `fetchHolidays()` - Gets holidays for specific year/country
- `fetchCountries()` - Gets list of supported countries
- `fetchLongWeekends()` - Gets long weekend data
- `fetchIsTodayPublicHoliday()` - Checks if today is a holiday
- `fetchNextWorldwide()` - Gets upcoming worldwide holidays
- `fetchNext365()` - Gets next year of holidays for country

All API calls use Axios and are integrated via React Query for caching and state management.

## Setup Instructions

### Prerequisites

- Node.js 20 or 22
- Yarn or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```sh
   yarn install
   # or
   npm install
   ```
3. Configure environment variables:
   echo "REACT_APP_API_BASE_URL=http://localhost:5000" > .env
4. Start the development server:
   yarn start

   # or

   npm start

## Development Notes

### Uses Material UI theming system for consistent styling

### Implements responsive design principles

### Follows React best practices with functional components and hooks

### Uses TypeScript for type safety

### Implements React Query for data fetching and caching

## TODOs & Future Improvements

### Add user authentication

### Implement holiday favorites/saving

### Add more advanced filtering options

### Improve mobile experience

### Add unit and integration tests
