import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect("/notes");
  }
  return (
    <section className="bg-gray-50 h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Smart Notes,
            <strong className="font-extrabold text-blue-700 sm:block">
              {" "}
              Smarter Insights{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Unlock the full potential of your notes. Our app combines intuitive
            note-taking with an AI chatbot that delivers insights and answers
            from within your own content.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-black">
              <Link href="/sign-in">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
