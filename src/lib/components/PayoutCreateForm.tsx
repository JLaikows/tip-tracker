"use client";

import axios from "axios";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Panel } from "primereact/panel";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { states } from "@/lib/local";
import { client } from "@prisma/client";

const now = new Date(Date.now());

const defaultPayout = {
  amount: 0,
  taxable: false,
  state: "NJ",
  date: now.toISOString().slice(0, 10),
  client: "",
  owed: 0,
};

export default function PayoutCreateForm() {
  const [formData, setFormData] = useState(defaultPayout);
  const [clients, setClients] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (name: string) => (e: InputNumberChangeEvent) => {
    setFormData({ ...formData, [name]: e.value });
  };

  const handleOriginalChange = (e: {
    target: { value: number | string; name: string };
  }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFormDate = () => {
    if (formData.client === "") {
      return true;
    }

    return false;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (validateFormDate()) return;

    setIsSubmitting(true);

    const { data } = await axios.post("/api/payouts", { ...formData });
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Successfull Payout!");
    }

    setIsSubmitting(false);
  };

  const setData = useCallback(
    (newClients: string[]) => {
      setFormData({ ...formData, client: newClients[0] });
    },
    [formData]
  );

  useEffect(() => {
    const getClientList = async () => {
      const { data } = await axios.get("/api/clients");

      const newClients: string[] = data.clients.map(
        (client: client) => client.name
      );

      if (!newClients.length) {
        setIsSubmitting(true);
        toast.error("No Clients Found");
        toast.error("Please create a client to continue");
      }

      setData(newClients);
      setClients(newClients);
    };
    getClientList();
  }, [setData]);

  return (
    <Panel
      header="Add Payout"
      className="b-2 min-h-96 w-11/12 border-2 rounded-md"
    >
      <form
        className="flex flex-col justify-items-left p-0 gap-8 w-11/12"
        onSubmit={handleSubmit}
      >
        <input
          type="date"
          name="date"
          onChange={handleOriginalChange}
          value={formData.date}
        />
        <div className="flex flex-row gap-8">
          <FloatLabel>
            <label>Cash</label>
            <InputNumber
              name="amount"
              value={formData.amount}
              size={9}
              onChange={handleChange("amount")}
              minFractionDigits={0}
              maxFractionDigits={2}
              tooltip="Amount of Cash taken home"
              variant="filled"
            />
          </FloatLabel>
          <FloatLabel>
            <label>Owed</label>
            <InputNumber
              name="owed"
              size={9}
              value={formData.owed}
              onChange={handleChange("owed")}
              minFractionDigits={0}
              maxFractionDigits={2}
              variant="filled"
            />
          </FloatLabel>
        </div>
        <div className="flex flex-row gap-8">
          <Dropdown
            name="client"
            options={clients}
            value={formData.client}
            onChange={handleOriginalChange}
          />
          <Dropdown
            name="state"
            options={states}
            value={formData.state}
            onChange={handleOriginalChange}
          />
        </div>
        <div>
          <Checkbox
            checked={formData.taxable}
            value={formData.taxable}
            onChange={() =>
              setFormData({ ...formData, taxable: !formData.taxable })
            }
            name="taxable"
          />
          <label>Taxable</label>
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
    </Panel>
  );
}
