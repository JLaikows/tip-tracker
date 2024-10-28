"use client";

import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";
import { states } from "@/lib/local";
import StyledCard from "./StyledCard";
import { useClientStore } from "../hooks/clients";

const defaultPayout = {
  name: "",
  state: "NJ",
};

export default function ClientCreateForm() {
  const { addClient } = useClientStore.getState();
  const [formData, setFormData] = useState(defaultPayout);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: {
    target: { value: number | string; name: string };
  }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFormDate = () => {
    if (formData.name === "") {
      return true;
    }

    return false;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (validateFormDate()) return;

    setIsSubmitting(true);

    const { data } = await axios.post("/api/clients", { ...formData });
    if (data.error) {
      toast.error(data.error);
    } else {
      addClient(data.client);
      toast.success("Successfull Client Creation!");
    }

    setIsSubmitting(false);
  };

  return (
    <StyledCard title="Create Client">
      <form
        className="flex flex-col justify-items-left p-0 gap-8 w-11/12"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row gap-8">
          <InputText
            size={14}
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
          <Dropdown
            name="state"
            options={states}
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <Button
          className="p-button p-2 flex items-center justify-content-center"
          severity="info"
          raised
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </StyledCard>
  );
}
