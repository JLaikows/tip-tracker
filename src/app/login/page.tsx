"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post("/api/users", { email });
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
        <Panel header="Login" className="b-2">
          <form
            className="flex flex-col gap-4 justify-items-center items-center"
            onSubmit={handleSubmit}
          >
            <InputText
              size="large"
              placeholder="Email"
              onChange={handleChange}
              value={email}
            />
            <Button
              className="p-button p-2"
              size="large"
              severity="info"
              raised
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </form>
        </Panel>
      </main>
    </div>
  );
}
