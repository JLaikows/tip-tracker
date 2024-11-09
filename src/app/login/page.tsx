"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import { authFormData } from "@/lib/types";

const defaultFormData: authFormData = {
  email: "",
  password: "",
};

export default function Home() {
  const [formData, setFormData] = useState<authFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post("/api/users", formData);
      if (data.error) {
        toast.error(data.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (e: unknown) {
      toast.error(e as string);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Panel className="b-2">
          <div className="w-full text-center p-4 text-lg font-bold">Login</div>
          <form
            className="flex flex-col gap-4 justify-items-center items-center"
            onSubmit={handleSubmit}
          >
            <InputText
              size="large"
              type="text"
              className="p-inputtext-lg p-2"
              name="email"
              variant="filled"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            <InputText
              size="large"
              className="p-inputtext-lg p-2"
              type="password"
              variant="filled"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />
            <Button
              className="p-button p-2 w-full"
              style={{ backgroundColor: "purple" }}
              size="large"
              label="Submit"
              severity="secondary"
              raised
              disabled={isSubmitting}
            />
          </form>
        </Panel>
      </main>
    </div>
  );
}
