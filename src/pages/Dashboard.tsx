import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, User, Phone, Truck, Hash, LogOut, Package, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DeliveryLocationDialog } from "@/components/DeliveryLocationDialog";

// Mock data
const driverInfo = {
  name: "Rajesh Kumar",
  contact: "+91 98765 43210",
  vehicleType: "Mini Truck",
  vehicleNumber: "TN 09 AB 1234",
  route: "Chennai → Coimbatore → Madurai"
};

const mockDeliveries = [
  {
    id: 1,
    cartons: 5,
    orderId: "ORD001",
    customerName: "Amit Sharma",
    customerContact: "+91 98765 11111",
    paymentStatus: "Paid",
    paymentMode: "UPI",
    deliveryAddress: "123 MG Road, T. Nagar, Chennai - 600017",
    deliveryPoint: "Main Gate, Reception Desk",
    deliveryTime: "2:00 PM - 4:00 PM"
  },
  {
    id: 2,
    cartons: 3,
    orderId: "ORD002",
    customerName: "Priya Patel",
    customerContact: "+91 98765 22222",
    paymentStatus: "Unpaid",
    paymentMode: "-",
    deliveryAddress: "456 Anna Salai, Thousand Lights, Chennai - 600006",
    deliveryPoint: "Security Office, Building A",
    deliveryTime: "10:00 AM - 12:00 PM"
  },
  {
    id: 3,
    cartons: 8,
    orderId: "ORD003",
    customerName: "Sunita Gupta",
    customerContact: "+91 98765 33333",
    paymentStatus: "Paid",
    paymentMode: "Bank Transfer",
    deliveryAddress: "789 Poonamallee High Road, Kilpauk, Chennai - 600010",
    deliveryPoint: "Loading Dock, Warehouse B",
    deliveryTime: "9:00 AM - 11:00 AM"
  },
  {
    id: 4,
    cartons: 2,
    orderId: "ORD004",
    customerName: "Vikram Singh",
    customerContact: "+91 98765 44444",
    paymentStatus: "Unpaid",
    paymentMode: "-",
    deliveryAddress: "321 GST Road, Tambaram, Chennai - 600045",
    deliveryPoint: "Front Office, 2nd Floor",
    deliveryTime: "3:00 PM - 5:00 PM"
  },
  {
    id: 5,
    cartons: 6,
    orderId: "ORD005",
    customerName: "Neha Joshi",
    customerContact: "+91 98765 55555",
    paymentStatus: "Paid",
    paymentMode: "UPI",
    deliveryAddress: "654 ECR Road, Sholinganallur, Chennai - 600119",
    deliveryPoint: "Service Entrance, Ground Floor",
    deliveryTime: "1:00 PM - 3:00 PM"
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [paymentModeFilter, setPaymentModeFilter] = useState("all");
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const [activeView, setActiveView] = useState<"driver" | "orders">("orders");
  const [selectedDelivery, setSelectedDelivery] = useState<typeof mockDeliveries[0] | null>(null);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const navigate = useNavigate();

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((delivery) => {
      const matchesSearch = 
        delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPaymentStatus = 
        paymentStatusFilter === "all" || delivery.paymentStatus === paymentStatusFilter;
      
      const matchesPaymentMode = 
        paymentModeFilter === "all" || delivery.paymentMode === paymentModeFilter;

      return matchesSearch && matchesPaymentStatus && matchesPaymentMode;
    });
  }, [searchTerm, paymentStatusFilter, paymentModeFilter, deliveries]);

  const updatePaymentStatus = (id: number, newStatus: string) => {
    setDeliveries(prevDeliveries =>
      prevDeliveries.map(delivery =>
        delivery.id === id 
          ? { 
              ...delivery, 
              paymentStatus: newStatus,
              paymentMode: newStatus === "Unpaid" ? "-" : delivery.paymentMode
            } 
          : delivery
      )
    );
  };

  const updatePaymentMode = (id: number, newMode: string) => {
    const delivery = deliveries.find(d => d.id === id);
    if (delivery?.paymentStatus === "Unpaid") return; // Don't allow mode change for unpaid orders
    
    setDeliveries(prevDeliveries =>
      prevDeliveries.map(delivery =>
        delivery.id === id ? { ...delivery, paymentMode: newMode } : delivery
      )
    );
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleViewDeliveryLocation = (delivery: typeof mockDeliveries[0]) => {
    setSelectedDelivery(delivery);
    setLocationDialogOpen(true);
  };

  const renderDriverDetails = () => (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 driver-profile-card">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-4 text-3xl font-bold text-white">
          <div className="p-3 bg-white/20 rounded-xl">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <div>Driver & Vehicle Information</div>
            <div className="text-orange-100 text-lg font-normal mt-1">Professional Driver Profile</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Driver Information Section */}
          <div className="space-y-6 driver-info-section">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg driver-avatar">
                <User className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{driverInfo.name}</h3>
              <p className="text-orange-600 font-semibold">Professional Driver</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-500" />
                Contact Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Phone</span>
                  <span className="text-gray-900 font-semibold">{driverInfo.contact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Information Section */}
          <div className="space-y-6 driver-info-section">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-orange-500" />
                Vehicle Details
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Type</span>
                  <span className="text-gray-900 font-semibold">{driverInfo.vehicleType}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Number</span>
                  <span className="text-gray-900 font-semibold font-mono">{driverInfo.vehicleNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Route Information Section */}
          <div className="space-y-6 driver-info-section">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Hash className="h-5 w-5 text-orange-500" />
                Route Information
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <div className="text-blue-600 font-semibold mb-2">Current Route</div>
                    <div className="text-gray-800 font-medium text-sm leading-relaxed">{driverInfo.route}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-md border border-green-200 status-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-green-800 mb-2">Active Status</h4>
                <p className="text-green-600 font-medium">Currently On Route</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderOrderDetails = () => (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-red-500">
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-sm">Order Management</h1>
                <p className="text-orange-100 text-lg font-medium">Manage and track delivery orders</p>
              </div>
            </div>
            <div className="text-right text-white">
              <div className="text-3xl font-bold drop-shadow-sm">{filteredDeliveries.length}</div>
              <div className="text-orange-100 font-medium">Total Orders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters Card */}
      <Card className="shadow-md border-0 bg-white order-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Section */}
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <Input
                placeholder="Search by customer name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-gray-200 focus:border-orange-500 focus:ring-orange-500 search-input"
              />
            </div>
            
            {/* Filters Section */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 filter-select">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={paymentModeFilter} onValueChange={setPaymentModeFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 filter-select">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Payment Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Inventory Card */}
      <Card className="shadow-lg border-0 bg-white overflow-hidden order-card">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
          <CardTitle className="text-xl font-semibold text-orange-900 flex items-center gap-2">
            <Package className="h-5 w-5 text-orange-600" />
            Product Inventory
          </CardTitle>
          <p className="text-gray-600 text-sm">View and manage all your cracker products</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto table-responsive">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">#</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center">Cartons</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Order ID</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Contact</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center">Payment</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.map((delivery) => (
                  <TableRow key={delivery.id} className="table-row-hover">
                    <TableCell className="font-medium text-gray-900 py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-sm">{delivery.id}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex justify-center">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-semibold px-3 py-1 status-badge">
                          {delivery.cartons} 📦
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-orange-600">{delivery.orderId}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-gray-900">{delivery.customerName}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{delivery.customerContact}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex justify-center">
                        <Select
                          value={delivery.paymentStatus}
                          onValueChange={(value) => updatePaymentStatus(delivery.id, value)}
                        >
                          <SelectTrigger className="w-[120px] h-9 border-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Paid">
                              <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                            </SelectItem>
                            <SelectItem value="Unpaid">
                              <Badge className="bg-red-100 text-red-800 border-red-200">Unpaid</Badge>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex justify-center">
                        {delivery.paymentStatus === "Unpaid" ? (
                          <span className="text-gray-400 text-sm">-</span>
                        ) : (
                          <Select
                            value={delivery.paymentMode}
                            onValueChange={(value) => updatePaymentMode(delivery.id, value)}
                          >
                            <SelectTrigger className="w-[140px] h-9 border-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cash">Cash</SelectItem>
                              <SelectItem value="UPI">UPI</SelectItem>
                              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDeliveryLocation(delivery)}
                          className="h-9 w-9 p-0 hover:bg-orange-100 hover:text-orange-600 action-button"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDeliveries.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <SidebarInset className="flex-1">
          <div className="p-4">
            <div className="max-w-7xl mx-auto space-y-6 pl-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />
                </div>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>

              {/* Content based on active view */}
              {activeView === "driver" ? renderDriverDetails() : renderOrderDetails()}
            </div>
          </div>
        </SidebarInset>
        
        <DeliveryLocationDialog
          open={locationDialogOpen}
          onOpenChange={setLocationDialogOpen}
          delivery={selectedDelivery}
        />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;