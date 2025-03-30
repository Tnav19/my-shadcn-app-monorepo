'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Badge } from '@repo/ui/components/badge';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { 
  Calendar, 
  Search, 
  Plus, 
  Filter, 
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  UserPlus,
  Users,
  Plane,
  CalendarDays,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Clock3,
  AlertCircle,
  CheckCircle,
  XCircle2,
  Clock4,
  UserCheck,
  UserX,
  PlaneTakeoff,
  PlaneLanding,
  CalendarCheck,
  CalendarX,
  CreditCardCheck,
  CreditCardX,
  MailCheck,
  MailX,
  PhoneCheck,
  PhoneX,
  MapPinCheck,
  MapPinX,
  ClockCheck,
  ClockX
} from 'lucide-react';

interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  specialRequests?: string;
  mealPreference?: string;
  seatPreference?: string;
}

interface Booking {
  id: string;
  bookingNumber: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  class: 'economy' | 'business' | 'first';
  passengers: Passenger[];
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  bookingDate: string;
  lastUpdated: string;
  specialNotes?: string;
}

const BOOKINGS: Booking[] = [
  {
    id: '1',
    bookingNumber: 'BK-2024-001',
    status: 'confirmed',
    flightNumber: 'AH123',
    origin: 'JFK',
    destination: 'LAX',
    departureDate: '2024-03-20',
    departureTime: '10:00',
    arrivalDate: '2024-03-20',
    arrivalTime: '13:00',
    class: 'business',
    passengers: [
      {
        id: 'P1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        specialRequests: 'Wheelchair assistance needed',
        mealPreference: 'Vegetarian',
        seatPreference: 'Window'
      }
    ],
    totalAmount: 1200,
    paymentStatus: 'paid',
    bookingDate: '2024-03-15',
    lastUpdated: '2024-03-15',
    specialNotes: 'VIP passenger'
  },
  {
    id: '2',
    bookingNumber: 'BK-2024-002',
    status: 'pending',
    flightNumber: 'AH456',
    origin: 'LAX',
    destination: 'ORD',
    departureDate: '2024-03-21',
    departureTime: '14:30',
    arrivalDate: '2024-03-21',
    arrivalTime: '20:00',
    class: 'economy',
    passengers: [
      {
        id: 'P2',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 234-5678',
        address: '456 Oak Ave, Los Angeles, CA 90001',
        mealPreference: 'Halal',
        seatPreference: 'Aisle'
      }
    ],
    totalAmount: 450,
    paymentStatus: 'pending',
    bookingDate: '2024-03-16',
    lastUpdated: '2024-03-16'
  },
  {
    id: '3',
    bookingNumber: 'BK-2024-003',
    status: 'cancelled',
    flightNumber: 'AH789',
    origin: 'ORD',
    destination: 'MIA',
    departureDate: '2024-03-22',
    departureTime: '09:15',
    arrivalDate: '2024-03-22',
    arrivalTime: '12:45',
    class: 'first',
    passengers: [
      {
        id: 'P3',
        name: 'Michael Brown',
        email: 'michael.b@email.com',
        phone: '+1 (555) 345-6789',
        address: '789 Pine St, Chicago, IL 60601',
        specialRequests: 'Extra legroom requested',
        mealPreference: 'Kosher',
        seatPreference: 'Front'
      }
    ],
    totalAmount: 2500,
    paymentStatus: 'refunded',
    bookingDate: '2024-03-14',
    lastUpdated: '2024-03-17',
    specialNotes: 'Cancelled due to weather'
  }
];

const STATUS_COLORS = {
  confirmed: 'bg-green-500',
  pending: 'bg-yellow-500',
  cancelled: 'bg-red-500',
  completed: 'bg-blue-500'
};

const CLASS_COLORS = {
  economy: 'bg-gray-500',
  business: 'bg-blue-500',
  first: 'bg-purple-500'
};

const PAYMENT_STATUS_COLORS = {
  paid: 'bg-green-500',
  pending: 'bg-yellow-500',
  refunded: 'bg-red-500'
};

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const filteredBookings = BOOKINGS.filter(booking => {
    const matchesSearch = booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.passengers.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !selectedStatus || booking.status === selectedStatus;
    const matchesClass = !selectedClass || booking.class === selectedClass;
    return matchesSearch && matchesStatus && matchesClass;
  });

  const confirmedBookings = BOOKINGS.filter(booking => booking.status === 'confirmed');
  const pendingBookings = BOOKINGS.filter(booking => booking.status === 'pending');
  const cancelledBookings = BOOKINGS.filter(booking => booking.status === 'cancelled');
  const totalRevenue = BOOKINGS.reduce((sum, booking) => 
    booking.paymentStatus === 'paid' ? sum + booking.totalAmount : sum, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedBookings.length}</div>
            <p className="text-xs text-muted-foreground">Active bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBookings.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledBookings.length}</div>
            <p className="text-xs text-muted-foreground">Cancelled bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Confirmed revenue</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Booking List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[booking.status]}`} />
                    <div>
                      <div className="font-medium">{booking.bookingNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        {booking.flightNumber} • {booking.origin} → {booking.destination}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {booking.departureDate} {booking.departureTime}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {booking.passengers.length} passenger{booking.passengers.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={CLASS_COLORS[booking.class]}>
                        {booking.class}
                      </Badge>
                      <Badge variant="outline" className={PAYMENT_STATUS_COLORS[booking.paymentStatus]}>
                        {booking.paymentStatus}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 