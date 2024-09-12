"use client";

import axios from "axios";
import Image from "next/image";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(e: any) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log({ email });
    const { data } = await axios.post("/api/users", { email });
    if (data.error) {
      toast.error(data.error);
    } else {
      console.log(data);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Panel header="Login" className="b-2">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputText
              size="large"
              placeholder="Email"
              onChange={handleChange}
              value={email}
            />
            <Button size="large" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        </Panel>
      </main>
    </div>
  );
}
