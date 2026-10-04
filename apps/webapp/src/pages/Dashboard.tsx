import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

export function Dashboard() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-lg">
        This is the placeholder for the Dashboard page.
      </p>
      <Link to="/">
        <Button variant="outline">Back to Home</Button>
      </Link>
    </Layout>
  );
}
