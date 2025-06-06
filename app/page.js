import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";

export default async function Home() {
  return (
    <Container className="max-w-7xl mx-auto px-2 py-16 space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold leading-tight">
          Build scalable & beautiful apps with ease
        </h1>
        <p className="text-lg text-muted-foreground">
          Accelerate your product development using the power of React and
          shadcn/ui's neutral, accessible components.
        </p>
        <div className="space-x-4">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      <Separator />

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          {
            title: "Customizable Components",
            description:
              "Fully customizable components that adapt to your brand and style.",
            badge: "Flexible",
          },
          {
            title: "Accessibility First",
            description:
              "Designed with accessibility standards in mind to reach all users.",
            badge: "Inclusive",
          },
          {
            title: "Responsive & Modern",
            description:
              "Works seamlessly across all devices with modern styling.",
            badge: "Responsive",
          },
        ].map(({ title, description, badge }) => (
          <Card key={title} className="shadow-sm">
            <CardHeader>
              <Badge variant="secondary" className="mb-2">
                {badge}
              </Badge>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Separator />

      {/* Testimonials Section */}
      <section className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-center text-3xl font-bold">What our users say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              name: "Jane Cooper",
              role: "Product Manager",
              avatar: "/avatars/jane.jpg",
              testimonial:
                "shadcn/ui made building our dashboard so much faster. The components are clean and easy to integrate.",
            },
            {
              name: "John Smith",
              role: "Frontend Developer",
              avatar: "/avatars/john.jpg",
              testimonial:
                "I love the accessibility-first approach. It saved us hours in QA and testing.",
            },
          ].map(({ name, role, avatar, testimonial }) => (
            <Card key={name} className="shadow-md">
              <CardContent className="space-y-4">
                <p className="italic text-muted-foreground">"{testimonial}"</p>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>{name.split(" ")[0][0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-muted-foreground">{role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* FAQ Accordion Section */}
      <section className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-center text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              question: "Is shadcn/ui easy to customize?",
              answer:
                "Yes, all components are designed with customization in mind. You can easily override styles or extend functionality.",
            },
            {
              question: "Does it support dark mode?",
              answer:
                "Absolutely! The components have built-in dark mode support and adapt to your app’s theme automatically.",
            },
            {
              question: "Are the components accessible?",
              answer:
                "Yes, accessibility is a core focus. All components follow WAI-ARIA guidelines to ensure usability for everyone.",
            },
          ].map(({ question, answer }, idx) => (
            <AccordionItem value={`item-${idx}`} key={question}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>
                <p>{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Separator />

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-6">
        © {new Date().getFullYear()} Acme Inc. All rights reserved.
      </footer>
    </Container>
  );
}
