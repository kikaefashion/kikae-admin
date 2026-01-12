"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "@/networking/endpoints/promos/getCoupons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  AlertCircle,
  Tag,
  PercentSquare,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";

import { CouponType } from "@/types/CouponTypes";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AllCoupons = () => {
  const router = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ["allCoupons"],
    queryFn: getCoupons,
  });

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading coupons...</p>
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
                Error Loading Coupons
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {error.message}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const coupons = data?.coupons?.data || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Promotions</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and view all available coupons
              </p>
            </div>
            <div className="flex flex-row gap-6 items-center">
              <div className="bg-primary/10 px-4 py-2 rounded-lg">
                <p className="text-sm font-medium text-primary">
                  {coupons.length} Active Coupons
                </p>
              </div>
              <div
                onClick={() => router.push("/dashboard/promos/coupon/create")}
                className="bg-primary/10 px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
              >
                <p className="text-sm font-medium text-primary">
                  Create Coupon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {coupons.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-lg font-medium text-foreground">
              No coupons yet
            </p>
            <p className="text-sm text-muted-foreground">
              Create your first coupon to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon: CouponType) => (
              <Link
                href={`/dashboard/promos/coupon/update/${coupon.id}`}
                key={coupon.id}
              >
                <CouponCard key={coupon.id} coupon={coupon} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CouponCard = ({ coupon }: { coupon: CouponType }) => {
  const isExpired =
    coupon.expiry_date && new Date(coupon.expiry_date) < new Date();
  const daysUntilExpiry = coupon.expiry_date
    ? Math.ceil(
        (new Date(coupon.expiry_date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Top accent bar */}
      <div
        className={`h-1 ${
          coupon.type === "percentage" ? "bg-blue-500" : "bg-emerald-500"
        }`}
      />

      <div className="p-6 flex flex-col h-full">
        {/* Code and Type Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Code
            </p>
            <p className="text-xl font-bold text-foreground font-mono break-all">
              {coupon.code}
            </p>
          </div>
          <Badge
            variant={coupon.type === "percentage" ? "default" : "secondary"}
            className="ml-2 flex-shrink-0"
          >
            {coupon.type === "percentage" ? "%" : "$"}
          </Badge>
        </div>

        {/* Coupon Name */}
        {coupon.name && (
          <p className="text-sm font-medium text-foreground mb-4 line-clamp-2">
            {coupon.name}
          </p>
        )}

        {/* Value Section */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Discount Value
            </span>
            <div className="flex items-center gap-1">
              {coupon.type === "percentage" ? (
                <PercentSquare className="w-4 h-4 text-primary" />
              ) : (
                <DollarSign className="w-4 h-4 text-primary" />
              )}
              <span className="text-2xl font-bold text-primary">
                {coupon.value}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          {/* Usage Limit */}
          {coupon.max_users !== null && (
            <div className="bg-card border border-border rounded p-2">
              <p className="text-muted-foreground mb-1 flex items-center gap-1">
                <Users className="w-3 h-3" />
                Usage
              </p>
              <p className="font-semibold">
                {coupon.users_count || 0}/{coupon.max_users}
              </p>
            </div>
          )}

          {/* Min Purchase */}
          {coupon.min_price_rule !== null && (
            <div className="bg-card border border-border rounded p-2">
              <p className="text-muted-foreground mb-1">Min Order</p>
              <p className="font-semibold">${coupon.min_price_rule}</p>
            </div>
          )}

          {/* Expiry Status */}
          {coupon.expiry_date && (
            <div className="bg-card border border-border rounded p-2">
              <p className="text-muted-foreground mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Expires
              </p>
              <p
                className={`font-semibold ${
                  isExpired ? "text-destructive" : "text-foreground"
                }`}
              >
                {isExpired ? "Expired" : `${daysUntilExpiry}d`}
              </p>
            </div>
          )}

          {/* Applied To */}
          {coupon.applied_to && (
            <div className="bg-card border border-border rounded p-2">
              <p className="text-muted-foreground mb-1">Applied To</p>
              <p className="font-semibold truncate">{coupon.applied_to}</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
          <span>Created {formatDate(coupon.created_at)}</span>
          {coupon.allow_multiple === 1 && (
            <Badge variant="outline" className="text-xs">
              Stackable
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}m ago`;
};

export default AllCoupons;
