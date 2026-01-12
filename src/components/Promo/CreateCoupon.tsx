"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

const couponSchema = z.object({
  name: z.string().min(1, "Name is required"),
  info: z.string().optional(),
  code: z.string().optional(),
  type: z.enum(["percentage", "amount"]),

  value: z.coerce.number().min(1, "Value must be greater than 0"),
  min_price_rule: z.coerce.number().optional(),
  max_price_rule: z.coerce.number().optional(),
  applied_to: z.enum(["logistics", "orders", "all"]),
  usage_days: z.coerce.number().optional(),
  max_users: z.coerce.number().optional(),
  expiry_date: z.string().optional(),
  allow_multiple: z.enum(["0", "1"]),
});

type CouponFormData = z.infer<typeof couponSchema>;

export default function CreateCouponPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      name: "",
      type: "percentage",
      applied_to: "all",
      allow_multiple: "0",
    },
  });

  const onSubmit = async (data: CouponFormData) => {
    setLoading(true);
    try {
      const result = await createCoupon({ couponData: data });
      alert("Coupon created successfully!");
      console.log("Created Coupon:", result);
      router.back();
      form.reset();
    } catch () {
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Name *</Label>
              <Input
                {...form.register("name")}
                placeholder="Enter coupon name"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Info */}
            <div>
              <Label>Info</Label>
              <Input
                {...form.register("info")}
                placeholder="Short description (optional)"
              />
            </div>

            {/* Code */}
            <div>
              <Label>Code</Label>
              <Input
                {...form.register("code")}
                placeholder="Custom code (optional)"
              />
            </div>

            {/* Type */}
            <div>
              <Label>Type *</Label>
              <Select
                value={form.watch("type")}
                onValueChange={(v) =>
                  form.setValue("type", v as "percentage" | "amount")
                }
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
                {...form.register("value")}
                placeholder="Discount value"
              />
            </div>

            {/* Price rules */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Min Price Rule</Label>
                <Input
                  type="number"
                  {...form.register("min_price_rule")}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label>Max Price Rule</Label>
                <Input
                  type="number"
                  {...form.register("max_price_rule")}
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Applied To */}
            <div>
              <Label>Applied To *</Label>
              <Select
                value={form.watch("applied_to")}
                onValueChange={(v) =>
                  form.setValue(
                    "applied_to",
                    v as "logistics" | "orders" | "all"
                  )
                }
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
                  {...form.register("usage_days")}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label>Max Users</Label>
                <Input
                  type="number"
                  {...form.register("max_users")}
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Expiry */}
            <div>
              <Label>Expiry Date</Label>
              <Input type="date" {...form.register("expiry_date")} />
            </div>

            {/* Allow Multiple */}
            <div>
              <Label>Allow Multiple *</Label>
              <Select
                value={form.watch("allow_multiple")}
                onValueChange={(v) =>
                  form.setValue("allow_multiple", v as "0" | "1")
                }
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
