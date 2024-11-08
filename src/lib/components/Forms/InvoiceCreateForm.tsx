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
import { TClient, TCLientGetResponse } from "../../types";
import { TDropdownOptions } from "../../types";
import { useInvoiceStore } from "@/lib/hooks/invoices";

const now = new Date(Date.now());

const defaultUnpaidPayout = {
  amount: 0,
  taxable: false,
  due: now.toISOString().slice(0, 10),
  clientId: 0,
  createInvoiceNumber: true,
};

export default function UnpaidPayoutCreateForm() {
  const { addInvoice } = useInvoiceStore.getState();
  const [formData, setFormData] = useState(defaultUnpaidPayout);
  const [clients, setClients] = useState<TDropdownOptions>([]);
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
    if (formData.clientId === 0) {
      return true;
    }

    return false;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (validateFormDate()) return;

    setIsSubmitting(true);

    const { data } = await axios.post("/api/invoices", { ...formData });
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Successfull Invoice!");
      addInvoice(data.invoice);
      setFormData({ ...defaultUnpaidPayout, clientId: formData.clientId });
    }

    setIsSubmitting(false);
  };

  const setData = useCallback(
    (newClients: TDropdownOptions) => {
      setFormData({ ...formData, clientId: newClients[0].value as number });
    },
    // disabled because adding formData causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const getClientList = async () => {
      const { data }: TCLientGetResponse = await axios.get("/api/clients");

      const newClients: TDropdownOptions = Object.values(data.clients).map(
        (client: TClient) => ({
          label: client.name,
          value: client.id,
        })
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
      header="Add Invoice"
      className="b-2 min-h-96 w-11/12 border-2 rounded-md"
    >
      <form
        className="flex flex-col justify-items-left p-0 gap-8 w-11/12"
        onSubmit={handleSubmit}
      >
        <input
          type="date"
          name="due"
          onChange={handleOriginalChange}
          value={formData.due}
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
        </div>
        <div className="flex flex-row gap-8">
          <Dropdown
            name="clientId"
            options={clients}
            optionLabel="label"
            optionValue="value"
            value={formData.clientId}
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
        <div>
          <Checkbox
            checked={formData.createInvoiceNumber}
            value={formData.createInvoiceNumber}
            onChange={() =>
              setFormData({
                ...formData,
                createInvoiceNumber: !formData.createInvoiceNumber,
              })
            }
            name="createInvoiceNumber"
          />
          <label>Create Invoice Number</label>
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
