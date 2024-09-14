"use client";

import axios from "axios";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";

const now = new Date(Date.now());

const states = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const defaultPayout = {
  amount: 0,
  taxable: false,
  state: "NJ",
  userId: 0,
  date: now.toISOString().slice(0, 10),
  client: "",
  owed: 0,
};

export default function PayoutCreateForm() {
  const [formData, setFormData] = useState(defaultPayout);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (name: string) => (e: InputNumberChangeEvent) => {
    setFormData({ ...formData, [name]: e.value });
  };

  const handleOriginalChange = (e: {
    target: { value: number | string; name: string };
  }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { data } = await axios.post("/api/payouts", { ...formData });
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Successfull Payout!");
    }

    setIsSubmitting(false);
  };

  return (
    <Panel header="Add Payout" className="b-2 min-h-96">
      <form
        className="flex flex-col justify-items-left p-0 gap-8"
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
          <InputText
            size={14}
            placeholder="Client"
            name="client"
            onChange={handleOriginalChange}
            value={formData.client}
          />
          <Dropdown
            name="state"
            options={states}
            value={formData.state}
            onChange={handleOriginalChange}
          />
        </div>
        <FloatLabel>
          <InputNumber
            value={formData.userId}
            onChange={handleChange("userId")}
            maxFractionDigits={0}
            variant="filled"
          />
          <label>UserId</label>
        </FloatLabel>
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
