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

interface ApiKeySectionProps {
  useApiKey: boolean;
  setUseApiKey: (checked: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export function LoginForm({ onGenerate }) {
  const [loading, setLoading] = useState(false);
  const [useApiKey, setUseApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [generatedWithoutKey, setGeneratedWithoutKey] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (onGenerate) {
      onGenerate();
    }
  };

  return (
    <div className="max-w-md mt-20 border-0 shadow-none">
      <Tabs defaultValue="upload" className="flex flex-col justify-start">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Articles</TabsTrigger>
          <TabsTrigger value="zotero">Zotero Login</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <UploadForm />
        </TabsContent>
        <TabsContent value="zotero">
          <ZoteroForm />
        </TabsContent>
      </Tabs>
      <CardContent>
        <ApiKeySection
          useApiKey={useApiKey}
          setUseApiKey={setUseApiKey}
          apiKey={apiKey}
          setApiKey={setApiKey}
        />
        <div className="flex space-x-2 text-sm text-amber-600 mt-4">
          <AlertCircle className="h-4 w-4" />
          <p>This is a demo. Your API key and password won't be stored.</p>
        </div>
        {!useApiKey && generatedWithoutKey && (
          <p className="text-sm text-red-500 mt-2">
            You've already generated once without an API key. Please provide an
            API key for further generations.
          </p>
        )}
      </CardContent>
      <div>
        <Button
          type="submit"
          className=""
          disabled={loading || (!useApiKey && generatedWithoutKey)}
          onClick={handleSubmit}
        >
          {loading ? "Processing..." : "Generate"}
        </Button>
      </div>
    </div>
  );
}

function UploadForm() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      alert("You can only upload up to 10 files.");
      return;
    }
    setUploadedFiles(files);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <div className="text-sm text-muted-foreground m-2">
        Upload up to 10 articles in PDF, DOC, or DOCX format
      </div>
      <div>
        <Input
          id="file-upload"
          type="file"
          multiple
          className="file:cursor-pointer mb-6 w-[60%]"
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
    </div>
  );
}

function ZoteroForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-2 m-2">
      <div className="text-sm text-muted-foreground">
        Login with your Zotero account to access the research interface
      </div>
      <div>
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
    </div>
  );
}

function ApiKeySection({
  useApiKey,
  setUseApiKey,
  apiKey,
  setApiKey,
}: ApiKeySectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Switch
          id="use-api-key"
          checked={useApiKey}
          onCheckedChange={setUseApiKey}
        />
        <Label htmlFor="use-api-key">Use OpenAI API Key</Label>
      </div>
      {useApiKey && (
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
      )}
    </div>
  );
}
