import { Card, CardContent } from "@repo/ui/components/card";
import { Calendar } from "@repo/ui/components/calendar";
import Link from "next/link";
import Image from "next/image";

const newsItems = [
  {
    title: "Employee Happiness Conference 2023",
    subtitle: "Registration is on",
    image: "/conference.jpg",
    href: "/news/conference-2023"
  },
  {
    title: "Bring your dog to the office day is back!",
    subtitle: "Join us with your furry friends",
    image: "/dog-day.jpg",
    href: "/news/dog-day"
  },
  {
    title: "New well-being packages",
    subtitle: "Take care of yourself",
    image: "/wellbeing.jpg",
    href: "/news/wellbeing"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">What&apos;s new</h1>
      
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.subtitle}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Events</h2>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Applications</h2>
            <div className="space-y-2">
              <Link href="/my-profile" className="block p-2 hover:bg-gray-100 rounded-md">
                My Profile
              </Link>
              <Link href="/safe-aq" className="block p-2 hover:bg-gray-100 rounded-md">
                Safe AQ
              </Link>
              <Link href="/jira" className="block p-2 hover:bg-gray-100 rounded-md">
                Jira
              </Link>
              <Link href="/mail" className="block p-2 hover:bg-gray-100 rounded-md">
                Mail
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contacts</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image
                    src="/avatar1.jpg"
                    alt="Martin Coles"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Martin Coles</p>
                  <p className="text-sm text-gray-500">+000 111 222 333</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image
                    src="/avatar2.jpg"
                    alt="Adrien Wilson"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Adrien Wilson</p>
                  <p className="text-sm text-gray-500">+000 111 222 444</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 