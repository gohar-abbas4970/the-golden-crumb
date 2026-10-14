import { Bell, CreditCard, Database, Info } from 'lucide-react';
import { siteConfig, DEMO_MODE } from '@/data/siteConfig';

export default function AdminSettings() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-heading font-bold text-chocolate text-3xl mb-2">Settings</h1>
      <p className="text-chocolate/60 text-sm mb-8">Integration status and configuration.</p>

      {/* Demo mode indicator */}
      <div className={`rounded-2xl-card border p-5 mb-6 ${DEMO_MODE ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="font-medium text-chocolate text-sm">
              {DEMO_MODE ? 'Demo Mode: Active' : 'Production Mode: Active'}
            </p>
            <p className="text-xs text-chocolate/60 mt-0.5">
              {DEMO_MODE
                ? 'All features are in demonstration mode. No real payments, notifications, or AI responses are sent.'
                : 'Real integrations are active. Ensure all credentials are properly configured.'}
            </p>
          </div>
        </div>
      </div>

      {/* Integration cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Database */}
        <div className="bg-white rounded-2xl-card border border-beige/50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-6 h-6 text-caramel" />
            <h2 className="font-heading font-semibold text-chocolate text-base">Database</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-chocolate/60">Status</span>
              <span className="text-green-600 font-medium">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate/60">Provider</span>
              <span className="text-chocolate font-medium">Supabase (PostgreSQL)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate/60">RLS</span>
              <span className="text-green-600 font-medium">Enabled</span>
            </div>
          </div>
        </div>

        {/* WhatsApp notifications */}
        <div className="bg-white rounded-2xl-card border border-beige/50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <Bell className="w-6 h-6 text-caramel" />
            <h2 className="font-heading font-semibold text-chocolate text-base">Owner WhatsApp Notifications</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-chocolate/60">Status</span>
              <span className={siteConfig.ownerWhatsappNumber ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'}>
                {siteConfig.ownerWhatsappNumber ? 'Configured' : 'Not configured'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate/60">Method</span>
              <span className="text-chocolate font-medium">Normal WhatsApp (manual)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate/60">Owner Number</span>
              <span className="text-chocolate font-medium">{siteConfig.ownerWhatsappNumber || 'Not set'}</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-beige/20 rounded-xl-card text-xs text-chocolate/60">
            <p className="font-medium text-chocolate mb-1">How it works:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Set <code>ownerWhatsappNumber</code> in site config (e.g. 923001234567)</li>
              <li>When an order comes in, open it in the admin Orders panel</li>
              <li>Click "Open in WhatsApp" — WhatsApp opens with the order message pre-filled</li>
              <li>Review the message and manually press send</li>
              <li>Mark the order as "sent" after you send it</li>
            </ul>
            <p className="mt-2">
              No WhatsApp Business API required. Uses standard WhatsApp via wa.me links.
              Notifications are owner-only — no customer-facing WhatsApp features exist on this site.
            </p>
          </div>
        </div>

        {/* Payment gateway */}
        <div className="bg-white rounded-2xl-card border border-beige/50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <CreditCard className="w-6 h-6 text-caramel" />
            <h2 className="font-heading font-semibold text-chocolate text-base">Payment Gateway</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-chocolate/60">Status</span>
              <span className="text-amber-600 font-medium">Not configured</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate/60">Mode</span>
              <span className="text-chocolate font-medium">{DEMO_MODE ? 'Simulated' : 'Inactive'}</span>
            </div>
          </div>
          <div className="mt-3 p-3 bg-beige/20 rounded-xl-card text-xs text-chocolate/60">
            <p className="font-medium text-chocolate mb-1">Setup Instructions:</p>
            <ol className="list-decimal pl-4 space-y-0.5">
              <li>Choose a Pakistan-compatible gateway (e.g. JazzCash, EasyPaisa)</li>
              <li>Add merchant credentials as edge function secrets</li>
              <li>Configure webhook endpoint for payment verification</li>
              <li>Test end-to-end before going live</li>
              <li>Payment status changes only after verified webhook confirmation</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
