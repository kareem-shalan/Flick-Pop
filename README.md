# 🎬 Movie App

A responsive and feature-rich movie discovery application built with React and Vite, allowing users to browse, search, and manage their favorite movies.

## 🌐 Live Demo

**Website**: [https://movie-app-website1.netlify.app/](https://flick-pop.vercel.app/)  

## 📱 Screenshots
![FullView](./src//assets/FullView.png)  

## 🚀 Features

- **Home Page**: Browse currently playing movies with pagination
- **Search Functionality**: Find movies by title with real-time results
- **Movie Details**: Comprehensive information including cast, trailers, and production details
- **Watchlist**: Save and manage favorite movies
- **Responsive Design**: Optimized for all device sizes
- **Fast Development**: Built with Vite for optimal performance

## 🛠️ Technologies & Libraries

- **Build Tool**: Vite 7.1.2
- **Frontend Framework**: React 19.1.1
- **Routing**: React Router DOM 7.8.2
- **Styling**: Bootstrap 5.3.8 + React Bootstrap 2.10.10
- **Icons**: React Icons 5.5.0 (FaHeart, IoHeartDislikeOutline, RxCaretLeft, etc.)
- **API**: The Movie Database (TMDB) API
- **State Management**: React Context API + useState/useEffect hooks
- **Notifications**: React Hot Toast 2.6.0
- **Linting**: ESLint 9.33.0

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/MoKhaled2/Movies.git
cd movie-app
```

2. Create a `.env` file in the root directory and add your API key:
```env
VITE_API_KEY=your_api_key_here
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Build Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🔑 How to Get a TMDB API Key

1. Go to [TMDB website](https://www.themoviedb.org/).
2. Create a free account or log in if you already have one.
3. Navigate to **Settings** → **API** section.
4. Click **Create** or **Request API Key**.
5. Copy your generated API key.
6. Add it to your `.env` file like this:
   ```env
   VITE_API_KEY=your_api_key_here
   ```

## 📱 Usage

- Browse movies on the home page
- Use the search bar to find specific movies
- Click on any movie to view detailed information
- Add/remove movies from your watchlist using the heart icon
- Access your watchlist from the navigation menu

## 🎨 Design Features

- Responsive grid layout using Bootstrap
- Custom rating indicators with color coding
- Hover effects and animations
- Glassmorphism design elements
- Professional color scheme with yellow accent colors
- Optimized performance with Vite's fast build system

## 📄 API Endpoints Used

- `GET /movie/now_playing` - Fetch currently playing movies
- `GET /movie/{id}` - Get detailed movie information
- `GET /search/movie` - Search for movies by title

## 🔮 Future Enhancements

- User authentication system
- Movie reviews and ratings
- Social features (sharing, following)
- Advanced filtering options
- Dark/light theme toggle

---

**Note**: This application is for educational purposes and uses The Movie Database API. Please respect API rate limits and terms of service.

## 📝 Project Structure

```
src/
├── components/
│   ├── Loading.jsx
│   ├── MovieCard.jsx
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   └── WatchListCard.jsx
├── context/
│   └── WatchListContext.js
├── pages/
│   ├── Home.jsx
│   ├── InfoPage.jsx
│   ├── Search.jsx
│   └── WatchList.jsx
├── App.jsx
└── main.jsx
```

## 🗂️ File Organization

- **Components**: Reusable UI elements (`/src/components/`)
- **Pages**: Main view components (`/src/pages/`)
- **Context**: Global state management (`/src/context/`)
- **Entry Points**: `App.jsx` (main application) and `main.jsx` (React DOM rendering)
