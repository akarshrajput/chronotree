"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { LoadingSpinner } from "../main/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const fetchUserData = async (userId) => {
  const res = await axios.get(`/api/users/${userId}`);
  return res.data.data;
};

const CurrentUserProfile = ({ session }) => {
  const userId = session?.user?.userId;

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserData(userId),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: (userData) => axios.patch(`/api/users/${userId}`, userData),
    onSuccess: () => toast.success("Profile Updated successfully!"),

    onError: () => toast.error("Error while Updating!"),
  });

  const [formData, setFormData] = useState(null); // Start as null to differentiate loading

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        userName: user.userName || "",
        email: user.email || "",
        photo: user.photo || "",
        verified: user.verified || false,
        role: user.role || "user",
        occupation: user.occupation || "",
        bio: user.bio || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        gender: user.gender || "",
        socialLinks: user.socialLinks || [],
        memorialEnabled: user.memorialEnabled || false,
        legacyStory: user.legacyStory || "",
        language: user.language || "en",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading || !formData) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner className="h-6 w-6" />
      </div>
    );
  }
  if (isError) return <div>Error loading profile</div>;

  return (
    <form onSubmit={handleSubmit} className="md:px-6 px-4">
      <div className="mb-4 flex items-center gap-8">
        <Avatar className="h-20 w-20 rounded-full">
          <AvatarImage src={formData.photo} alt={formData.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Badge variant="secondary">{formData.name}</Badge>
            {formData.verified ? (
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <BadgeCheckIcon />
                Verified
              </Badge>
            ) : null}
          </div>
          <Badge variant="secondary">@{formData.userName}</Badge>
          <Badge variant="secondary">{formData.email}</Badge>
          {/* <AgeFromDate
            className="border text-xs rounded-lg p-0.5 px-2 w-fit bg-stone-50"
            dob={formData.dateOfBirth}
          /> */}
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <div className="mt-2">
        <Label classname="text-sm mb-1 font-semibold">Bio</Label>
        <Textarea
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="resize-none h-24 mt-1"
        />
      </div>

      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Label classname="text-sm mb-1 font-semibold">Name</Label>
          <Input
            className="mt-1"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label classname="text-sm mb-1 font-semibold">Date of Birth</Label>
          <Input
            className="mt-1"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label classname="text-sm mb-1 font-semibold">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(val) => handleSelectChange("gender", val)}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select Gender">
                {formData.gender ? formData.gender : "Select Gender"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label classname="text-sm mb-1 font-semibold">Language</Label>
          <Input
            className="mt-1"
            name="language"
            value={formData.language}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label classname="text-sm mb-1 font-semibold">Occupation</Label>
          <Input
            className="mt-1"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <Label classname="text-sm mb-1 font-semibold">Legacy Story</Label>
        <Textarea
          name="legacyStory"
          rows={6}
          value={formData.legacyStory}
          onChange={handleChange}
          className="resize-none h-36 mt-1"
        />
      </div>

      <div className="mt-4">
        <Button variant="secondary" type="submit" className="cursor-pointer">
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default CurrentUserProfile;
