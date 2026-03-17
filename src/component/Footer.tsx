export default function Footer() {
  return (
    <footer
      className="bg-[#131122] pt-16 pb-8 border-t border-gray-800"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
              <span className="font-bold text-xl text-white">MosherBLOX</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Platform game terbaik untuk melatih kecerdasan dan ketangkasan
              Anda dengan cara yang menyenangkan.
            </p>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Quick Links</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Explore Games
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  About Company
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div id="contact">
            <h5 className="text-white font-bold mb-6">Contact Us</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center space-x-3">
                <span className="text-emerald-500">📞</span>
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-blue-500">✉️</span>
                <span>support@playwell.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Follow Us</h5>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://discord.gg/e2rZHehZDX"
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.369A19.791 19.791 0 0 0 15.885 3c-.191.343-.403.805-.552 1.169a18.27 18.27 0 0 0-6.666 0A12.64 12.64 0 0 0 8.115 3a19.736 19.736 0 0 0-4.433 1.369C.533 9.104-.32 13.724.099 18.285A19.9 19.9 0 0 0 6.1 21c.486-.665.92-1.37 1.296-2.116a12.93 12.93 0 0 1-2.036-.977c.171-.124.338-.252.5-.384 3.927 1.845 8.18 1.845 12.061 0 .163.132.33.26.5.384-.65.386-1.33.714-2.036.977.376.746.81 1.451 1.296 2.116a19.91 19.91 0 0 0 6.001-2.715c.5-5.298-.838-9.876-3.365-13.916zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.095 2.157 2.419 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.095 2.157 2.419 0 1.334-.947 2.419-2.157 2.419z" />
                </svg>
              </a>
              <a
                href="https://chat.whatsapp.com/BEzavrCGLl62Cc7M44LEuh"
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.55 2 2.08 6.47 2.08 11.96c0 1.9.5 3.75 1.46 5.39L2 22l4.76-1.5a9.9 9.9 0 0 0 5.28 1.53h.01c5.49 0 9.96-4.47 9.96-9.96S17.53 2 12.04 2zm0 18.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-2.83.89.92-2.76-.2-.32a8.07 8.07 0 0 1-1.24-4.27c0-4.47 3.64-8.11 8.11-8.11s8.11 3.64 8.11 8.11-3.64 8.11-8.11 8.11zm4.43-6.05c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.1-.1.24-.26.36-.38.12-.12.16-.2.24-.34.08-.14.04-.26-.02-.38-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.04.4 1.4.52.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>&copy; 2024 Playwell Games. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>English (US)</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
