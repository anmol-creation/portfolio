// Sample Project Data Categorized
const websitesData = {
  templates: {
      title: "Website Templates (Full Sites)",
      description: "Complete, multi-page website templates ready for deployment.",
      projects: []
  },
  landingPages: {
      title: "Landing Pages",
      description: "High-converting, single-page designs for products and marketing campaigns.",
      projects: [
          {
            id: 1,
            title: "E-Commerce Landing Page",
            description: "A conversion-focused single page for product sales.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            liveUrl: "https://demo1.netlify.app",
            githubUrl: "https://github.com/username/project1",
            tech: ["HTML", "CSS", "JavaScript"],
            features: [
              "Product showcase",
              "Call-to-action sections",
              "Responsive design",
              "Fast loading"
            ],
            performance: {
              score: 98,
              loadTime: "0.8s",
              accessibility: 100
            },
            client: "Local Fashion Brand",
            testimonials: [
              {
                text: "The website increased our sales by 50% in the first month!",
                author: "Jane Doe, CEO"
              }
            ]
          },
          {
            id: 2,
            title: "Portfolio Landing Page",
            description: "A concise single-page personal portfolio layout.",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            liveUrl: "https://anmol-creation.github.io/portfolio/",
            githubUrl: "https://github.com/anmol-creation/portfolio",
            tech: ["HTML", "CSS", "JavaScript"],
            features: [
              "Responsive grid layout",
              "Smooth scrolling",
              "Contact form integration"
            ],
            performance: {
              score: 100,
              loadTime: "0.5s",
              accessibility: 100
            },
            client: "Self",
            testimonials: []
          },
          {
            id: 3,
            title: "App Promo Page",
            description: "A modern squeeze page to showcase and promote app downloads.",
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            liveUrl: "https://demo3.netlify.app",
            githubUrl: "https://github.com/username/project3",
            tech: ["HTML", "CSS", "JavaScript"],
            features: [
              "Feature highlights",
              "Hero section with mockup",
              "Newsletter signup"
            ],
            performance: {
              score: 95,
              loadTime: "1.2s",
              accessibility: 98
            },
            client: "Productivity Startup",
            testimonials: [
              {
                text: "Simple yet powerful tool for our team.",
                author: "John Smith, Manager"
              }
            ]
          }
      ]
  },
  uiux: {
      title: "UI/UX Designs",
      description: "Figma and Adobe XD mockups focusing purely on user interface and experience.",
      projects: []
  }
};

// Also expose a flat array for the 'website-details.html' page which looks up by ID
const websites = [
    ...websitesData.templates.projects,
    ...websitesData.landingPages.projects,
    ...websitesData.uiux.projects
];

// If using modules, export. If vanilla script tag, expose globally.
window.websitesData = websitesData;
window.websites = websites;
