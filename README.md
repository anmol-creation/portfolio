# anmolcreations

A personal portfolio website showcasing sketches, digital art, photography, and videography. The site features a clean, minimal design with a focus on visual content.

## 🚀 Features

- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Dynamic Gallery:** Sketch Art gallery powered by Cloudinary and a Node.js backend.
- **Lightbox Integration:** Full-screen image viewing with navigation support.
- **Theme Toggle:** Supports both Light and Dark modes with user preference persistence.
- **Performance:** Lazy loading and optimized image delivery.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Cloud:** Cloudinary (Image Hosting & Optimization)

## ⚙️ Installation & Setup

To run this project locally, you'll need Node.js installed on your machine.

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd anmolcreations
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory. You can copy the structure from the example below:

    ```env
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    PORT=3000
    ```

    > **⚠️ IMPORTANT:** You must manually replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with your actual Cloudinary credentials. The application will **not** fetch images without them.

    > **Note:** For the *Sketch Art* gallery to work, ensure you have a folder named `Sketches` in your Cloudinary Media Library.

4.  **Start the Server:**
    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`. Open your browser and navigate to this URL to view the site.

## 📂 Project Structure

```
anmolcreations/
├── css/                # Stylesheets (Global and Page-specific)
├── js/                 # Client-side JavaScript
│   ├── sketch-art.js   # Fetches images from backend API
│   └── ...
├── server.js           # Express Backend for Cloudinary API proxy
├── .env                # Local secrets (git-ignored)
├── index.html          # Home Page
├── portfolio.html      # Portfolio Hub
├── sketch-art.html     # Sketch Gallery Page
└── package.json        # Node.js dependencies
```

## 🔒 Security

This project uses a backend proxy (`server.js`) to interact with the Cloudinary API. This ensures that sensitive API keys (`CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) are **never exposed** to the client browser.

## 📄 License

[Include License Here, e.g., MIT]
