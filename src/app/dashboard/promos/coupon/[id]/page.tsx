"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCouponById } from "@/networking/endpoints/promos/getCouponById";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  PercentSquare,
  DollarSign,
  Users,
  Calendar,
  Tag,
  Clock,
  CheckCircle,
} from "lucide-react";
import { CouponType } from "@/types/CouponTypes";

const CouponDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { isPending, error, data } = useQuery({
    queryKey: ["coupon", id],
    queryFn: () => getCouponById(id),
  });

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading coupon details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-destructive/50 bg-destructive/5">
          <div className="flex gap-3 p-4">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-destructive">
                Error Loading Coupon
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {error.message}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => router.back()}
              >
                Go Back
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const coupon = data?.coupon as CouponType;
  const isExpired =
    coupon.expiry_date && new Date(coupon.expiry_date) < new Date();
  const daysUntilExpiry = coupon.expiry_date
    ? Math.ceil(
        (new Date(coupon.expiry_date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Coupon Details
              </h1>
              <p className="text-sm text-muted-foreground">
                View full coupon information
              </p>
            </div>
          </div>
          <Badge
            variant={isExpired ? "destructive" : "default"}
            className="text-base px-3 py-1"
          >
            {isExpired ? "Expired" : "Active"}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Code and Primary Info */}
        <Card className="mb-6 overflow-hidden">
          <div
            className={`h-2 ${
              coupon.type === "percentage" ? "bg-blue-500" : "bg-emerald-500"
            }`}
          />
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  Coupon Code
                </p>
                <p className="text-4xl font-bold text-foreground font-mono mb-4">
                  {coupon.code}
                </p>
                {coupon.name && (
                  <p className="text-lg text-foreground font-medium">
                    {coupon.name}
                  </p>
                )}
              </div>
              <Badge
                variant={coupon.type === "percentage" ? "default" : "secondary"}
                className="text-lg px-4 py-2"
              >
                {coupon.type === "percentage" ? "Percentage" : "Fixed Amount"}
              </Badge>
            </div>

            {/* Discount Value Highlight */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">
                Discount Value
              </p>
              <div className="flex items-center gap-3">
                {coupon.type === "percentage" ? (
                  <PercentSquare className="w-8 h-8 text-primary" />
                ) : (
                  <DollarSign className="w-8 h-8 text-primary" />
                )}
                <span className="text-5xl font-bold text-primary">
                  {coupon.value}
                </span>
                <span className="text-lg text-muted-foreground ml-2">
                  {coupon.type === "percentage" ? "Off" : "Discount"}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Usage Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                Usage Information
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="text-sm text-muted-foreground">
                  Users Applied
                </span>
                <span className="font-semibold text-foreground">
                  {coupon.users_count || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="text-sm text-muted-foreground">
                  Maximum Uses
                </span>
                <span className="font-semibold text-foreground">
                  {coupon.max_users || "Unlimited"}
                </span>
              </div>
              {coupon.max_users && (
                <div className="mt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      Usage Rate
                    </span>
                    <span className="text-xs font-medium">
                      {Math.round(
                        ((coupon.users_count || 0) / coupon.max_users) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.round(
                          ((coupon.users_count || 0) / coupon.max_users) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Validity Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Validity</h3>
            </div>
            <div className="space-y-3">
              {coupon.created_at && (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="font-semibold text-foreground">
                    {new Date(coupon.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
              {coupon.expiry_date ? (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <span className="text-sm text-muted-foreground">Expires</span>
                  <span
                    className={`font-semibold ${
                      isExpired ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {new Date(coupon.expiry_date).toLocaleDateString()}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                  <span className="text-sm text-muted-foreground">Expires</span>
                  <span className="font-semibold text-foreground">
                    No Expiry
                  </span>
                </div>
              )}
              {daysUntilExpiry !== null && !isExpired && (
                <div className="mt-2 p-3 bg-primary/10 rounded border border-primary/20 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {daysUntilExpiry} days remaining
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Purchase Requirements */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                Purchase Requirements
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="text-sm text-muted-foreground">
                  Minimum Order
                </span>
                <span className="font-semibold text-foreground">
                  {coupon.min_price_rule
                    ? `$${coupon.min_price_rule}`
                    : "No minimum"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="text-sm text-muted-foreground">
                  Applied To
                </span>
                <span className="font-semibold text-foreground">
                  {coupon.applied_to || "All Products"}
                </span>
              </div>
            </div>
          </Card>

          {/* Stackability */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Settings</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                <span className="text-sm text-muted-foreground">Can Stack</span>
                <Badge
                  variant={
                    coupon.allow_multiple === 1 ? "default" : "secondary"
                  }
                >
                  {coupon.allow_multiple === 1 ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex-1"
          >
            Back to List
          </Button>
          <Button className="flex-1">Edit Coupon</Button>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailPage;
