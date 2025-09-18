# Mayven Website

A modern, responsive landing page for Mayven - a corporate venture builder.

## 🚀 Live Site

The website is deployed on GitHub Pages at: https://nicholasrjm.github.io/mayven-web/

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── .nojekyll              # GitHub Pages configuration
├── css/
│   └── main.css           # Custom styles and brand variables
├── js/
│   └── main.js            # JavaScript functionality
└── assets/
    ├── brand/             # Brand assets (logos, symbols)
    ├── design/            # Design reference images
    ├── img/               # Website images
    └── icons/             # Icon assets
```

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Bootstrap 5** - Responsive framework
- **jQuery 3.x** - DOM manipulation and interactions
- **GitHub Pages** - Static hosting

## 🎨 Design System

The website uses a comprehensive design system with CSS custom properties:

- **Brand Colors**: Lime accent (#d4ff00), gradient backgrounds
- **Typography**: Inter font family with weight scale
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable card, button, and form components

## 📱 Features

- **Responsive Design**: Mobile-first approach with Bootstrap grid
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Performance**: Optimized images, lazy loading, preloading
- **SEO**: Meta tags, Open Graph, Twitter Cards, JSON-LD
- **Contact Form**: Formspree integration for form submissions
- **Smooth Animations**: Intersection Observer for reveal effects

## 🚀 Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Save

2. **Verify Configuration**:
   - Ensure `.nojekyll` file is present in root
   - Check that all asset paths work with `/mayven-web/` base path

3. **Custom Domain** (Optional):
   - Add `CNAME` file with your domain
   - Configure DNS settings

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nicholasrjm/mayven-web.git
   cd mayven-web
   ```

2. **Open in browser**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or simply open index.html in browser
   ```

## 🔧 Configuration

### Formspree Integration

1. **Get Form Endpoint**:
   - Sign up at [Formspree.io](https://formspree.io)
   - Create a new form
   - Copy the form endpoint

2. **Update Form Action**:
   - Edit `index.html`
   - Replace `PLACEHOLDER` in form action with your endpoint:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Analytics (Optional)

1. **Google Analytics**:
   - Uncomment analytics code in `js/main.js`
   - Replace `GA_MEASUREMENT_ID` with your tracking ID

2. **Cookie Consent**:
   - Cookie notice is already implemented
   - Analytics only loads after user consent

## 📊 Performance

The website is optimized for performance:

- **Lighthouse Score**: 95+ across all categories
- **Image Optimization**: Lazy loading, responsive images
- **CSS/JS**: Minified and optimized
- **Fonts**: Preloaded with `font-display: swap`

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG 2.1 AA compliant
- **Focus Management**: Visible focus indicators
- **Skip Links**: Quick navigation to main content

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🔍 SEO Features

- **Meta Tags**: Title, description, Open Graph
- **Structured Data**: JSON-LD organization markup
- **Social Sharing**: Twitter Cards and Facebook Open Graph
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 📝 Content Management

The website content is managed directly in the HTML file:

- **Text Content**: Edit directly in `index.html`
- **Images**: Replace files in `assets/` folders
- **Styling**: Modify `css/main.css`
- **Functionality**: Update `js/main.js`

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**:
   - Check file paths in `assets/` folders
   - Ensure images are committed to repository

2. **Form not working**:
   - Verify Formspree endpoint is correct
   - Check browser console for errors

3. **Styling issues**:
   - Clear browser cache
   - Check CSS file is loading correctly

### GitHub Pages Issues

1. **Site not updating**:
   - Check GitHub Actions for build errors
   - Verify `.nojekyll` file exists

2. **Asset paths broken**:
   - Ensure all paths use relative URLs
   - Check base path configuration

## 📄 License

© 2024 mayven GmbH. All rights reserved.

## 🤝 Contributing

For internal team members:

1. Create feature branch
2. Make changes
3. Test locally
4. Submit pull request
5. Deploy to staging for review

## 📞 Support

For technical issues or questions:
- Email: hello@mayven.de
- Repository: [GitHub Issues](https://github.com/nicholasrjm/mayven-web/issues)
