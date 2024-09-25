''
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { Label } from "@/app/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/app/components/card";
import { AlertCircle } from "lucide-react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate an API call
    setLoading(true);
    setTimeout(() => {
      console.log("Login successful", { username, password, apiKey });
      setLoading(false);
      // Redirect to the report page after "successful login"
      navigate("/report");
    }, 1000); // Simulate a 1-second delay for the API call

    // Reset form fields after submission
    setUsername("");
    setPassword("");
    setApiKey("");
  };

  return (
    <Card className="w-full mx-auto mt-8 border-0 shadow-none">
      <CardDescription className="pb-6">
        Login with your Zotero account to access the research interface
      </CardDescription>
      <CardContent className="px-0 flex">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-amber-600">
            <AlertCircle className="h-4 w-4" />
            <p>This is a demo. Your API key and password won't be stored.</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="px-0">
        <Button type="submit">Generate</Button>
      </CardFooter>
    </Card>
  );
}
