"use client";
import React from "react";
import { AuthContainer } from "../inputs";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ContactForm = () => {
  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: "name must be at least 2 characters.",
    }),
    phoneNumber: z
      .string()
      .min(11, {
        message: "Please enter a valid phone number, it should be at least 11",
      })
      .refine((value) => /^\+?\d{1,3}[- ]?\d{3,}-?\d{4,}$/i.test(value), {
        message: "Please enter a valid phone number.",
      }),
    message: z.string(),
  });
  const defaultValues: z.infer<typeof formSchema> = {
    fullName: "",
    phoneNumber: "",
    message: "",
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    mode:"onTouched"
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8 lg:w-[70%] pb-16"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="lg:border-b lg:border-b-sharon ">
              <FormLabel className="text-base">Full Name:</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  className="h-[90%] pt-2 lg:pt-0 pl-2 lg:pl-0 focus-visible:border-none focus-visible:outline-none border-none focus-visible:ring-0 bg-none focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="lg:border-b lg:border-b-sharon">
              <FormLabel className="text-base">Phone Number:</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  className="h-[90%] pt-2 lg:pt-0 pl-2 lg:pl-0 focus-visible:border-none focus-visible:outline-none border-none focus-visible:ring-0 bg-none focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="lg:border-b lg:border-b-sharon">
              <FormLabel className="text-base">Message:</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  className="h-[90%] pt-2 lg:pt-0 pl-2 lg:pl-0 focus-visible:border-none focus-visible:outline-none border-none focus-visible:ring-0 bg-none focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-[227px] rounded-[4px]">
          {/* {loading === "loading" ? (
            <span className="flex items-center">
              {" "}
              <TailSpin
                height={18}
                width={18}
                color="#FFF"
                ariaLabel="loading"
                radius={"2"}
              />{" "}
              <span className="ml-2">Submitting</span>
            </span>
          ) : ( */}
          Contact Us
          {/* )} */}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
