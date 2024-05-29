export function Footer() {
  return (
    <footer className="bg-[#f3f4f6] py-6">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around sm:items-center">
          <div className="flex flex-col sm:justify-center sm:items-center">
            <div
              style={{
                maxHeight: "210px",
                maxWidth: "250px",
              }}>
              <img
                width={308}
                height={154}
                src="/assets/logo1.png"
                alt="Logo"
              />
            </div>

            <p className="text-sm font-semibold text-gray-800 mb-2">
              Contact Us
            </p>
            <div className="flex space-x-4">
              <img
                width={25}
                height={25}
                src="/assets/Facebook logo.svg"
                alt="Logo"
              />
              <img
                width={25}
                height={25}
                src="/assets/Instagram logo.svg"
                alt="Logo"
              />
              <img
                width={25}
                height={25}
                src="/assets/linkedin logo.svg"
                alt="Logo"
              />
              <img
                width={25}
                height={25}
                src="/assets/twitter.svg"
                alt="Logo"
              />
              <img
                width={25}
                height={25}
                src="/assets/tiktok.svg"
                alt="Logo"
              />
              <img
                width={25}
                height={25}
                src="/assets/whatsapp.svg"
                alt="Logo"
              />
              <img
                width={25}
                height={25}
                src="/assets/snapchat.svg"
                alt="Logo"
              />
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h6 className="text-sm font-semibold text-gray-800 mb-2">
                Accueil
              </h6>
              <ul className="text-sm text-gray-600">
                <li className="mb-1">Catégories</li>
                <li className="mb-1">Nouveaux</li>
                <li className="mb-1">Promotions</li>
              </ul>
            </div>
            <div>
              <h6 className="text-sm font-semibold text-gray-800 mb-2">
                Catégories
              </h6>
              <ul className="text-sm text-gray-600">
                <li className="mb-1">Categories</li>
                <li className="mb-1">Nouveaux</li>
                <li className="mb-1">Promotions</li>
              </ul>
            </div>
            <div>
              <h6 className="text-sm font-semibold text-gray-800 mb-2">
                Promotions
              </h6>
              <ul className="text-sm text-gray-600">
                <li className="mb-1">Nouveaux</li>
                <li className="mb-1">Promotions</li>
              </ul>
            </div>
            <div>
              <h6 className="text-sm font-semibold text-gray-800 mb-2">
                Contact
              </h6>
              <ul className="text-sm text-gray-600">
                <li className="mb-1">A Propos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
