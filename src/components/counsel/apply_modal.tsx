import { AlertCircle } from "lucide-react";

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
}

export default function ApplyModal({
  open,
  onClose,
  onSubmit,
}: ApplyModalProps) {
  if (!open) return null;

  const handleSubmit = async () => {
    try {
      await onSubmit();
    } catch (err) {
     
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">
            Apply as a Counselor
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your application will be reviewed by an administrator before you
            can begin accepting counseling cases.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />

            <div>
              <p className="font-semibold text-amber-700">
                Before you apply
              </p>

              <p className="mt-1 text-sm text-amber-700">
                Once submitted, your application will remain pending until it
                has been reviewed and approved by an administrator.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-gray-600">
            <ul className="list-disc space-y-2 pl-5">
              <li>Your profile will be reviewed.</li>
              <li>Only approved counselors can access counseling cases.</li>
              <li>You will be notified after approval.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}