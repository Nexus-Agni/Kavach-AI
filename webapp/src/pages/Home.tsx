import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

export function Home() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Welcome to Kavach</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-lg">
        Automated security analysis for public GitHub repositories.
      </p>
      <Link to="/dashboard">
        <Button size="lg">Go to Dashboard</Button>
      </Link>
    </Layout>
  );
}
