import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useToast } from "../Toast";
import { getMe, updateProfile } from "../../api/authApi";
import type { User } from "../../types";
import { CardSkeleton } from "../Skeletons";
import { ErrorState } from "../ErrorStates";

export function Settings() {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [notifSessions, setNotifSessions] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifMatches, setNotifMatches] = useState(true);

  useEffect(() => {
    getMe()
      .then((u) => {
        setUser(u);
        setName(u.name ?? "");
        setTitle(u.title ?? "");
        setLocation(u.location ?? "");
        setBio(u.bio ?? "");
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateProfile({
        name,
        title,
        location,
        bio,
        notifSessionReminders: notifSessions,
        notifNewMessages: notifMessages,
        notifMatchAlerts: notifMatches,
      });
      setUser(updated);
      toast("Settings saved successfully", "success");
    } catch {
      toast("Could not save settings. Try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[720px] mx-auto space-y-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (error || !user) {
    return (
      <ErrorState
        message="Couldn't load your settings."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="p-6 max-w-[720px] mx-auto space-y-6">
      <div>
        <h1 className="mb-2">Settings</h1>
        <p className="text-[var(--muted-foreground)]">
          Manage your profile and notification preferences
        </p>
      </div>

      <Card className="p-6 shadow-[var(--shadow-md)] space-y-4">
        <h2 className="text-lg font-medium">Profile</h2>
        <div className="space-y-2">
          <Label htmlFor="settings-name">Full name</Label>
          <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="settings-title">Title</Label>
          <Input id="settings-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="settings-location">Location</Label>
          <Input
            id="settings-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="settings-bio">Bio</Label>
          <Input id="settings-bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">Signed in as {user.email ?? user.name}</p>
      </Card>

      <Card className="p-6 shadow-[var(--shadow-md)] space-y-4">
        <h2 className="text-lg font-medium">Notifications</h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-sm">Session reminders</p>
            <p className="text-xs text-[var(--muted-foreground)]">Before upcoming sessions</p>
          </div>
          <Switch checked={notifSessions} onCheckedChange={setNotifSessions} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-sm">New messages</p>
            <p className="text-xs text-[var(--muted-foreground)]">When someone messages you</p>
          </div>
          <Switch checked={notifMessages} onCheckedChange={setNotifMessages} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-sm">Match alerts</p>
            <p className="text-xs text-[var(--muted-foreground)]">New skill match suggestions</p>
          </div>
          <Switch checked={notifMatches} onCheckedChange={setNotifMatches} />
        </div>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
