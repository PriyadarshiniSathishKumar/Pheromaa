
import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Shipping: React.FC = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "For domestic orders within India, standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery. International shipping typically takes 7-14 business days depending on the destination country."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping times and costs vary depending on the destination. Please note that customers are responsible for any import duties or taxes that may be imposed by their country."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you will receive a tracking number via email. You can also track your order by logging into your account on our website and viewing your order history."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 14 days of delivery for unused and unopened products in their original packaging. Please contact our customer service team to initiate a return. Note that personalized or limited edition items cannot be returned unless defective."
    },
    {
      question: "Do you offer free shipping?",
      answer: "We offer free standard shipping on all domestic orders over ₹2,999. International orders over ₹7,999 qualify for free standard international shipping."
    },
    {
      question: "What if my product arrives damaged?",
      answer: "If your product arrives damaged, please contact our customer service within 48 hours of delivery with photos of the damaged item and packaging. We will arrange for a replacement or refund."
    }
  ];

  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/shipping">Shipping & Returns</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-8 tracking-wider text-center">Shipping & Returns</h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-serif mb-6 tracking-wider">Our Shipping Policy</h2>
              <div className="bg-perfume-darkBrown rounded-lg p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-serif mb-3 text-perfume-pink">Domestic Shipping</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>Standard: 3-5 business days (₹199)</li>
                      <li>Express: 1-2 business days (₹399)</li>
                      <li>Free shipping on orders over ₹2,999</li>
                      <li>Same-day delivery available in select cities</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-3 text-perfume-pink">International Shipping</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>Standard: 7-14 business days (₹999)</li>
                      <li>Express: 3-5 business days (₹1,999)</li>
                      <li>Free shipping on orders over ₹7,999</li>
                      <li>Available to most countries worldwide</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                All orders are processed within 24-48 hours of payment confirmation. Orders placed on weekends or holidays will be processed on the next business day. Once your order ships, you will receive a tracking number via email or SMS.
              </p>
              
              <p className="text-gray-300 mb-6">
                We take special care in packaging our premium fragrances to ensure they arrive in perfect condition. Each bottle is individually wrapped and secured in custom-designed protective packaging to prevent damage during transit.
              </p>
              
              <div className="bg-perfume-darkBrown rounded-lg p-6 text-gray-300 mb-6">
                <strong className="text-white block mb-2">Please Note:</strong>
                Delivery times may vary due to customs clearance for international shipments. Customers are responsible for any import duties, taxes, or customs fees imposed by their country.
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-serif mb-6 tracking-wider">Returns & Refunds</h2>
              
              <p className="text-gray-300 mb-6">
                We want you to be completely satisfied with your PHEROMA purchase. If for any reason you're not happy with your order, we offer a straightforward return policy.
              </p>
              
              <div className="bg-perfume-darkBrown rounded-lg p-8 mb-8">
                <h3 className="text-xl font-serif mb-3">Return Eligibility:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-6">
                  <li>Returns accepted within 14 days of delivery</li>
                  <li>Products must be unused, unopened, and in original packaging</li>
                  <li>Include original receipt or proof of purchase</li>
                  <li>Personalized or limited edition items are non-returnable unless defective</li>
                </ul>
                
                <h3 className="text-xl font-serif mb-3">Refund Process:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  <li>Refunds are processed within 5-7 business days after we receive your return</li>
                  <li>Original shipping costs are non-refundable</li>
                  <li>Refunds will be issued to the original payment method</li>
                  <li>Store credit option available for returns without receipt</li>
                </ul>
              </div>
              
              <p className="text-gray-300">
                To initiate a return, please contact our customer service team at returns@pheroma.in or call +91 98765 43210. Our team will guide you through the return process and provide a return authorization number.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-serif mb-6 tracking-wider">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-perfume-darkBrown">
                    <AccordionTrigger className="text-left font-medium py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shipping;
