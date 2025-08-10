# Matrix Portfolio

A modern, minimal portfolio website built with Next.js, Convex, and ShadCN UI. Features real-time data synchronization, image compression, and a beautiful dark theme.

## ✨ Features

- **Real-time Database**: Powered by Convex for instant data sync
- **Image Management**: Automatic compression and optimization
- **Modern UI**: Dark theme with glassmorphism effects
- **Responsive Design**: Works perfectly on all devices
- **Project Gallery**: Beautiful project showcase with image galleries
- **Smooth Animations**: Custom cursor, shimmer effects, and micro-interactions

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Convex (Database + Real-time API)
- **UI Components**: ShadCN UI
- **Animations**: Framer Motion, Custom CSS animations
- **Image Processing**: Canvas API for compression

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd matrix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```
   This will:
   - Create a new Convex project
   - Generate the necessary environment variables
   - Deploy your schema to the cloud

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🌐 Environment Variables

The following environment variables are automatically created by Convex:

```env
CONVEX_DEPLOYMENT=dev:your-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

## 📊 Database Schema

### Projects Table
- `title`: Project name
- `leader`: Team leader (optional)
- `category`: Project category
- `description`: Project description
- `cover`: Cover image URL
- `images`: Array of gallery image URLs
- `links`: Object with `live` and `github` URLs
- `tech`: Array of technologies used
- `duration`: Project duration (optional)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🔧 API Functions

### Queries
- `list()` - Get all projects
- `get(id)` - Get single project
- `getByCategory(category)` - Get projects by category
- `getCategories()` - Get all unique categories
- `getRecent(limit)` - Get recent projects
- `search(search, category)` - Search projects

### Mutations
- `create(projectData)` - Create new project
- `update(id, updates)` - Update project
- `remove(id)` - Delete project

## 🎨 Customization

### Adding New Projects
1. Go to `/projects` page
2. Click "Add Project"
3. Fill in the form with:
   - Project title and description
   - Cover image (automatically compressed)
   - Gallery images (max 3, automatically compressed)
   - Category and team leader
   - Live and GitHub URLs

### Styling
- Theme colors are defined in `app/globals.css`
- Component styles use Tailwind CSS classes
- Custom animations in `components/magic/`

## 🚀 Deployment

### Vercel Deployment
1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Set environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_CONVEX_URL`: Your Convex production URL

3. **Deploy Convex to production**
   ```bash
   npx convex deploy --prod
   ```

### Manual Deployment
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔍 Development

### Running Locally
```bash
# Terminal 1: Start Convex dev server
npx convex dev

# Terminal 2: Start Next.js dev server
npm run dev
```

### Database Management
- **Dashboard**: https://dashboard.convex.dev
- **Data Browser**: View and edit data in real-time
- **Function Logs**: Monitor API calls and errors

## 📱 Features in Detail

### Image Management
- Automatic compression to 800px max dimension
- JPEG quality reduced to 70% for optimal file size
- Support for both cover and gallery images
- Fallback images for missing content

### Real-time Features
- Instant project updates across all users
- Live data synchronization
- Optimistic updates for better UX

### Performance
- Image compression reduces storage costs
- Efficient queries with proper indexing
- Lazy loading for better page performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: [Convex Docs](https://docs.convex.dev)
- **Community**: [Convex Community](https://convex.dev/community)
- **Issues**: Create an issue in this repository

---


