"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/tabs";
import { Switch } from "@/app/components/switch";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [useApiKey, setUseApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [generatedWithoutKey, setGeneratedWithoutKey] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("Login successful", {
        username,
        password,
        apiKey: useApiKey ? apiKey : "Not provided",
      });
      setLoading(false);
      if (!useApiKey) setGeneratedWithoutKey(true);
      router.push("/report");
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      alert("You can only upload up to 10 files.");
      return;
    }
    setUploadedFiles(files);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log(
        "Files uploaded",
        uploadedFiles,
        "API Key:",
        useApiKey ? apiKey : "Not provided"
      );
      setLoading(false);
      if (!useApiKey) setGeneratedWithoutKey(true);
      router.push("/report");
    }, 1000);
  };

  return (
    <Card className="w-full mx-auto mt-8 border-0 shadow-none">
      <CardDescription className="pb-6">
        Login with your Zotero account to access the research interface
      </CardDescription>
      <Tabs defaultValue="upload">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Articles</TabsTrigger>
          <TabsTrigger value="zotero">Zotero Login</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <CardContent className="space-y-4">
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload Articles (Max 10)</Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  required
                />
              </div>
              {uploadedFiles.length > 0 && (
                <div className="text-sm text-gray-600">
                  {uploadedFiles.length} file(s) selected
                </div>
              )}
            </form>
          </CardContent>
        </TabsContent>
        <TabsContent value="zotero login">
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
            </form>
          </CardContent>
        </TabsContent>
      </Tabs>
      <div className="flex items-center space-x-2">
        <Switch
          id="use-api-key-upload"
          checked={useApiKey}
          onCheckedChange={setUseApiKey}
        />
        <Label htmlFor="use-api-key-upload">Use OpenAI API Key</Label>
      </div>
      {useApiKey && (
        <div className="space-y-2">
          <Label htmlFor="apiKeyUpload">OpenAI API Key</Label>
          <Input
            id="apiKeyUpload"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        </div>
      )}
      <div className="flex items-center space-x-2 text-sm text-amber-600">
        <AlertCircle className="h-4 w-4" />
        <p>This is a demo. Your API key and password won't be stored.</p>
      </div>
      {!useApiKey && generatedWithoutKey && (
        <p className="text-sm text-red-500">
          You've already generated once without an API key. Please provide an
          API key for further generations.
        </p>
      )}
      <CardFooter className="px-0">
        <Button
          type="submit"
          className="w-full"
          disabled={
            loading ||
            uploadedFiles.length === 0 ||
            (!useApiKey && generatedWithoutKey)
          }
        >
          {loading ? "Uploading..." : "Upload and Generate"}
        </Button>
      </CardFooter>
    </Card>
  );
}
