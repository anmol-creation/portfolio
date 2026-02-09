// Sample Project Data
const websites = [
    {
      id: 1,
      title: "E-Commerce Store",
      description: "Full online store with cart & checkout functionality.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://demo1.netlify.app",
      githubUrl: "https://github.com/username/project1",
      tech: ["HTML", "CSS", "JavaScript", "Netlify"],
      features: [
        "Product catalog with filtering",
        "Shopping cart management",
        "Secure checkout process",
        "User authentication"
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
      title: "Portfolio Website",
      description: "A personal portfolio to showcase creative work.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://anmol-creation.github.io/portfolio/",
      githubUrl: "https://github.com/anmol-creation/portfolio",
      tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      features: [
        "Responsive grid layout",
        "Dark/Light theme toggle",
        "Dynamic content loading",
        "Smooth scrolling"
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
      title: "Task Management App",
      description: "A productivity tool for managing daily tasks.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://demo3.netlify.app",
      githubUrl: "https://github.com/username/project3",
      tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      features: [
        "Add, edit, delete tasks",
        "Drag and drop reordering",
        "Due date reminders",
        "Progress tracking"
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
];

// If using modules, export. If vanilla script tag, expose globally.
// Since the prompt asks for vanilla JS and existing structure seems to use script tags:
window.websites = websites;
