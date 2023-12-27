"use client";
import React from "react";
import signIn from "@/firebase/signin";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const formSchema = z.object({
    email: z.string().min(2).max(50).email(),
    password: z.string().min(2).max(50),
  });
  const handleForm = async (event: any) => {
    setLoading(true);
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      toast.error("Gagal Login !", {
        style: {
          borderRadius: "10px",
        },
      });
      setLoading(false);
      return console.log({ result, error });
    }

    // else successful
    console.log(result);
    setLoading(false);
    return router.push("/admin");
  };
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values.email);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    // <div className="wrapper">
    //   <div className="form-wrapper">
    //     <h1 className="mt-20 mb-10 text-3xl font-bold">Sign In</h1>
    //     <form onSubmit={handleForm} className="form">
    //       <div className="mb-4">
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium text-gray-600"
    //         >
    //           Email
    //         </label>
    //         <input
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //           type="email"
    //           name="email"
    //           id="email"
    //           placeholder="example@mail.com"
    //           className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label
    //           htmlFor="password"
    //           className="block text-sm font-medium text-gray-600"
    //         >
    //           Password
    //         </label>
    //         <input
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //           type="password"
    //           name="password"
    //           id="password"
    //           placeholder="password"
    //           className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    //         />
    //       </div>
    //       <button
    //         type="button"
    //         onClick={handleForm}
    //         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
    //       >
    //         Sign In
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white dark:bg-gray-800 lg:max-w-lg shadow-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center dark:text-white">
              Sign in
            </CardTitle>
            <CardDescription className="text-center dark:text-gray-300">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="dark:text-gray-300">
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="dark:text-gray-300">
                Password
              </Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              disabled={loading}
              onClick={handleForm}
              className="w-full bg-slate-500 dark:bg-slate-700 text-white dark:text-gray-200 dark:hover:bg-slate-800"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                "Login"
              )}
            </Button>
            <p className="mt-2 text-xs text-center text-gray-700 dark:text-gray-300">
              {" "}
              Don't have an account?{" "}
              <Link
                className="text-slate-600 hover:underline dark:text-slate-400"
                href="/signup"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;
