"use client"
export default function Page() {
    return (
        <>
            {/* Section 1: Who We Are */}
            <section className="bg-gray-200 py-12 relative">
                {/* Background image on the right side */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-no-repeat" style={{ backgroundImage: "url('/assets/img31.png')", opacity: "0.5" }}></div>
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl text-center font-bold mb-4">Who We Are</h2>
                    <p className="text-lg text-black">
                        It is a sales platform affiliated with the NOSAFCO GROUP aimed at supporting and inspiring entrepreneurs by providing industrial machinery that supports the industrial sector and appropriate advice for business success. We understand the challenges that business owners face, and that's why our mission from the first moment is to provide valuable and practical information that anyone can benefit from, facilitating access to the necessary and diverse equipment in many fields to develop their projects.
                    </p>
                </div>
            </section>

            {/* Section 2: Why Choose Us */}
            <section className="py-12 relative">
                {/* Background image on the right side */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-no-repeat" style={{ backgroundImage: "url('/assets/img41.png')", opacity: "0.5" }}></div>
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl text-center font-bold mb-4">Why Choose Us</h2>
                    <p className="text-lg text-black">
                        We provide our services to productive families and entrepreneurs in small, micro, medium, and large enterprises to achieve the desired goals, focusing on:
                    </p>
                    <ul className="text-lg text-black list-disc pl-6 mt-4">
                        <li>Supporting productive families with ideas and products to improve the standard of living and active participation in the labor market.</li>
                        <li>Supporting entrepreneurs with ideas and products that contribute to market development.</li>
                        <li>Supporting the market with industries and consumer materials to provide the country with the largest possible amount of local manufacturing.</li>
                        <li>Success is a way to create an open market for neighboring countries and spread.</li>
                        <li>Contributing to providing job opportunities and reducing the unemployment rate.</li>
                        <li>Creating skills and training on production lines to develop youth capabilities.</li>
                        <li>Industrial diversity contributes to creating other job opportunities in the community, including advertising, marketing, logistic support, and other complementary products.</li>
                    </ul>
                    <p className="text-lg text-black mt-4">
                        We are your best choice to contribute to achieving social and financial inclusion, which in turn enhances purchasing power, improves income levels, and contributes to driving development.
                    </p>
                </div>
            </section>


            {/* Section 3: Our Values */}
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="bg-gradient-to-r from-[#E0E316] to-[#6A742B] shadow-md rounded-lg p-6 relative overflow-hidden flex flex-col items-center">
                            <img src="/assets/value1.png" alt="Value 1" className="w-1/4 mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-white text-center">Trust & Transparency</h3>
                            <p className="text-md text-white text-center">
                                We are committed to principles of transparent and honest work with our clients, partners, and employees, under the motto: Reputation is more important than money.
                            </p>
                        </div>
                        {/* Value 2 */}
                        <div className="bg-gradient-to-r from-[#6A742B] to-[#6A742B] shadow-md rounded-lg p-6 relative overflow-hidden flex flex-col items-center">
                            <img src="/assets/value2.png" alt="Value 2" className="w-1/4 mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-white text-center">Security</h3>
                            <p className="text-md text-white text-center">
                                We invest a considerable amount of time and resources to ensure the safety of our website for all our customers.
                            </p>
                        </div>
                        {/* Value 3 */}
                        <div className="bg-gradient-to-r from-[#6A742B] to-[#E0E316] shadow-md rounded-lg p-6 relative overflow-hidden flex flex-col items-center">
                            <img src="/assets/value3.png" alt="Value 3" className="w-1/4 mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-white text-center">Efficiency & Effectiveness</h3>
                            <p className="text-md text-white text-center">
                                Our dedicated team constantly works to improve the service daily, making the website more beneficial by enhancing products and updating market equipment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Section 4: Organigram */}
            <section className="py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Organigram</h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        {/* Add your organigram here */}
                        {/* You can use HTML/CSS to represent the organigram */}
                    </div>
                </div>
            </section>
        </>
    );
}
