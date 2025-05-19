
import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you will receive a tracking number via email. You can also log into your account and view the status of your order under 'Order History'."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location."
        },
        {
          question: "How long does shipping take?",
          answer: "Domestic shipping within India takes 3-5 business days. Express shipping options are available at checkout. International shipping typically takes 7-14 business days."
        },
        {
          question: "What is your return policy?",
          answer: "We accept returns within 14 days of delivery for unused and unopened products in their original packaging. Please contact our customer service team to initiate a return."
        }
      ]
    },
    {
      category: "Products & Fragrances",
      questions: [
        {
          question: "Are your perfumes tested on animals?",
          answer: "No, PHEROMA is a cruelty-free brand. We do not test our products on animals, nor do we work with suppliers who conduct animal testing."
        },
        {
          question: "How long do your fragrances last?",
          answer: "Our Eau de Parfum formulations typically last 6-8 hours on skin, though this can vary based on individual skin chemistry and environmental factors."
        },
        {
          question: "What's the difference between Eau de Parfum and Eau de Toilette?",
          answer: "Eau de Parfum (EDP) contains a higher concentration of fragrance oils (15-20%) compared to Eau de Toilette (EDT, 5-15%). This means EDP typically has a stronger scent and lasts longer on the skin."
        },
        {
          question: "Are your fragrances vegan?",
          answer: "Most of our fragrances are vegan. We clearly indicate which products contain animal-derived ingredients on our product pages."
        }
      ]
    },
    {
      category: "Account & Payment",
      questions: [
        {
          question: "How do I create an account?",
          answer: "You can create an account by clicking 'Login' at the top right corner of our website and then selecting 'Create Account'. You'll need to provide your name, email address, and create a password."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit/debit cards (Visa, MasterCard, American Express), UPI, net banking, and popular wallets like PayTM and PhonePe. All payments are secured with industry-standard encryption."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We do not store your full credit card details on our servers."
        },
        {
          question: "Can I change my shipping address after placing an order?",
          answer: "Address changes are possible only if the order has not yet been processed. Please contact our customer service team immediately if you need to change your shipping address."
        }
      ]
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
                <BreadcrumbLink href="/faq">FAQ</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-8 tracking-wider text-center">Frequently Asked Questions</h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-lg mx-auto mb-16"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search our FAQ..."
                  className="bg-perfume-darkBrown border-perfume-darkBrown focus:ring-perfume-pink pl-12"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </motion.div>
            
            <div className="space-y-12">
              {faqs.map((category, index) => (
                <motion.div 
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                >
                  <h2 className="text-2xl font-serif mb-6 tracking-wider">{category.category}</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${category.category}-${faqIndex}`} className="border-perfume-darkBrown">
                        <AccordionTrigger className="text-left font-medium py-4">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-300 pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 text-center bg-perfume-darkBrown p-8 rounded-lg"
            >
              <h2 className="text-2xl font-serif mb-4 tracking-wider">Didn't Find Your Answer?</h2>
              <p className="text-gray-300 mb-6">
                Our customer support team is here to help you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-black hover:bg-gray-100">
                  Contact Support
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Live Chat
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
