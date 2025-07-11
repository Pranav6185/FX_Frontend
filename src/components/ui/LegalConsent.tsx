import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog'; // adjust as needed
import { TermsAndConditions, PrivacyPolicy } from '../Legal';
import { Button } from './button'; // adjust as needed

interface LegalConsentProps {
  agreed: boolean;
  onChange: (value: boolean) => void;
}

export const LegalConsent: React.FC<LegalConsentProps> = ({ agreed, onChange }) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          required
          checked={agreed}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="consent" className="text-sm text-gray-700">
          I agree to the{' '}
          <Dialog>
            <DialogTrigger className="underline text-primary-600 hover:text-primary-700">
              Terms & Conditions
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Terms & Conditions</DialogTitle>
              </DialogHeader>
              <TermsAndConditions />
            </DialogContent>
          </Dialog>
          {' '}and{' '}
          <Dialog>
            <DialogTrigger className="underline text-primary-600 hover:text-primary-700">
              Privacy Policy
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Privacy Policy</DialogTitle>
              </DialogHeader>
              <PrivacyPolicy />
            </DialogContent>
          </Dialog>
        </label>
      </div>

      {/* <Button type="submit" disabled={!agreed} className="w-full">
        Sign Up
      </Button> */}
    </div>
  );
};
