"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function EditProfileDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "Lewis Webber",
    username: "lewiswebber",
    bio: "NFT collector and enthusiast. Love discovering unique digital art and building my collection. Always looking for rare finds!",
  })

  const handleSave = () => {
    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated.",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-4 border-foreground rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-4 border-foreground rounded-xl font-bold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="font-bold">
              Username
            </Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="border-4 border-foreground rounded-xl font-bold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="font-bold">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="border-4 border-foreground rounded-xl font-bold min-h-[100px]"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1 border-4 border-foreground rounded-full font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
