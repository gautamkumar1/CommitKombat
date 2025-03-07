import React from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export function AddUserForm() {
  const [githubUsername, setGithubUsername] = React.useState("");
  const [leetcodeUsername, setLeetcodeUsername] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!githubUsername || !leetcodeUsername) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Adding user:", { githubUsername, leetcodeUsername });
      setIsSubmitting(false);
      setGithubUsername("");
      setLeetcodeUsername("");
      
      // Here you would typically add the user to your leaderboard
    }, 1500);
  };

  return (
    <section id="add-user" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border-none bg-gradient-to-br from-primary-900/20 to-secondary-900/20">
            <CardHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Add Yourself to the Roast List</h2>
              <p className="text-default-500">Enter your GitHub and LeetCode usernames to get roasted</p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="GitHub Username"
                  placeholder="e.g., octocat"
                  value={githubUsername}
                  onValueChange={setGithubUsername}
                  startContent={<Icon icon="lucide:github" />}
                  isRequired
                />
                <Input
                  label="LeetCode Username"
                  placeholder="e.g., leetcoder123"
                  value={leetcodeUsername}
                  onValueChange={setLeetcodeUsername}
                  startContent={<Icon icon="lucide:code" />}
                  isRequired
                />
                <Button 
                  type="submit" 
                  color="primary" 
                  className="mt-2"
                  startContent={<Icon icon="lucide:user-plus" />}
                  isLoading={isSubmitting}
                  isDisabled={!githubUsername || !leetcodeUsername || isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Me to the Roast"}
                </Button>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}