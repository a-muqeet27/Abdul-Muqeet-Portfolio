# Professional Portfolio Website

A modern, fully responsive portfolio website built with HTML, CSS, and JavaScript. Perfect for showcasing your skills, projects, education, and connecting with potential employers.

## Features

- ✨ Modern and attractive UI/UX design
- 📱 Fully responsive (works on all devices)
- 🎨 Smooth animations and transitions
- 🧭 Fixed navigation bar with smooth scrolling
- 📄 All sections: Home, About, Experience, Technologies, Projects, Education, Download Resume, and Connect
- 🌐 Social media integration (GitHub, LinkedIn, Email, WhatsApp)
- ⬆️ Scroll to top button
- 🎯 Active section highlighting in navigation

## Sections Included

1. **Home Section** - Profile photo and title with animated background
2. **About Me** - Personal introduction and background
3. **Experience** - Professional experience (currently shows "Fresher")
4. **Technologies & Tools** - Tech stack with icons (Flutter, HTML, CSS, JS, MongoDB, etc.)
5. **Projects** - Portfolio projects with images, descriptions, and tools used
6. **Education** - Educational background with institution logos
7. **Download Resume** - Button to download your resume/CV
8. **Let's Connect** - Social media links (GitHub, LinkedIn, Email, WhatsApp)

## Customization Guide

### 1. Update Personal Information

#### In `index.html`:

- **Profile Photo**: Replace the placeholder image URL in the home section:
  ```html
  <img src="path/to/your/photo.jpg" alt="Profile Photo" class="profile-image">
  ```

- **Name and Title**: Update in the home section:
  ```html
  <h1 class="title">Your Name</h1>
  <p class="subtitle">Your Title | Your Profession</p>
  ```

- **About Me**: Edit the text in the about section

- **Experience**: Update your experience details

### 2. Add Your Projects

Edit the projects section in `index.html`:

```html
<div class="project-card">
    <div class="project-image">
        <img src="path/to/project/image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Project description here...</p>
        <div class="project-tools">
            <span class="tool-badge">Technology 1</span>
            <span class="tool-badge">Technology 2</span>
        </div>
    </div>
</div>
```

### 3. Update Education

Replace the placeholder education cards with your actual education:

```html
<div class="education-card">
    <div class="education-image">
        <img src="path/to/university/logo.jpg" alt="University">
    </div>
    <div class="education-details">
        <h3 class="school-name">University Name</h3>
        <p class="education-level">Degree Name</p>
        <p class="education-year">Year - Year</p>
    </div>
</div>
```

### 4. Update Social Links

In the connect section, update the links:

```html
<a href="https://github.com/yourusername" target="_blank" class="social-link">
<a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link">
<a href="mailto:your.email@example.com" class="social-link">
<a href="https://wa.me/yourphonenumber" target="_blank" class="social-link">
```

### 5. Add Your Resume

1. Save your resume as `resume.pdf` in the project root directory
2. Update the download button filename in `script.js`:
   ```javascript
   link.download = 'YourName_Resume.pdf';
   ```

### 6. Customize Colors

In `styles.css`, update the CSS variables in `:root`:

```css
:root {
    --primary-color: #6366f1;    /* Your primary color */
    --secondary-color: #8b5cf6;  /* Your secondary color */
    /* ... other colors */
}
```

### 7. Add/Remove Technologies

Add or remove technology items in the technologies section. You can use Font Awesome icons or add custom SVG icons.

## File Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── resume.pdf          # Your resume (add this)
└── README.md           # This file
```

## How to Use

1. **Download/Clone** this repository
2. **Customize** all the content with your personal information
3. **Replace** placeholder images with your actual photos/project images
4. **Add** your resume PDF file
5. **Update** all social media links
6. **Test** the website in your browser
7. **Deploy** to GitHub Pages, Netlify, Vercel, or any hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (Vanilla JS)
- Font Awesome (for icons)

## Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select the main branch
4. Your site will be live at `https://yourusername.github.io/portfolio`

### Netlify
1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repository
3. Your site will be live instantly

### Vercel
1. Import your GitHub repository
2. Deploy with default settings
3. Your site will be live instantly

## Tips

- Use high-quality images (optimize them for web)
- Keep project descriptions concise and impactful
- Regularly update your projects and skills
- Test on multiple devices and browsers
- Make sure all links work correctly

## License

Feel free to use this template for your personal portfolio. Modify it as needed!

## Support

If you have any questions or need help customizing, feel free to reach out!

---

**Good luck with your portfolio! 🚀**

