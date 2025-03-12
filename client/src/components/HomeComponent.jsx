import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const HomeComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="space-y-6 max-w-md mx-auto p-4">
                <Card className="p-5"> {/* Added padding here */}
                    <CardHeader>
                        <CardTitle>Restaurants</CardTitle>
                        <CardDescription>
                            Check here the number of restaurants
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Responsive grid layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First restaurant card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Restaurant 1</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-3">
                                        <Label>Name</Label>
                                        <p>name of restaurant</p>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>Address</Label>
                                        <p>address of restaurant</p>
                                    </div>
                                    <Button className="w-full mt-3">View more</Button>
                                </CardContent>
                            </Card>

                            {/* Second restaurant card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Restaurant 2</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-3">
                                        <Label>Name</Label>
                                        <p>name of restaurant</p>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>Address</Label>
                                        <p>address of restaurant</p>
                                    </div>
                                    <Button className="w-full mt-3">View more</Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Add restaurant link */}
                        <div className="mt-4 text-center text-sm">
                            Want to add your restaurant?{" "}
                            <a href="/register" className="underline underline-offset-4">
                                Add
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HomeComponent;
