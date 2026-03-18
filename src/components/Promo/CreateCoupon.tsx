"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { createCoupon } from "@/networking/endpoints/promos/createCoupon";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  info: string;
  code: string;
  type: "percentage" | "amount";
  value: string;
  min_price_rule: string;
  max_price_rule: string;
  applied_to: "logistics" | "orders" | "all";
  usage_days: string;
  max_users: string;
  expiry_date: string;
  allow_multiple: "0" | "1";
  system_only: "0" | "1";
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const defaultValues: FormState = {
  name: "",
  info: "",
  code: "",
  type: "percentage",
  value: "",
  min_price_rule: "",
  max_price_rule: "",
  applied_to: "all",
  usage_days: "",
  max_users: "",
  expiry_date: "",
  allow_multiple: "0",
  system_only: "0",
};

export default function CreateCouponPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.value || Number(form.value) < 1)
      newErrors.value = "Value must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        value: Number(form.value),
        min_price_rule: form.min_price_rule ? Number(form.min_price_rule) : undefined,
        max_price_rule: form.max_price_rule ? Number(form.max_price_rule) : undefined,
        usage_days: form.usage_days ? Number(form.usage_days) : undefined,
        max_users: form.max_users ? Number(form.max_users) : undefined,
        expiry_date: form.expiry_date || undefined,
        info: form.info || undefined,
        code: form.code || undefined,
        system_only: Number(form.system_only) as 0 | 1,
      };

      const result = await createCoupon({ couponData: payload });
      alert("Coupon created successfully!");
      console.log("Created Coupon:", result);
      setForm(defaultValues);
      router.back();
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Coupon</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter coupon name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Info */}
            <div>
              <Label>Info</Label>
              <Input
                value={form.info}
                onChange={(e) => handleChange("info", e.target.value)}
                placeholder="Short description (optional)"
              />
            </div>

            {/* Code */}
            <div>
              <Label>Code</Label>
              <Input
                value={form.code}
                onChange={(e) => handleChange("code", e.target.value)}
                placeholder="Custom code (optional)"
              />
            </div>

            {/* Type */}
            <div>
              <Label>Type *</Label>
              <Select
                value={form.type}
                onValueChange={(v) => handleChange("type", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Value */}
            <div>
              <Label>Value *</Label>
              <Input
                type="number"
                value={form.value}
                onChange={(e) => handleChange("value", e.target.value)}
                placeholder="Discount value"
              />
              {errors.value && (
                <p className="text-red-500 text-sm">{errors.value}</p>
              )}
            </div>

            {/* Price Rules */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Min Price Rule</Label>
                <Input
                  type="number"
                  value={form.min_price_rule}
                  onChange={(e) => handleChange("min_price_rule", e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label>Max Price Rule</Label>
                <Input
                  type="number"
                  value={form.max_price_rule}
                  onChange={(e) => handleChange("max_price_rule", e.target.value)}
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Applied To */}
            <div>
              <Label>Applied To *</Label>
              <Select
                value={form.applied_to}
                onValueChange={(v) => handleChange("applied_to", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Usage and Users */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Usage Days</Label>
                <Input
                  type="number"
                  value={form.usage_days}
                  onChange={(e) => handleChange("usage_days", e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label>Max Users</Label>
                <Input
                  type="number"
                  value={form.max_users}
                  onChange={(e) => handleChange("max_users", e.target.value)}
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Expiry */}
            <div>
              <Label>Expiry Date</Label>
              <Input
                type="date"
                value={form.expiry_date}
                onChange={(e) => handleChange("expiry_date", e.target.value)}
              />
            </div>

            {/* Allow Multiple */}
            <div>
              <Label>Allow Multiple *</Label>
              <Select
                value={form.allow_multiple}
                onValueChange={(v) => handleChange("allow_multiple", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* System Only */}
            <div>
              <Label>Users can create Coupon *</Label>
              <Select
                value={form.system_only}
                onValueChange={(v) => handleChange("system_only", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Creating..." : "Create Coupon"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}