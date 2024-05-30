"use client";
import Anouncements from "@/components/Anouncements";
import { SectionCards } from "@/components/SectionCards";
import { Categories } from "@/components/categories";
import { useNewProducts, useRelevantProducts } from "@/hooks/productsHooks/products";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { BUSSINESS } from "@/constants";

export default function Home() {
  const { products: relevantProducts, isLoading: isLoadingRelevantProducts } = useRelevantProducts();
  const { products: newerProducts, isLoading: isLoadingNewerProducts } = useNewProducts();

  useEffect(() => {
    if (BUSSINESS) {
      redirect("/products");
    }
  }, []);

  return (
    <>
      <div>
        <Anouncements />
        
        <SectionCards
          title="New Products"
          description="Discover our newest collection of products!"
          cards={relevantProducts}
          isLoading={isLoadingRelevantProducts}
        />
        <div className="relative py-2">
          <div className="absolute inset-0">
            <img src="/assets/bg4.jpg" className="w-full h-full object-cover" alt="Background" />
          </div>
          <div className="relative container mx-auto space-y-10 p-10 sm:flex sm:flex-row sm:items-center sm:justify-center sm:space-x-44 sm:p-16">
            <div>
              <img src="/assets/img1.png" width={500} alt="Picture" />
            </div>
            <div className="space-y-8 md:space-y-8 md:flex md:flex-col md:justify-center">
              <div className="font-bold text-white text-4xl text-center md:text-left">
                Who we are ?
              </div>
              <div className="text-center text-white md:text-left md:w-96">
                NOSAFCO STORE is a sales platform affiliated with the NOSAFCO GROUP aimed at supporting and inspiring entrepreneurs by providing industrial machinery that supports the industrial sector, along with appropriate advice for business success. We understand the challenges that business owners face.
              </div>
              <div className="flex justify-center sm:justify-start">
                <button className="bg-[#6A742B] text-white rounded-md h-10 w-32 hover:bg-[#E0E316]">
                  Explore Story
                </button>
              </div>
            </div>
          </div>
        </div>

        <Categories />

        <SectionCards
          title="Lines of Production"
          description="Start your project with our full service plans!"
          cards={newerProducts}
          isLoading={isLoadingNewerProducts}
        />
      </div>

      {/* Two-grid section with a background image */}
      <div className="bg-cover bg-center py-16" style={{ backgroundImage: "url('/assets/img7.png')" }}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4 text-white">
            <h2 className="text-5xl font-bold text-center">We are your perfect choice</h2>
            <p className="text-xl">Experience culinary excellence crafted by master chefs from around the globe. Our team of culinary virtuosos brings together expertise, innovation, and passion to create unforgettable dining experiences that redefine gastronomy.</p>
            <ul className="text-l pl-5 space-y-2">
              <li><input type="checkbox" className="custom-checkbox" checked readOnly /> Supporting entrepreneurs with ideas and products that contribute to market development.</li>
              <li><input type="checkbox" className="custom-checkbox" checked readOnly /> Supporting the market with industries and consumer materials to provide the country with the largest possible amount of local manufacturing.</li>
              <li><input type="checkbox" className="custom-checkbox" checked readOnly /> Creating skills and training on production lines to develop youth capabilities.</li>
              <li><input type="checkbox" className="custom-checkbox" checked readOnly /> Contributing to providing job opportunities and reducing the unemployment rate.</li>
              <li><input type="checkbox" className="custom-checkbox" checked readOnly /> Success is a way to create an open market for neighboring countries and spread.</li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img src="/assets/img2.png" alt="Description" className="w-3/4" />
          </div>
        </div>
      </div>

      {/* Stat cards section */}
      <div className="relative py-12 bg-gradient-to-r from-[#6A742B] to-[#E0E316]">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("/assets/img6.png")' }}></div>

        {/* Content */}
        <div className="container mx-auto relative z-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Check ou Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white shadow-lg rounded-lg text-center">
              <img src="/assets/stat2.png" alt="Stat 1" className="mx-auto mb-2 w-20 h-20" />
              <h3 className="text-lg font-bold">250+</h3>
              <p className="text-lg mt-1">Satisfied Clients</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg text-center">
              <img src="/assets/quality.png" alt="Stat 2" className="mx-auto mb-2 w-20 h-20" />
              <h3 className="text-lg font-bold">26+</h3>
              <p className="text-lg mt-1">Years of Experience</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg text-center">
              <img src="/assets/stat3.png" alt="Stat 3" className="mx-auto mb-2 w-20 h-20" />
              <h3 className="text-lg font-bold">27</h3>
              <p className="text-lg mt-1">Prizes Awarded</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg text-center">
              <img src="/assets/stat4.png" alt="Stat 4" className="mx-auto mb-2 w-20 h-20" />
              <h3 className="text-lg font-bold">43+</h3>
              <p className="text-lg mt-1">Daily Orders</p>
            </div>
          </div>
          </div>
        </div>
    

      {/* Blog section */}
      <div className="py-16 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8">Check our latest Articles</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Replace with your blog cards */}
          <div className="p-8 bg-white shadow-lg rounded-lg animate__animated animate__fadeInUp">
            <h3 className="text-xl font-bold flex items-center">
              <img src="/assets/blog.svg" alt="Icon" className="w-10 h-10 mr-2" />
              Empowering Entrepreneurs:
            </h3>
            <p className="mt-4">Dive into how NOSAFCO Store, backed by the esteemed NOSAFCO Group, is revolutionizing the industrial sector. Discover how we provide not just machinery but also invaluable consultations and ongoing support to propel your business forward.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold flex items-center">
              <img src="/assets/blog2.svg" alt="Icon" className="w-10 h-10 mr-2" />
              Beyond Sales:
            </h3>
            <p className="mt-4">Explore how NOSAFCO Store goes above and beyond traditional sales platforms. From market updates to maintenance services, we're dedicated to ensuring our customers have everything they need for sustained success in their ambitious industrial projects.</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold flex items-center">
              <img src="/assets/blog3.svg" alt="Icon" className="w-10 h-10 mr-2" />
              Building Tomorrow's Innovators:
            </h3>
            <p className="mt-4">Uncover how NOSAFCO Store isn't just about selling equipment – it's about fostering innovation and progress in society. Learn how our mission to support entrepreneurs with impactful projects is shaping a brighter future for industries worldwide.</p>
          </div>
        </div>
      </div>


      {/* Newsletter section */}
      <section className="relative flex flex-col items-center justify-center bg-gradient-to-r from-[#6A742B] to-[#E0E316] space-y-5 p-10 sm:flex sm:flex-col sm:items-center sm:justify-center sm:space-y-5 sm:p-10">
        {/* Background image */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/img6.png')" }}></div>

        {/* Content */}
        <div className="relative z-10 text-[#ffff] text-center">
          <div className="text-xl">Subscribe to Newsletter</div>
          <div className="font-bold text-4xl">Subscribe to receive daily news</div>
        </div>

        {/* Form */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="rounded-lg">
            <form className="flex">
              <input
                type="email"
                className="w-72 h-10 pl-4 text-base font-semibold bg-white text-black rounded-l-lg sm:w-96 sm:h-10 sm:pl-4 sm:text-base sm:font-semibold sm:bg-white sm:rounded-l-lg"
                placeholder="Email here"
                required
              />
              <button
                type="submit"
                className="p-2 font-semibold text-white bg-[#6A742B] rounded-tr-lg rounded-br-lg hover:bg-[#E0E316]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>



      {/* Customer reviews section */}
      <div className="py-16 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8">What our Customers say ?</h2>
        <div className="container mx-auto relative">
          {/* Slider for customer reviews */}
          <div className="flex items-center justify-between overflow-hidden">
            <div className="flex gap-8 animate-slide">
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's support is unparalleled! They've helped us navigate industry changes with ease!"</p>
                <p className="mt-4 font-bold text-center">Ahmed El-Sayed</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's solutions are incredible! Their professionalism and dedication are evident!"</p>
                <p className="mt-4 font-bold text-center">Marie Dupont</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"The quality of Nosafco's machinery is top-notch. It's been a game-changer for our production!"</p>
                <p className="mt-4 font-bold text-center">John Smith</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Professionalism and dedication shine through in every project with Nosafco!"</p>
                <p className="mt-4 font-bold text-center">Fatima Al-Najjar</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's strategic support has transformed our business!"</p>
                <p className="mt-4 font-bold text-center">Pierre Martin</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's dedication shines through in every project. Highly recommended!"</p>
                <p className="mt-4 font-bold text-center">Emily Johnson</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's machinery has helped us meet our targets consistently!"</p>
                <p className="mt-4 font-bold text-center">Youssef Hassan</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"The exceptional quality of Nosafco's machines has helped us achieve our production goals!"</p>
                <p className="mt-4 font-bold text-center">Isabelle Laurent</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco provides comprehensive solutions that drive real results!"</p>
                <p className="mt-4 font-bold text-center">Michael Brown</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's strategic business planning has helped us keep up with changes!"</p>
                <p className="mt-4 font-bold text-center">Layla Hussein</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's machinery has been a game-changer for us!"</p>
                <p className="mt-4 font-bold text-center">Amina Khalil</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco is an invaluable partner for our business!"</p>
                <p className="mt-4 font-bold text-center">Sophie Dubois</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Exceptional quality and reliability from Nosafco"</p>
                <p className="mt-4 font-bold text-center">David Wilson</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's machinery is the best! It has helped us achieve our production goals!"</p>
                <p className="mt-4 font-bold text-center">Nour Ali</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco offers comprehensive solutions that produce real results!"</p>
                <p className="mt-4 font-bold text-center">Jean-Pierre Lefevre</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's professionalism is unmatched. They truly care about their clients!"</p>
                <p className="mt-4 font-bold text-center">Sarah Williams</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Dedication and professionalism in every project with Nosafco!"</p>
                <p className="mt-4 font-bold text-center">Khaled Omar</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's business plans are essential for our success!"</p>
                <p className="mt-4 font-bold text-center">Claire Moreau</p>
              </div>
              <div className="flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg flex-none w-80">
                <p className="text-lg text-center">"Nosafco's support has been crucial in navigating industry changes!"</p>
                <p className="mt-4 font-bold text-center">James Miller</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Contact form section */}
      <div className="relative py-16 bg-gradient-to-r from-[#6A742B] to-[#E0E316]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6A742B] to-[#E0E316]"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/img6.png')" }}></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <form className="font-bold text-white space-y-2">
              <div>
                <label className="text-lg block mb-2">Full Name</label>
                <input type="text" className="w-full p-3 border rounded-lg text-black" />
              </div>
              <div>
                <label className="text-lg block mb-2">Email</label>
                <input type="email" className="w-full p-3 border rounded-lg text-black" />
              </div>
              <div>
                <label className="text-lg block mb-2">Phone Number</label>
                <input type="Phone" className="w-full p-3 border rounded-lg text-black" />
              </div>
              <div>
                <label className="text-lg block mb-2">Message</label>
                <textarea className="w-full p-3 border rounded-lg text-black" rows={5}></textarea>
              </div>
              <button type="submit" className="w-full p-3 bg-[#6A742B] text-lg text-white rounded-lg hover:bg-[#E0E316]">
                Send Message
              </button>
            </form>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Locations</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-6">
                    <img src="/assets/world.svg" alt="Location 1 Icon" className="w-10 h-10" />
                    <div className="text-white">
                      <h4 className="text-lg font-bold text-black">The Main Center :</h4>
                      <p>China - Guangzhou, La Paz Tower, 16 Freedom Street, 5th floor, Office 112. Phone and WhatsApp: +861945546633</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-6">
                    <img src="/assets/world.svg" alt="Location 2 Icon" className="w-10 h-10" />
                    <div className="text-white">
                      <h4 className="text-lg font-bold text-black">Branch 01 :</h4>
                      <p>United Arab Emirates - Dubai, Al Maktoum Street, Moscow Plaza Tower, 9th floor, Office No. 95. Phone and WhatsApp: +971506031323</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-6">
                    <img src="/assets/world.svg" alt="Location 3 Icon" className="w-10 h-10" />
                    <div className="text-white">
                      <h4 className="text-lg font-bold text-black">Branch 02 :</h4>
                      <p>Ivory Coast – Abidjan, Cocody Phone and WhatsApp: +2250778736698</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Contact Us on our Social Media</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-3">
                    <img src="/assets/facebook logo.svg" alt="Facebook" className="w-8 h-8" />
                  </a>
                  <a href="#" className="p-3">
                    <img src="/assets/twitter.svg" alt="Twitter" className="w-8 h-8" />
                  </a>
                  <a href="#" className="p-3">
                    <img src="/assets/instagram logo.svg" alt="Instagram" className="w-8 h-8" />
                  </a>
                  <a href="#" className="p-3">
                    <img src="/assets/linkedin logo.svg" alt="LinkedIn" className="w-8 h-8" />
                  </a>
                  <a href="#" className="p-3">
                    <img src="/assets/tiktok.svg" alt="TikTok" className="w-8 h-8" />
                  </a>
                  <a href="#" className="p-3">
                    <img src="/assets/whatsapp.svg" alt="WhatsApp" className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* Partners image slider section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Meet our success Partners</h2>
        <div className="container mx-auto">
          {/* Replace with your image slider component */}
          <div className="flex justify-center gap-8 overflow-x-auto">
            <img src="/assets/part1.png" alt="Partner 1" className="h-24 hover:opacity-80 transition-opacity duration-300" />
            <img src="/assets/part2.png" alt="Partner 2" className="h-24 hover:opacity-80 transition-opacity duration-300" />
            <img src="/assets/part3.png" alt="Partner 3" className="h-24 hover:opacity-80 transition-opacity duration-300" />
            <img src="/assets/part4.png" alt="Partner 4" className="h-24 hover:opacity-80 transition-opacity duration-300" />
          </div>
        </div>
      </div>

    </>
  );
}
