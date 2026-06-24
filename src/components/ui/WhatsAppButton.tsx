export default function WhatsAppButton() {
  const url = "https://wa.me/919841020247?text=Hello%20Harish%20Cinemas%2C%20I%20would%20like%20to%20know%20more%20about%20your%20productions.";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 w-14 h-14 rounded-full hover:scale-115 transition-all duration-300 z-50 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center justify-center cursor-pointer hover-primary-glow animate-whatsapp-pulse"
      aria-label="Contact via WhatsApp"
    >
      <svg 
        viewBox="0 0 90 90" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer speech bubble in white providing the border tail outline */}
        <path 
          d="M90,43.841c0,24.213-19.779,43.841-44.18,43.841c-7.747,0-15.025-1.987-21.357-5.455L0,90l7.975-23.57C4.123,60.1,1.758,52.243,1.758,43.841C1.758,19.627,21.538,0,45.82,0C70.22,0,90,19.627,90,43.841z" 
          fill="#ffffff" 
        />
        
        {/* Inner official green speech bubble */}
        <path 
          d="M45.82,5.555C24.596,5.555,7.314,22.74,7.314,43.841c0,8.324,2.686,16.035,7.24,22.404L9.638,81.109l15.176-4.877c6.046,3.921,13.239,6.21,21.006,6.21c21.225,0,38.506-17.185,38.506-38.285C84.327,22.74,67.045,5.555,45.82,5.555z" 
          fill="#25D366" 
        />
        
        {/* Centered white telephone handset inside shifted to be perfectly centered */}
        <path 
          transform="translate(1.3, -1.8)"
          d="M62.33,55.445c-1.104-0.551-6.529-3.216-7.539-3.584c-1.01-0.367-1.746-0.551-2.481,0.551c-0.736,1.101-2.848,3.583-3.491,4.317c-0.643,0.735-1.286,0.827-2.39,0.276c-1.103-0.551-4.654-1.714-8.868-5.467c-3.279-2.922-5.493-6.532-6.136-7.636c-0.643-1.103-0.069-1.701,0.482-2.251c0.495-0.494,1.103-1.285,1.654-1.929c0.551-0.643,0.735-1.102,1.103-1.837c0.368-0.735,0.184-1.378-0.092-1.929c-0.276-0.551-2.481-5.972-3.399-8.176c-0.894-2.149-1.802-1.857-2.481-1.892c-0.643-0.033-1.378-0.033-2.113-0.033c-0.735,0-1.929,0.276-2.94,1.378c-1.01,1.103-3.858,3.767-3.858,9.189c0,5.421,3.951,10.658,4.502,11.393c0.552,0.735,7.776,11.876,18.839,16.65c2.631,1.135,4.686,1.813,6.29,2.322c2.673,0.849,5.105,0.729,7.025,0.443c2.143-0.318,4.594-1.746,5.237-3.447c0.643-1.699,0.643-3.155,0.459-3.447C64.352,56.73,63.433,55.996,62.33,55.445z" 
          fill="#ffffff" 
        />
      </svg>
    </a>
  );
}
