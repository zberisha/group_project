import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomeComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="space-y-6 max-w-md mx-auto p-4">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Restaurants</CardTitle>
                            <CardDescription>
                                Check here the number of restaurants
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name </Label>
                                    <p>name of restaurant</p>
                                    
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="address">Adress</Label>
                                    <p>address of restaurant</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full">
                                        View more
                                    </Button>
                                </div>
                            </div>
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
        </div>
    );
}
export default HomeComponent;