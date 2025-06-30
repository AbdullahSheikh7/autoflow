"use client";

import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EditUserProfileSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { User } from "@/generated/prisma";

type Props = {
  user: User | null;
  onUpdate: (name: string) => Promise<User | null>;
};

const ProfileForm = ({ user, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [buttonContent, setButtonContent] = useState("Loading");
  const [userName, setUserName] = useState<string>("");

  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof EditUserProfileSchema>
  ) => {
    setIsLoading(true);
    await onUpdate(values.name);
    setUserName(values.name);
    setIsNameChanged(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      setButtonContent("Saving");
      setIsLoading(false);
      setUserName(user.name || "");
    }
    form.reset({ name: user?.name || "", email: user?.email });
  }, [user]);

  const [isNameChanged, setIsNameChanged] = useState<boolean>(false);

  const name = form.watch("name");

  useEffect(() => {
    setIsNameChanged(name !== userName);
  }, [name]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">User full name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">User email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="self-start hover:bg-[#2F006B] bg-white hover:text-white"
          disabled={isLoading || !isNameChanged}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {buttonContent}
            </>
          ) : (
            "Save User Settings"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
