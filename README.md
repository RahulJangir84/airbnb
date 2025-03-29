# Airbnb Clone Project

A Node.js-based Airbnb clone application that allows users to browse, book, and manage property listings.

## Features

- User authentication
- Property listing management
- Favorites system
- Booking functionality
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd airbnb4
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```bash
MONGODB_URI=your_mongodb_connection_string_here
PORT=3000
NODE_ENV=development
```

4. Start the application:
```bash
npm start
```

## Environment Variables

Create a `.env` file with the following variables:
- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Project Structure

```
airbnb4/
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # Application routes
├── utils/          # Utility functions
├── views/          # EJS templates
└── public/         # Static files
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
