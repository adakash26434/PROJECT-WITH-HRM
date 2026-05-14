import * as React from "react";
import { Save, X, ChevronLeft, User, Phone, Mail, Building2, Calendar, Briefcase } from "lucide-react";

const DEPARTMENTS = ["Administration", "Accounts", "Loans", "IT", "HR", "Operations", "Compliance"];
const ROLES = ["Manager", "Officer", "Assistant", "Clerk", "Supervisor", "Analyst"];
const STATUSES = ["Active", "Probation", "Contract", "Suspended"];

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Input({
  icon: Icon,
  placeholder,
  type = "text",
}: {
  icon?: React.ElementType;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-9 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-colors ${Icon ? "pl-9 pr-3" : "px-3"}`}
      />
    </div>
  );
}

function Select({
  options,
  placeholder,
}: {
  options: string[];
  placeholder: string;
}) {
  return (
    <select className="w-full h-9 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-colors px-3 appearance-none cursor-pointer">
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export default function HRMStaffAddForm() {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="bg-card border border-border rounded-xl p-8 max-w-sm w-full text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <Save className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Staff Added</h3>
          <p className="text-sm text-muted-foreground mb-4">New staff member has been added successfully.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Add Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page header — same style as admin layout */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center gap-3">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-base font-semibold text-foreground leading-tight">Add New Staff</h1>
          <p className="text-xs text-muted-foreground">HRM · Staff Management · Add</p>
        </div>
      </div>

      {/* Form body — inline, not popup */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">

          {/* Section: Personal Info */}
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Personal Information</h2>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name" required>
              <Input icon={User} placeholder="e.g. Hari Prasad Sharma" />
            </Field>
            <Field label="Date of Birth">
              <Input icon={Calendar} placeholder="YYYY-MM-DD" type="date" />
            </Field>
            <Field label="Email Address" required>
              <Input icon={Mail} placeholder="staff@coop.org.np" type="email" />
            </Field>
            <Field label="Phone Number" required>
              <Input icon={Phone} placeholder="+977-98XXXXXXXX" type="tel" />
            </Field>
          </div>

          {/* Section: Job Details */}
          <div className="px-6 py-4 border-t border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Job Details</h2>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Department" required>
              <div className="flex items-center gap-2 relative">
                <Building2 className="absolute left-3 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                <div className="w-full">
                  <select className="w-full h-9 bg-background border border-border rounded-lg text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-colors pl-9 pr-3 appearance-none cursor-pointer">
                    <option value="" disabled selected>Select department</option>
                    {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </Field>
            <Field label="Role / Position" required>
              <Select options={ROLES} placeholder="Select role" />
            </Field>
            <Field label="Join Date" required>
              <Input icon={Calendar} placeholder="YYYY-MM-DD" type="date" />
            </Field>
            <Field label="Employment Status" required>
              <Select options={STATUSES} placeholder="Select status" />
            </Field>
            <Field
              label="Salary (NPR)"
              hint="Monthly gross salary"
            >
              <input
                type="number"
                placeholder="e.g. 35000"
                className="w-full h-9 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-colors px-3"
              />
            </Field>
            <Field label="Supervisor">
              <Input placeholder="Supervisor name" />
            </Field>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <X className="h-4 w-4" />
              Cancel
            </button>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg text-sm border border-border text-foreground hover:bg-muted transition-colors">
                Save as Draft
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                <Save className="h-4 w-4" />
                Add Staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
