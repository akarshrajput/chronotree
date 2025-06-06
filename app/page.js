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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "./_components/main/footer";

export default async function Home() {
  return (
    <Container className="max-w-7xl mx-auto px-2 pt-20 space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold leading-tight">
          Preserve Your Legacy. Secure Your Story for Eternity.
        </h1>
        <p className="text-lg text-muted-foreground">
          Chronotree empowers you to document family histories, create encrypted
          memory vaults, build interactive family trees, and preserve your
          stories for future generations.
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
            title: "Encrypted Memory Vaults",
            description:
              "Store videos, letters, and personal messages to be opened by loved ones in the future.",
            badge: "Security",
          },
          {
            title: "Interactive Family Trees",
            description:
              "Drag-and-drop interface to build, expand, and visually map family connections.",
            badge: "Preserve",
          },
          {
            title: "Genetic Lineage",
            description:
              "Connect family tree data with DNA kits for verified family branches.",
            badge: "Coming Soon",
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

      <section className="w-full px-4 py-16 bg-background">
        <h2 className="text-center text-3xl font-bold mb-10">
          Explore ChronoTree
        </h2>

        <Tabs defaultValue="vaults" className="w-full max-w-5xl mx-auto">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
            <TabsTrigger value="vaults">Vaults</TabsTrigger>
            <TabsTrigger value="trees">Family Trees</TabsTrigger>
            <TabsTrigger value="diaries">Memorial Diaries</TabsTrigger>
            <TabsTrigger value="future">Time Capsules</TabsTrigger>
          </TabsList>

          <TabsContent value="vaults">
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4 text-center md:text-left">
                <h3 className="text-xl font-semibold">Secure Legacy Vaults</h3>
                <p className="text-muted-foreground leading-relaxed text-balance">
                  ChronoTree Vaults are secure digital spaces where users can
                  store heartfelt messages, important documents, photos, and
                  videos for loved ones. These vaults are encrypted and
                  accessible only by designated family members.
                </p>
                <p className="text-muted-foreground text-sm">
                  You can set up custom release dates, passcode protection, and
                  even time-delayed messages for future generations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trees">
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4 text-center md:text-left">
                <h3 className="text-xl font-semibold">Dynamic Family Trees</h3>
                <p className="text-muted-foreground leading-relaxed text-balance">
                  Build your family history with our intuitive drag-and-drop
                  tree builder. Add names, life stories, photos, and connections
                  across generations.
                </p>
                <p className="text-muted-foreground text-sm">
                  Each member's profile can include their biography, legacy
                  notes, and even interactive timelines, preserving memories
                  that last forever.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diaries">
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4 text-center md:text-left">
                <h3 className="text-xl font-semibold">Memorial Diaries</h3>
                <p className="text-muted-foreground leading-relaxed text-balance">
                  Capture your thoughts, experiences, and life reflections in a
                  beautifully styled digital diary. Each entry is private,
                  secure, and can be shared posthumously.
                </p>
                <p className="text-muted-foreground text-sm">
                  Customize diary covers, organize by chapter, and optionally
                  include audio or video entries for a deeply personal touch.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="future">
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4 text-center md:text-left">
                <h3 className="text-xl font-semibold">Time Capsules</h3>
                <p className="text-muted-foreground leading-relaxed text-balance">
                  Send messages to the future with our Time Capsules. Whether
                  it’s a birthday greeting 10 years from now or a life lesson
                  for your grandchildren, ChronoTree makes it possible.
                </p>
                <p className="text-muted-foreground text-sm">
                  Choose recipients, lock release dates, and preserve emotions
                  in a truly timeless way.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />
      <section className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-center text-3xl font-bold">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              name: "Jane Cooper",
              role: "Product Manager",
              avatar: "/avatars/jane.jpg",
              testimonial:
                "ChronoTree gave my family the gift of connection. My kids now know their great-grandparents' stories, all in one place.",
            },
            {
              name: "Fatima Khan",
              role: "Historian & Archivist",
              avatar: "/avatars/fatima.jpg",
              testimonial:
                "As someone who studies lineage and memory, ChronoTree is the first platform that balances emotional depth with technical rigor.",
            },
            {
              name: "Alex Chen",
              role: "Software Architect",
              avatar: "/avatars/alex.jpg",
              testimonial:
                "ChronoTree’s encrypted memory vaults are incredible. I left time-locked messages for my kids—it’s like digital immortality.",
            },
            {
              name: "Maya Patel",
              role: "Legacy Coach",
              avatar: "/avatars/maya.jpg",
              testimonial:
                "This platform makes memorializing stories meaningful, secure, and accessible. It's perfect for families and legacy advisors.",
            },
          ].map(({ name, role, avatar, testimonial }) => (
            <Card key={name} className="shadow-sm">
              <CardContent className="space-y-4">
                <p className=" text-sm text-muted-foreground">
                  &quot;{testimonial}&quot;
                </p>
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
      {/* Stats Section */}

      <div className="flex flex-col justify-center items-center">
        <section className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { value: "50K+", label: "Families Preserved" },
            { value: "1M+", label: "Memories Stored" },
            { value: "99.99%", label: "Uptime for Secure Vaults" },
          ].map(({ value, label }) => (
            <Card key={label} className="p-6 shadow-sm">
              <CardContent>
                <p className="text-4xl font-bold">{value}</p>
                <p className="text-muted-foreground mt-2">{label}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
      <Separator />

      {/* FAQ Accordion Section */}
      <section className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-center text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              question: "Is ChronoTree secure for storing personal memories?",
              answer:
                "Absolutely. All data is encrypted using modern standards, and only you or designated members can access vaults.",
            },
            {
              question:
                "Can I build a family tree without technical knowledge?",
              answer:
                "Yes! ChronoTree offers a drag-and-drop builder designed for ease of use, even for non-tech-savvy users.",
            },
            {
              question: "Can I share my family tree or keep it private?",
              answer:
                "You have full control. You can make your tree public, private, or share it selectively with certain people.",
            },
            {
              question: "Are there limits to how much content I can store?",
              answer:
                "All paid plans offer generous storage. For personal archives or family vaults, there's plenty of room—and upgrades available.",
            },
            {
              question: "Can I add voice notes or video messages to the vault?",
              answer:
                "Yes! You can upload photos, videos, voice recordings, documents, and even set time-locked delivery for the future.",
            },
            {
              question: "Does ChronoTree support dark mode and mobile devices?",
              answer:
                "ChronoTree is responsive and optimized for all screens. It also supports dark mode and accessibility standards.",
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

      {/* Footer */}
      <Footer />
    </Container>
  );
}
