"use client";

import { payout } from "@prisma/client";
import axios from "axios";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const now = new Date(Date.now());

const defaultPayout = {
  amount: 0,
  taxable: false,
  state: "NJ",
  userId: 0,
  date: now.toISOString().slice(0, 10),
  client: "",
};

export default function Home() {
  const [formData, setFormData] = useState(defaultPayout);
  //   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [payouts, setPayouts] = useState<[]>([]);
  const [selectedId, setSelectedId] = useState({ name: "1", code: 1 });

  //   const { data } = await axios.get("/api/users/2/payouts");
  const handleChange = (name: string) => (e: InputNumberChangeEvent) => {
    console.log(e);
    // console.log(`${name}: ${e.value}`);
    setFormData({ ...formData, [name]: e.value });
  };

  const getPayouts = useCallback(async () => {
    const { data } = await axios.get(`/api/users/${selectedId.code}/payouts`);

    setPayouts(data.payouts);
  }, [selectedId]);

  const handleOriginalChange = (e: {
    target: { value: number | string; name: string };
  }) => {
    console.log(e);
    console.log(`${e.target.name}: ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/payouts", { ...formData });
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Successfull Payout!");

      console.log(data);
    }
  };

  useEffect(() => {
    console.log(selectedId);
    getPayouts();
  }, [selectedId, getPayouts, selectedId.code, selectedId.name]);

  const options = [
    { name: "0", code: 0 },
    { name: "1", code: 1 },
    { name: "2", code: 2 },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Panel header="Add Payout" className="b-2">
          <form
            className="flex flex-col gap-4 justify-items-center items-center"
            onSubmit={handleSubmit}
          >
            <label>Amount</label>
            <InputNumber
              name="amount"
              value={formData.amount}
              onChange={handleChange("amount")}
              minFractionDigits={0}
              maxFractionDigits={2}
            />
            <input
              type="date"
              name="date"
              onChange={handleOriginalChange}
              value={formData.date}
            />
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
            <InputText
              size="large"
              name="state"
              placeholder="State"
              onChange={handleOriginalChange}
              value={formData.state}
            />
            <InputText
              size="large"
              placeholder="Client"
              name="client"
              onChange={handleOriginalChange}
              value={formData.client}
            />
            <label>UserId</label>
            <InputNumber
              value={formData.amount}
              onChange={handleChange("userId")}
              maxFractionDigits={0}
            />
            <Button
              className="p-button p-2"
              size="large"
              severity="info"
              raised
              //   disabled={isSubmitting}
            >
              Submit
            </Button>
          </form>
        </Panel>
        <Panel header="Payouts">
          <Dropdown
            value={selectedId.code}
            options={options}
            onChange={(e) => setSelectedId(e.target.value)}
            optionLabel="name"
          />
          {payouts.length > 0 &&
            payouts.map((payout: payout) => (
              <div
                className="flex flex-row gap-1"
                key={`${payout.amount}-${payout.day}-${payout.client}`}
              >
                <div>{payout.amount}</div>
                <div>{payout.year}</div>
                <div>{payout.month}</div>
                <div>{payout.day}</div>
                <div>{payout.client}</div>
                <div>{payout.state}</div>
              </div>
            ))}
        </Panel>
      </main>
    </div>
  );
}
