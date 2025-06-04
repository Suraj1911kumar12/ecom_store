"use client";

import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  LogOut,
  CreditCard,
  HelpCircle,
  Lock,
  X,
  Plus,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const AccountPage = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data
  const user = {
    name: "Alexandra Chen",
    email: "alexandra.chen@example.com",
    joinDate: "Member since June 2022",
    avatar: "/placeholder-avatar.jpg",
    orders: 12,
    wishlist: 8,
  };

  const accountTabs = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "orders", icon: ShoppingBag, label: "Orders" },
    { id: "wishlist", icon: Heart, label: "Wishlist" },
    { id: "payments", icon: CreditCard, label: "Payments" },
    { id: "security", icon: Lock, label: "Security" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile and preferences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <Card className="lg:w-1/4 h-fit sticky top-8">
            <div className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <p className="text-muted-foreground text-sm mt-1">
                {user.joinDate}
              </p>
            </div>

            <Separator className="my-2" />

            <nav className="p-2">
              {accountTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  className={`w-full justify-start mb-1 ${
                    activeTab === tab.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-4 w-4 mr-3" />
                  {tab.label}
                  {tab.id === "orders" && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {user.orders}
                    </span>
                  )}
                  {tab.id === "wishlist" && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {user.wishlist}
                    </span>
                  )}
                </Button>
              ))}
            </nav>

            <Separator className="my-2" />

            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </Card>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        First Name
                      </label>
                      <div className="p-3 border rounded-md">Alexandra</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Last Name
                      </label>
                      <div className="p-3 border rounded-md">Chen</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Email
                      </label>
                      <div className="p-3 border rounded-md">{user.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Phone
                      </label>
                      <div className="p-3 border rounded-md">
                        +1 (555) 123-4567
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">
                      Shipping Address
                    </h3>
                    <div className="p-4 border rounded-md">
                      <p className="font-medium">Alexandra Chen</p>
                      <p className="text-muted-foreground">123 Luxury Avenue</p>
                      <p className="text-muted-foreground">Penthouse 42</p>
                      <p className="text-muted-foreground">
                        New York, NY 10001
                      </p>
                      <p className="text-muted-foreground">United States</p>
                    </div>
                  </div>

                  <Button className="px-8">Save Changes</Button>
                </div>
              </Card>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Order History</h2>

                  <div className="space-y-6">
                    {[1, 2, 3].map((order) => (
                      <div key={order} className="border rounded-lg p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <div>
                            <p className="font-medium">
                              Order #LXM{1000 + order}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Placed on June {10 + order}, 2023
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <Badge
                              variant={order === 1 ? "default" : "secondary"}
                            >
                              {order === 1 ? "Delivered" : "Shipped"}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden">
                            <Image
                              src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"
                              alt="Product"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">
                              Premium Leather Crossbody Bag
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Qty: 1
                            </p>
                          </div>
                          <div className="ml-auto">
                            <p className="font-medium">$161.49</p>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Track Order
                          </Button>
                          {order === 1 && (
                            <Button variant="default" size="sm">
                              Buy Again
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Your Wishlist</h2>
                  <p className="text-muted-foreground mb-6">
                    {user.wishlist} {user.wishlist === 1 ? "item" : "items"}{" "}
                    saved
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="border rounded-lg p-4">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-24 rounded-md overflow-hidden">
                            <Image
                              src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"
                              alt="Product"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">
                              Premium Leather Crossbody Bag
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                              Luxemart
                            </p>
                            <p className="font-medium">$161.49</p>
                            <p className="text-sm text-muted-foreground line-through">
                              $189.99
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <X className="h-4 w-4 mr-2" /> Remove
                          </Button>
                          <Button size="sm" className="flex-1">
                            <ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">
                    Payment Methods
                  </h2>

                  <div className="space-y-6">
                    <div className="border rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-6 w-6" />
                          <span className="font-medium">
                            VISA ending in 4242
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expires 04/2025
                      </p>
                    </div>

                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">
                    Account Security
                  </h2>

                  <div className="space-y-6">
                    <div className="border rounded-lg p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Lock className="h-5 w-5" />
                          <span className="font-medium">Password</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Last changed 3 months ago
                      </p>
                    </div>

                    <div className="border rounded-lg p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5" />
                          <span className="font-medium">
                            Two-Factor Authentication
                          </span>
                        </div>
                        <Switch />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">
                    Account Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Theme</p>
                            <p className="text-sm text-muted-foreground">
                              Customize your interface
                            </p>
                          </div>
                          {/* <ThemeToggle /> */}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Language</p>
                            <p className="text-sm text-muted-foreground">
                              English (United States)
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Change
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Order updates, promotions, etc.
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Order updates and delivery alerts
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
